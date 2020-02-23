import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { deleteTodo, updateTodo } from './../../../../../Actions/todoActions';
// import {  } from '@material-ui/icons;'
// import TodoDateForm from "./TodoDateForm";

// import EditTodoDialog from './EditTodoDialog';
import EditTodo from './../EditTodo';

import { Draggable } from 'react-beautiful-dnd';
import { Paper, CardContent, Card, IconButton } from '@material-ui/core';
import { EditOutlined } from '@material-ui/icons';

const TodoWidget = props => {
  const { todo } = props;

  if (props.todo.label) {
    var border = props.todo.label + ' 6px solid';
    var padding = 0;
  } else {
    var border = '';
    var padding = 6;
  }

  return (
    <Draggable draggableId={props.todo._id} index={props.index}>
      {provided => (
        <div
          className="card-item z-depth-1"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Paper>
            <Card style={{ borderLeft: border, paddingLeft: padding }}>
              <CardContent
                className="d-flex justify-content-between"
                style={{ padding: '4px 8px', height: 55 }}
              >
                <div>
                  <h6>{todo.name}</h6>
                  <small>
                    <b>{todo.dueDate ? todo.dueDate : null}</b>
                  </small>
                </div>

                <span>
                  <IconButton
                    style={{ borderRadius: '4px' }}
                    size="small"
                    onClick={() => props.setItemEdit(props.todo._id)}
                  >
                    <EditOutlined fontSize="small" />
                  </IconButton>
                  {props.todo._id === props.itemEdit ? (
                    <EditTodo
                      todo={props.todo}
                      closeEdit={props.closeEditDialog}
                    />
                  ) : null}
                </span>
              </CardContent>
            </Card>
          </Paper>
        </div>
      )}
    </Draggable>
  );
};

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
  {}
)(TodoWidget);
