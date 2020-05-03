import React, { Component } from "react";
import { Provider } from "react-redux";
import "react-hot-loader";
import { hot } from "react-hot-loader/root";
import Router from "./router/index";
import store from "./redux/store";
import "./assets/style/reset.css";

class App extends Component {
  state = {};
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default hot(App);
