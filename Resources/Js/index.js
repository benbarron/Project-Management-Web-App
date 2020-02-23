import React, { forwardRef } from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App";
import Store from "./Store";

import * as serviceWorker from "./serviceWorker";

const Wrapper = () => {
  return (
    <Provider store={Store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
};

if (document.getElementById("app")) {
  ReactDOM.render(<Wrapper />, document.getElementById("app"));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
