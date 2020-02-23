import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const DefaultSideBar = props => {
  return (
    <Fragment>
      <div className="sidebar">
        <nav className="sidebar-nav">
          <ul className="nav">
            <Link to="/">
              <li className="nav-item">
                <span className="nav-link" to="/">
                  <i className="fas fa-tasks mx-3" /> Boards
                </span>
              </li>
            </Link>
            {/* <Link to="/projects">
              <li className="nav-item">
                <span className="nav-link">
                  <i className="fas fa-project-diagram mx-3" /> Projects
                </span>
              </li>
            </Link> */}
            <Link to="/calendar">
              <li className="nav-item">
                <span className="nav-link">
                  <i className="fas fa-calendar-week mx-3" /> Calendar
                </span>
              </li>
            </Link>
            <Link to="/profile">
              <li className="nav-item">
                <span className="nav-link">
                  <i className="fas fa-user mx-3" /> Profile
                </span>
              </li>
            </Link>
          </ul>
        </nav>
        {/* <button
          className="sidebar-minimizer brand-minimizer"
          type="button"
          onClick={props.toggleSidebar}
        /> */}
      </div>
    </Fragment>
  );
};

export default DefaultSideBar;
