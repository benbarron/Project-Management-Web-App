import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { createTodo } from './../../../../../Actions/todoActions';

import {
  makeStyles,
  CardActionArea,
  CardContent,
  IconButton
} from '@material-ui/core';

import { Button, Input, Form } from 'reactstrap';

import { CloseOutlined } from '@material-ui/icons';

import './style.css';

const useStyles = makeStyles(theme => ({
  footer: {
    paddingTop: 10,
    background: '#d2dae2'
    //borderTop: "#222 1px solid"
  },
  content: {
    background: '#f1f2f6'
  },
  textField: {
    width: '100%'
  },
  footerPaper: {
    paddingTop: 5
  },
  button: {
    height: 40
  },
  actionArea: {
    background: '#ffffff'
  }
}));

const CreateTodo = props => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');

  const createTodo = () => {
    if (name !== '') {
      const newTodo = {
        name,
        parentCard: props.id
      };

      props.createTodo(newTodo);
      setName('');
      props.closeAddForm();
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    createTodo();
  };

  return (
    <Fragment>
      {props.id === props.cardWithAddForm ? (
        <Fragment>
          <CardContent
            className="action-area"
            style={{ background: '#fff', padding: 10, margin: 0 }}
          >
            <Form onSubmit={onSubmit}>
              <Input
                autoComplete="false"
                type="text"
                value={name}
                placeholder="Todo Name"
                bsSize="sm"
                onChange={e => setName(e.target.value)}
              />
              {msg ? <span style={{ color: '#aa0000' }}>{msg}</span> : null}

              <div className=" d-flex justify-content-between mt-2">
                <IconButton
                  size="small"
                  style={{ borderRadius: 4, height: 30, width: 30 }}
                  onClick={props.closeAddForm}
                >
                  <CloseOutlined fontSize="small" />
                </IconButton>
                <Button
                  className={classes.button}
                  style={{ height: 30, margin: 0 }}
                  type="submit"
                  color="primary"
                  active
                  tabIndex={-1}
                >
                  Add Card
                </Button>
              </div>
            </Form>
          </CardContent>
        </Fragment>
      ) : (
        <Fragment>
          <CardActionArea
            style={{ background: '#bdc3c7' }}
            onClick={() => props.setCardAddForm(props.id)}
            className={classes.footer + ' action-area'}
          >
            <div className="add-card-card">
              <i className="fas fa-plus mx-1" />
              <span className="mx-1">Add An Item</span>
            </div>
          </CardActionArea>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  { createTodo }
)(CreateTodo);
