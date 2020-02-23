import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

import './EditProfile.css';

const EditProfile = props => {
  return (
    <Fragment>
      <div className="card mt-3 p-4">
        <div className="card-content">
          <h2>Profile section coming soon...</h2>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {};
};

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(EditProfile)
);
