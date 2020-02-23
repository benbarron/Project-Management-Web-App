import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Welcome.css';

const Welcome = props => {
  return (
    <Fragment>
      <header>
        <div className="header-left">
          <h4>
            <span className="text-primary">Task</span>
            Manager
          </h4>
        </div>
        <div className="header-right">
          {!props.auth.isAuthenticated ? (
            <Fragment>
              <Link to="/login" className="btn btn-primary mx-4">
                Login
              </Link>
              <Link to="/register" className="btn btn-secondary ">
                Register
              </Link>
            </Fragment>
          ) : (
            <Fragment>
              <Link to="/" className="btn btn-secondary">
                Return To Dashboard
              </Link>
            </Fragment>
          )}
        </div>
      </header>

      <div className="home-hero">
        <div className="home-hero-overlay">
          <div className="">
            <div className="row center-xs center-sm center-md center-lg middle-xs middle-sm middle-md middle-lg">
              <div className="col-xs-10 col-sm-10 col-md-10 col-lg-7 home-hero-content">
                <h1 style={{ fontSize: 48 }}>Task Management Made Easy</h1>
                <p className="text-alternate"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  {}
)(Welcome);
