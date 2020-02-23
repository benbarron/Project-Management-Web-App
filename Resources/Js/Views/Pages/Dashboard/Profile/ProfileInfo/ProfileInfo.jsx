import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import './ProfileInfo.css';

const ProfileInfo = props => {
  return (
    <div className="card mt-3 p-4">
      <div className="card-content">
        <h2>Profile section coming soon...</h2>
        <Link to="/profile/edit">
          <button className="btn btn-primary">Edit Profile</button>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  {}
)(ProfileInfo);
