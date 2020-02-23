import React, { Fragment } from 'react';

const DefaultBreadCrumbs = () => {
  return (
    <Fragment>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">Home</li>
        <li className="breadcrumb-item">
          <a href="#">Admin</a>
        </li>
        <li className="breadcrumb-item active">Dashboard</li>
      </ol>
    </Fragment>
  );
};

export default DefaultBreadCrumbs;
