import React, { useState } from 'react';
import { connect } from 'react-redux';

import { MenuItem, Menu } from '@material-ui/core';

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

import { updateBoard } from './../../../../../Actions/boardActions';

import './EditBoard.css';

const EditBoard = props => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(props.board.name);
  const [msg, setMsg] = useState('');

  const toggle = () => {
    if (!open) {
      props.handleClose();
    }
    setOpen(!open);
  };

  const update = e => {
    e.preventDefault();

    if (!name) {
      return setMsg('Please enter a name for the board');
    }

    const errCatch = err => {
      setMsg(err);
    };

    const success = () => {
      setOpen(false);
    };

    props.updateBoard(
      { name, description: props.board.description, id: props.board._id },
      errCatch,
      success
    );
  };

  return (
    <div>
      <MenuItem onClick={toggle}>Edit Board</MenuItem>
      <Modal isOpen={open} toggle={toggle} className="">
        <ModalHeader toggle={toggle}>Edit Board</ModalHeader>
        <ModalBody>
          <Form onSubmit={update}>
            <FormGroup>
              <Label></Label>
              <Input
                type="text"
                value={name}
                placeholder="Board Name"
                bsSize="lg"
                onChange={e => setName(e.target.value)}
              />
              {msg ? (
                <span className="edit-board-err-msg">{'* ' + msg}</span>
              ) : null}
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={update}>
            Update
          </Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  { updateBoard }
)(EditBoard);
