import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

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

import './ForgotPassword.css';

const ForgotPassword = props => {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errCount, setErrCount] = useState(0);
  const [sendMsg, setSendMsg] = useState('');

  const login = e => {
    e.preventDefault();

    setMsg('');
    setSuccessMsg('');
    setSendMsg('Sending...');

    if (!email) {
      return setMsg('Please enter your email');
    }

    axios
      .post('/api/auth/send-reset-link', { email })
      .then(res => {
        setSuccessMsg(res.data.msg);
        setSendMsg('');
        setEmail('');
      })
      .catch(err => {
        if (errCount > 3) {
          return props.history.push('/login');
        }

        setErrCount(errCount + 1);
        setMsg(err.response.data.msg);
        setSendMsg('');
      });
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
                  <h1>Forgot Password</h1>
                  <p className="text-muted">
                    Enter your email to reset your password
                  </p>
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

                  <InputGroup>
                    <div className="err-msg">
                      {msg ? (
                        <span className="err-text">{'* ' + msg}</span>
                      ) : null}
                    </div>
                    <div className="success-msg">
                      {successMsg ? (
                        <span className="success-text">
                          {'* ' + successMsg}
                        </span>
                      ) : null}
                    </div>
                    <div className="success-msg">
                      {sendMsg ? <span>{'* ' + sendMsg}</span> : null}
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
                      Reset Password
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

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(ForgotPassword)
);
