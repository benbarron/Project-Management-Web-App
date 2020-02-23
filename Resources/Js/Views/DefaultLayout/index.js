import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Route } from 'react-router-dom';
import DefaultHeader from './DefaultHeader';
import DefaultSideBar from './DefaultSideBar';
import { UserRoutes } from './../../Routes/UserRoutes';

// import DefaultBreadCrumbs from "./DefaultBreadCrumbs";
import DefaultAside from './DefaultAside';

import { loadBoards } from './../../Actions/boardActions';
import { loadCards } from './../../Actions/cardActions';
import { loadTodos } from './../../Actions/todoActions';

const DefaultLayout = props => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    props.loadBoards();
    props.loadCards();
    props.loadTodos();
  }, []);

  const toggleSideBar = () => {
    const sideClasses = ['sidebar-lg-show', 'sidebar-md-show', 'sidebar-show'];

    for (let i = 0; i < sideClasses.length; i++) {
      if (open) {
        document.body.classList.remove(sideClasses[i]);
      } else {
        document.body.classList.add(sideClasses[i]);
      }
    }

    setOpen(!open);
  };

  return (
    <Fragment>
      <DefaultHeader toggleSideBar={toggleSideBar} />
      <div className="app-body">
        <DefaultSideBar toggleSideBar={toggleSideBar} />
        <main className="main">
          <div className="container-fluid">
            <div className="animated fadeIn">
              {UserRoutes.map((route, i) => (
                <Route
                  key={i}
                  exact={route.exact}
                  path={route.path}
                  component={route.component}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  {
    loadBoards,
    loadCards,
    loadTodos
  }
)(DefaultLayout);
