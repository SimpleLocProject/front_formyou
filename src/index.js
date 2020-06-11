import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import store from "./redux/store";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

import "bootstrap/dist/css/bootstrap.css";

import "bootstrap/dist/js/bootstrap.js";
import "./main.scss";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter, faGooglePlus, faLinkedinIn, faInstagram, faUbuntu } from "@fortawesome/free-brands-svg-icons";

library.add(faFacebook, faTwitter, faGooglePlus, faLinkedinIn, faInstagram, faUbuntu, faSearch)


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
