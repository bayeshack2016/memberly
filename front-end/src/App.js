import React from "react";
import { Provider } from "react-redux";
import "react-hot-loader";
import { hot } from "react-hot-loader/root";
import Router from "./router/index";
import store from "./redux/store";
import "./assets/style/reset.css";

const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default hot(App);
