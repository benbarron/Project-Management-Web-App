import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';

import { createBoard } from './../../../../../Actions/boardActions';

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from 'reactstrap';

import './CreateBoard.css';

const CreateBoard = props => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');

  const toggle = () => {
    setOpen(!open);
  };

  const create = e => {
    e.preventDefault();

    if (!name) {
      return setMsg('Please enter a name for the board');
    }

    props
      .createBoard({ name, description: '', type: 'personal' })
      .then(() => {
        setOpen(false);
        setName('');
      })
      .catch(err => setMsg(err));
  };

  return (
    <Fragment>
      <Button
        type="button"
        color="primary"
        onClick={toggle}
        active
        tabIndex={-1}
      >
        Create New Board
      </Button>

      <Modal isOpen={open} toggle={toggle} className="">
        <ModalHeader toggle={toggle}>Create New Board</ModalHeader>
        <ModalBody>
          <Form onSubmit={create}>
            <FormGroup>
              <Input
                type="text"
                value={name}
                placeholder="Board Name"
                bsSize="lg"
                onChange={e => setName(e.target.value)}
              />
              {msg ? (
                <span className="create-board-err-msg">{'* ' + msg}</span>
              ) : null}
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            type="button"
            color="primary"
            active
            tabIndex={-1}
            onClick={create}
          >
            Create
          </Button>{' '}
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  {
    createBoard
  }
)(CreateBoard);
