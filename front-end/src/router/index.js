import React from "react";
import { Route, Switch, HashRouter } from "react-router-dom";
import Admin from "@/containers/admin";
import Login from "@/containers/login";
import Product from "@/containers/product";
import Install from "@/containers/install";
import AuthRouter from "@/utils/authUtil";
import Error404 from "../pages/errorPage/error404";
import Error500 from "../pages/errorPage/error500";

const Router = () => {
  return (
    <HashRouter>
      <Switch>
        <Route component={Install} exact path="/install" />
        <Route component={Login} exact path="/login" />
        <Route component={Product} path="/product" />
        <Route component={Error404} path="/error/404" />
        <Route component={Error500} path="/error/500" />
        <AuthRouter path="/" component={Admin} />
      </Switch>
    </HashRouter>
  );
};

export default Router;
