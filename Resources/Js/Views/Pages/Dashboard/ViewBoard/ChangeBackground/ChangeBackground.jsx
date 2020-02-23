import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setBackground } from './../../../../../Actions/boardActions';

import axios from 'axios';

import { Card, CardActionArea, Paper } from '@material-ui/core';
import {
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Input,
  Form
} from 'reactstrap';

import './style.css';

const ChangeBackground = props => {
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [images, setImages] = useState([]);

  const getImages = term => {
    const config = {
      headers: {
        'Content-type': 'application/json',
        'x-auth-token': props.token
      }
    };

    axios
      .get(`/api/photos/${term}`, config)
      .then(res => {
        setImages(res.data.results);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    // getImages('mountains');
  }, []);

  const onSubmit = e => {
    e.preventDefault();

    if (!keyword) {
      return;
    }

    getImages(keyword);
  };

  const setBackground = bg => {
    props.setBackground({ bg, id: props.board._id });
  };

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <Fragment>
      <Paper className="mt-2">
        <Card onClick={toggle}>
          <CardActionArea style={{ paddingTop: 8 }}>
            <div className="add-card-card">
              <i className="fas fa-images mx-1"></i>
              <span className="mx-1">Set Background Image</span>
            </div>
          </CardActionArea>
        </Card>
      </Paper>
      <Modal isOpen={open} toggle={toggle}>
        <ModalHeader toggle={toggle}>Search Images</ModalHeader>
        <ModalBody>
          <div role="presentation">
            <Form
              onSubmit={onSubmit}
              className="d-flex justify-content-between"
            >
              <Input
                type="text"
                value={keyword}
                placeholder="Keyword"
                bsSize="md"
                className="mx-2"
                onChange={e => setKeyword(e.target.value)}
              />
              <Button
                size="md"
                type="submit"
                color="primary"
                className="mx-2"
                active
                tabIndex={-1}
              >
                Search
              </Button>
            </Form>
            <div className="row images-results" style={{ padding: 20 }}>
              {images ? (
                <Fragment>
                  {images.map(image => (
                    <div className="col-sm-6" key={image.id}>
                      <img
                        src={image.urls.thumb}
                        style={{
                          width: '100%',
                          height: 120,
                          margin: '20px 0',
                          borderRadius: 5
                        }}
                        onClick={() => setBackground(image.urls)}
                      />
                    </div>
                  ))}
                </Fragment>
              ) : null}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            className="mt-2"
            size="md"
            active
            tabIndex={-1}
            onClick={toggle}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};

export default connect(
  mapStateToProps,
  { setBackground }
)(ChangeBackground);
