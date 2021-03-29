import React from "react";
import { connect } from "react-redux";
import { Redirect, withRouter, Route, Switch } from "react-router-dom";
import { routes } from "../../../router/routes";
const MainContent = (props) => {
  const date = new Date();
  return (
    <div className="content-container" style={{ height: "calc(100% - 61px)" }}>
      <Switch>
        {routes.map((ele) => (
          <Route
            render={() => <ele.component />}
            key={ele.path}
            path={ele.path}
          />
        ))}
        <Redirect from="/" exact to="/productList" />
        <Redirect to="/error/404" />
      </Switch>
      <div className="default-footer">
        Copyright © {date.getFullYear()}
        <a
          href="https://github.com/troyeguo"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          App by Troye
        </a>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ setting: state.product.setting });
export default withRouter(connect(mapStateToProps)(MainContent));
