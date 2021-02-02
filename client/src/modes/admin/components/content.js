import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter, Route, Switch } from "react-router-dom";
import { routes } from "@/router/routes";
import $axios from "@/axios/$axios";
const MainContent = (props) => {
  const handleFirstLogin = async () => {
    const { setting } = props;
    if (setting.isFirst === "yes") {
      await $axios.post(`/setting/${setting._id}`, { isFirst: "no" });
    }
  };
  handleFirstLogin();
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
        Supported by
        <a
          href="https://github.com/troyeguo/coodo-pay"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          Coodo Pay
        </a>
        , Copyright © {date.getFullYear()}
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
