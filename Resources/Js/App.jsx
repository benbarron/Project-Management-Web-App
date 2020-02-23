import React, { Fragment, useEffect } from 'react';

import { Route, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import { loadUser } from './Actions/authActions';
import { moveItem, reorderCards } from './Actions/dragAndDropActions';

import DefaultLayout from './Views/DefaultLayout';
import Login from './Views/Pages/Login';
import Register from './Views/Pages/Register';
import Welcome from './Views/Pages/Welcome';
import ForgotPassword from './Views/Pages/ForgotPassword';

import { HashLoader } from 'react-spinners';

import { DragDropContext } from 'react-beautiful-dnd';

import './style.css';

const App = props => {
  useEffect(() => {
    props
      .loadUser(props.history.location.pathname)
      .then(path => props.history.push(path))
      .catch();
  }, []);

  const onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    if (result.type === 'item') {
      props.moveItem(result);
    } else if (result.type === 'card') {
      props.reorderCards(result);
    }
  };

  return (
    <Fragment>
      <DragDropContext onDragEnd={onDragEnd}>
        {props.auth.isLoading ? (
          <Fragment>
            <div id="loading-page">
              <div className="loader">
                <HashLoader
                  sizeUnit={'px'}
                  size={150}
                  color={'#fff'}
                  loading={true}
                />
              </div>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            {props.history.location.pathname === '/welcome' ? (
              <Fragment>
                <Route exact path="/welcome" component={Welcome} />
              </Fragment>
            ) : (
              <Fragment>
                {props.auth.isAuthenticated ? (
                  <Fragment>
                    <DefaultLayout />
                  </Fragment>
                ) : (
                  <Fragment>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route
                      exact
                      path="/forgot-password"
                      component={ForgotPassword}
                    />
                  </Fragment>
                )}
              </Fragment>
            )}
          </Fragment>
        )}
      </DragDropContext>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { loadUser, reorderCards, moveItem }
  )(App)
);
