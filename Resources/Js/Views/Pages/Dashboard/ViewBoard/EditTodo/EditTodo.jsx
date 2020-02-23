import React, { useState, Fragment, forwardRef } from 'react';
import { connect } from 'react-redux';

import { deleteTodo, saveItem } from './../../../../../Actions/todoActions';

import { DatePickerInput } from 'rc-datepicker';
import 'rc-datepicker/lib/style.css';

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Form
} from 'reactstrap';

const options = [
  {
    name: 'None',
    value: ''
  },
  {
    name: 'Yellow',
    value: '#ffd32a'
  },
  {
    name: 'Green',
    value: '#0be881'
  },
  {
    name: 'Orange',
    value: '#e67e22'
  },
  {
    name: 'Red',
    value: '#ff5e57'
  },
  {
    name: 'Purple',
    value: '#8e44ad'
  },
  {
    name: 'Blue',
    value: '#3498db'
  },

  {
    name: 'Neon Blue',
    value: '#18dcff'
  },
  {
    name: 'Naval',
    value: '#40739e'
  }
];

const EditTodo = props => {
  const [name, setName] = useState(props.todo.name);
  const [id, setId] = useState(props.todo._id);
  const [color, setColor] = useState(props.todo.label ? props.todo.label : '');

  const [dueDate, setDueDate] = useState(
    props.todo.dueDate ? props.todo.dueDate : ''
  );

  const [dueDateInstance, setDueDateInstance] = useState(
    props.todo.dueDateInstance ? props.todo.dueDateInstance : null
  );

  const deleteItem = e => {
    e.preventDefault();

    props.deleteTodo(id, () => props.closeEditDialog());
  };

  const onChange = date => {
    var d = new Date(date);
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var year = d.getFullYear();

    var newDate = `${month}/${day}/${year}`;

    setDueDate(newDate);

    setDueDateInstance(date);
  };

  const clearDate = () => {
    setDueDate(null);
    setDueDateInstance(null);
  };

  const updateItem = () => {
    const todo = {
      name,
      dueDate,
      dueDateInstance,
      label: color,
      id
    };
    props.saveItem(todo);
    props.closeEdit();
  };

  return (
    <Fragment>
      <div>
        <Modal isOpen={true} toggle={props.closeEdit}>
          <ModalHeader toggle={props.closeEdit}>Edit Todo</ModalHeader>
          <ModalBody>
            <div className="">
              <FormGroup>
                <DatePickerInput
                  className="date-picker-input"
                  onChange={onChange}
                  value={dueDate}
                  style={{ width: '100%' }}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  value={name}
                  placeholder="Name"
                  name="name"
                  bsSize="md"
                  onChange={e => setName(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <select
                  className="form-control"
                  value={color}
                  onChange={e => setColor(e.target.value)}
                >
                  {options.map(option => (
                    <option
                      className="form-control"
                      key={option.value}
                      value={option.value}
                      style={{ color: option.value }}
                    >
                      {option.name}
                    </option>
                  ))}
                </select>
              </FormGroup>
            </div>
          </ModalBody>
          <ModalFooter className="d-flex justify-content-between">
            <div>
              <Button
                color="danger"
                type="button"
                active
                tabIndex={-1}
                onClick={deleteItem}
              >
                Delete Todo
              </Button>
            </div>
            <div>
              <Button
                className="mx-2"
                color="secondary"
                type="button"
                active
                tabIndex={-1}
                onClick={clearDate}
              >
                Clear Date
              </Button>
              <Button
                type="submit"
                color="primary"
                active
                tabIndex={-1}
                onClick={updateItem}
              >
                Save Todo
              </Button>
            </div>
          </ModalFooter>
        </Modal>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  { saveItem, deleteTodo }
)(EditTodo);
