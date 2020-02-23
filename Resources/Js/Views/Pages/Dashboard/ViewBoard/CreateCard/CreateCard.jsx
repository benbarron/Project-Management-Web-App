import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';

import { createCard } from './../../../../../Actions/cardActions';

import { Button, Input, Form } from 'reactstrap';

import {
  Paper,
  Card,
  CardActionArea,
  IconButton,
  makeStyles
} from '@material-ui/core';

import { CloseOutlined } from '@material-ui/icons';

import './style.css';

const useStyles = makeStyles(theme => ({
  textField: {
    width: '100%'
  },
  footerPaper: {
    paddingTop: 8
  },
  button: {
    height: 40
  }
}));

const CreateCard = props => {
  const classes = useStyles();

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');

  const addCard = e => {
    e.preventDefault();

    if (name === '') {
      setMsg('Enter a name for the card');
      setTimeout(() => {
        setMsg('');
      }, 2000);
    } else {
      const newCard = {
        name,
        parentBoard: props.id
      };

      const success = () => {
        toggleForm();
        setName('');
      };

      const errCatch = err => {
        setMsg(err);
      };

      props.createCard(newCard, errCatch, success);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <Fragment>
      {showForm ? (
        <Fragment>
          <Paper>
            <Card>
              <div className="new-card-form py-2">
                <Form onSubmit={addCard}>
                  <Input
                    type="text"
                    value={name}
                    placeholder="Card Name"
                    bsSize="sm"
                    onChange={e => setName(e.target.value)}
                  />
                  {msg ? <span style={{ color: '#aa0000' }}>{msg}</span> : null}

                  <div className="form-footer">
                    <IconButton
                      size="small"
                      style={{ borderRadius: 4, width: 30, height: 30 }}
                      onClick={toggleForm}
                    >
                      <CloseOutlined fontSize="small" />
                    </IconButton>
                    <Button
                      style={{ height: 30 }}
                      className={classes.button}
                      type="submit"
                      color="primary"
                      active
                      tabIndex={-1}
                    >
                      Add Card
                    </Button>
                  </div>
                </Form>
              </div>
            </Card>
          </Paper>
        </Fragment>
      ) : (
        <Fragment>
          <Paper onClick={toggleForm}>
            <Card>
              <CardActionArea className={classes.footerPaper}>
                <div className="add-card-card">
                  <i className="fas fa-plus mx-1" />
                  <span className="mx-1">Add Another Card</span>
                </div>
              </CardActionArea>
            </Card>
          </Paper>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  { createCard }
)(CreateCard);
