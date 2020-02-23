import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { register } from './../../../Actions/authActions';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap';

import './Register.css';

const Register = props => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPasswrod, setCPassword] = useState('');
  const [msg, setMsg] = useState('');

  const register = e => {
    e.preventDefault();

    if (!fullname || !email || !password || !cPasswrod) {
      return setMsg('All fields are required');
    }

    if (password !== cPasswrod) {
      return setMsg("Passwords don't match");
    }

    const payload = {
      fullname,
      email,
      password
    };

    props
      .register(payload)
      .then(path => props.history.push('/'))
      .catch(msg => setMsg(msg));
  };

  return (
    <div
      className="app flex-row align-items-center"
      style={{
        background: "url('/assets/img/bg.svg') no-repeat",
        backgroundSize: 'cover'
      }}
    >
      <Container>
        <Row
          className="justify-content-center"
          style={{ transform: 'translateY(-100px)' }}
        >
          <Col md="9" lg="7" xl="6">
            <Card className="mx-4">
              <CardBody className="p-4">
                <Form onSubmit={register}>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="px-3">
                        <i className="fas fa-user" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      placeholder="Full Name"
                      autoComplete="name"
                      value={fullname}
                      onChange={e => setFullname(e.target.value)}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="px-3">@</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      placeholder="Email"
                      autoComplete="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="px-3">
                        <i className="fas fa-lock" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </InputGroup>
                  <InputGroup className="mb-4">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="px-3">
                        <i className="fas fa-lock" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="password"
                      placeholder="Confirm password"
                      autoComplete="new-password"
                      value={cPasswrod}
                      onChange={e => setCPassword(e.target.value)}
                    />
                  </InputGroup>
                  <InputGroup>
                    <div className="err-msg">
                      {msg ? (
                        <span className="err-text">{'* ' + msg}</span>
                      ) : null}
                    </div>
                  </InputGroup>
                  <InputGroup>
                    <Button
                      type="submit"
                      color="primary"
                      className="mt-1"
                      active
                      tabIndex={-1}
                    >
                      Create Account
                    </Button>
                  </InputGroup>
                </Form>
              </CardBody>
              <CardFooter className="p-4">
                <div className="d-flex justify-content-between">
                  <div>
                    <Link to="/login">Have an account? Sign in.</Link>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    {
      register
    }
  )(Register)
);
