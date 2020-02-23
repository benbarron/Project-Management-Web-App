import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { login } from './../../../Actions/authActions';

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

import './Login.css';

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const login = e => {
    e.preventDefault();

    if (!email || !password) {
      return setMsg('Please enter all fields');
    }

    props
      .login({ email, password})
      .then(() => props.history.push('/'))
      .catch(msg => setMsg(msg))
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
                <Form onSubmit={login}>
                  <h1>Login</h1>
                  <p className="text-muted">Sign In to your account</p>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="px-3">
                        <i className="fas fa-user" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      placeholder="Email"
                      autoComplete="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
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
                      placeholder="Password"
                      autoComplete="current-password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
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
                      className="mt-2"
                      active
                      tabIndex={-1}
                    >
                      Login
                    </Button>
                  </InputGroup>
                </Form>
              </CardBody>
              <CardFooter className="p-4">
                <div className="d-flex justify-content-between">
                  <div>
                    <Link to="/register">Don't have an account? Sign up.</Link>
                  </div>
                  <div>
                    <Link to="/forgot-password">
                      Forgot Password? Reset it.
                    </Link>
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
  return {};
};

export default connect(
  mapStateToProps,
  {
    login
  }
)(Login);
