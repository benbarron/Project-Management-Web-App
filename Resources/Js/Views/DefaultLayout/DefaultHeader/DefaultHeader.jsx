import React, { Fragment, useState } from 'react';

import { connect } from 'react-redux';

import DefaultDropDown from './../DefaultDropDown';

const DefaultHeader = props => {
  return (
    <Fragment>
      <header className="app-header navbar">
        <button
          className="navbar-toggler sidebar-toggler d-lg-none mr-auto"
          type="button"
          onClick={props.toggleSideBar}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="navbar-brand p-3" href="#">
          <h4 className="mt-2 ml-2">{'Task Manager'}</h4>
        </div>
        <button
          className="navbar-toggler sidebar-toggler d-md-down-none"
          type="button"
          onClick={props.toggleSideBar}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <DefaultDropDown />
      </header>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  {}
)(DefaultHeader);
