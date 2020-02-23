import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { logout } from './../../../Actions/authActions';

const DefaultDropDown = props => {
  const logout = e => {
    e.preventDefault();
    props.logout(() => props.history.push('/welcome'));
  };

  const setLight = e => {
    e.preventDefault();

    document.querySelector('#theme-sheet').href =
      '/assets/vendor/core-ui/css/light.css';
  };

  const setDark = e => {
    e.preventDefault();
    document.querySelector('#theme-sheet').href =
      '/assets/vendor/core-ui/css/dark.css';
  };

  return (
    <Fragment>
      <ul className="nav navbar-nav ml-auto" style={{ marginRight: 15 }}>
        <li className="nav-item dropdown">
          <a
            className="nav-link"
            data-toggle="dropdown"
            href="#"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <img
              className="img-avatar"
              src="/assets/img/user.png"
              alt="admin@bootstrapmaster.com"
            />
          </a>

          <div className="dropdown-menu dropdown-menu-right">
            <div className="dropdown-header text-center">
              <strong>Colors</strong>
            </div>

            <a className="dropdown-item" href="#" onClick={setDark}>
              <i className="fas fa-moon" /> Dark
            </a>

            <a className="dropdown-item" href="#" onClick={setLight}>
              <i className="far fa-sun" /> Light
            </a>
            <div className="dropdown-header text-center">
              <strong>Account</strong>
            </div>

            <Link to="/profile" className="dropdown-item">
              <i className="fa fa-user" /> Profile
            </Link>

            <a className="dropdown-item" href="#" onClick={logout}>
              <i className="fa fa-lock" /> Logout
            </a>
          </div>
        </li>
      </ul>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {};
};

export default withRouter(
  connect(
    mapStateToProps,
    { logout }
  )(DefaultDropDown)
);
