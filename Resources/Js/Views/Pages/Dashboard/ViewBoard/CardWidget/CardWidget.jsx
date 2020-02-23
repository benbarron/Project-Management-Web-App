import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';

import {
  updateCardName,
  deleteCard
} from './../../../../../Actions/cardActions';

import { InputGroup, Form, Input } from 'reactstrap';

import {
  Paper,
  CardContent,
  Card,
  IconButton,
  Typography,
  makeStyles,
  Menu,
  MenuItem
} from '@material-ui/core';

import { MoreVert, CheckBoxOutlined, MoreHoriz } from '@material-ui/icons';
import CreateTodo from '../CreateTodo/CreateTodo';

import { Droppable } from 'react-beautiful-dnd';

import TodoWidget from './../TodoWidget';

import './style.css';

const useStyles = makeStyles(theme => ({
  textField: {
    width: 100
  },
  card: {
    padding: 0
  }
}));

const CardWidget = props => {
  const classes = useStyles();
  const [oldName] = useState(props.card.name);
  const [card, setCard] = useState(props.card);
  const [editCardName, setEditCardName] = useState(false);
  const [name, setName] = useState(props.card.name);
  const [editTodoState, setEditTodoState] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const todos = props.todos
    .sort(function compare(a, b) {
      if (a.sortValue > b.sortValue) {
        return 1;
      } else {
        return -1;
      }
    })
    .filter(todo => todo.parentCard === card._id);

  const updateCardName = e => {
    e.preventDefault();
    if (name === '') {
      return;
    } else {
      if (name !== oldName) {
        props.updateCardName(card._id, name);
      }
      setEditCardName(false);
    }
  };

  const deleteCard = () => {
    props.deleteCard(card._id);
  };

  return (
    <div className="card-wrapper" style={{ borderRadius: '0px' }}>
      <Card className="card" style={{ background: '#747d8c', padding: 0 }}>
        <CardContent className="card-header ">
          {editCardName ? (
            <Fragment>
              <Form onSubmit={updateCardName}>
                <InputGroup>
                  <Input
                    type="text"
                    value={name}
                    placeholder="Keyword"
                    bsSize="sm"
                    onChange={e => setName(e.target.value)}
                  />
                </InputGroup>
              </Form>
            </Fragment>
          ) : (
            <Fragment>
              <div className="d-flex justify-content-between">
                <Typography variant="subtitle1" component="strong">
                  {name}
                </Typography>
                <IconButton
                  size="small"
                  style={{ borderRadius: 4, marginTop: -1, height: 25 }}
                  onClick={handleClick}
                >
                  <MoreHoriz
                    fontSize="small"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                  />
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={() => {
                      setEditCardName(true);
                      handleClose();
                    }}
                  >
                    Edit Card
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      deleteCard();
                      handleClose();
                    }}
                  >
                    Delete Card
                  </MenuItem>
                </Menu>
              </div>
            </Fragment>
          )}
        </CardContent>

        <CardContent className="card-content">
          <Droppable droppableId={props.card._id} type="item">
            {provided => (
              <div
                className="inner-card-droppable"
                ref={provided.innerRef}
                {...provided.droppableProps}
                {...provided.dragHandleProps}
              >
                {todos.map((todo, i) => (
                  <TodoWidget
                    closeEditDialog={props.closeEditDialog}
                    itemEdit={props.itemEdit}
                    setItemEdit={props.setItemEdit}
                    key={todo._id}
                    index={i}
                    id={todo._id}
                    todo={todo}
                    editState={editTodoState}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </CardContent>

        <CreateTodo
          className="card-footer"
          closeAddForm={() => props.closeAddForm()}
          setCardAddForm={_id => props.setCardAddForm(_id)}
          cardWithAddForm={props.cardWithAddForm}
          id={props.card._id}
        />
      </Card>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    todos: state.todos.todos
  };
};

export default connect(
  mapStateToProps,
  { updateCardName, deleteCard }
)(CardWidget);
