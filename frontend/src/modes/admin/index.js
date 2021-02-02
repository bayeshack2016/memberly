import React, { useState, useEffect } from "react";
import { Layout, Row } from "antd";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Content from "./components/content";
import "./index.css";
import { connect } from "react-redux";
import Pageloading from "../../components/pageLoading";
// import { handleFetchByWeek } from "@/redux/actions/weekData";
// import { handleFetchByMonth } from "@/redux/actions/monthData";
// import { handleFetchByYear } from "@/redux/actions/yearData";
// import { handleFetchByPeriod } from "@/redux/actions/periodData";
import {
  handleFetchAllProduct,
  handleFetchSetting,
} from "@/redux/actions/product";
import {
  handleFetchForm,
  handleFetchOrder,
  handleFetchDisaccount,
} from "@/redux/actions/form";
const App = (props) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    props.handleFetchAllProduct();
    props.handleFetchDisaccount();
    props.handleFetchForm();
    props.handleFetchSetting();
    // props.handleFetchByPeriod();
    // props.handleFetchByYear();
    // props.handleFetchByMonth();
    // props.handleFetchByWeek();
    // props.handleFetchOrder();
  }, []);
  useEffect(() => {
    props.handleFetchOrder();
  }, [loading]);
  useEffect(() => {
    setLoading(!(props.allProducts && props.setting && props.user));
  }, [props.allProducts, props.setting, props.user]);
  const renderFetchMask = () => {
    return (
      <div className="fetching-data-mask">
        <img src="/assets/theme/default.svg" alt="" className="login-mask-image" />
        <Row
          justify="center"
          className="login-mask-title"
          style={{ fontWeight: "bold" }}
        >
          Coodo Pay
        </Row>
        <Row justify="center" className="login-mask-subtitle">
          <span>👏</span> 欢迎使用可道支付
        </Row>
        <Pageloading />
        <Row justify="center" style={{ lineHeight: "40px" }}>
          正在为您加载数据
        </Row>
        <Row className="login-title" justify="center">
          <div style={{ width: "150px" }}>
            <img
              src="../assets/logo.svg"
              alt=""
              className="login-logo"
              style={{
                width: "30px",
                marginTop: "30px",
              }}
            />

            <span className="login-mask-text">Coodo Pay</span>
          </div>
        </Row>
        <Row justify="center"></Row>
      </div>
    );
  };
  return (
    <div className="admin-container" style={{ height: "100%" }}>
      {loading ? (
        renderFetchMask()
      ) : (
        <Layout style={{ height: "100%" }}>
          <Sidebar />
          <Layout>
            <Header />
            <Content />
          </Layout>
        </Layout>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    allProducts: state.product.allProducts,
    user: state.form.user,
    setting: state.product.setting,
    order: state.form.order,
  };
};
const actionCreator = {
  // handleFetchByPeriod,
  // handleFetchByYear,
  // handleFetchByMonth,
  // handleFetchByWeek,
  handleFetchForm,
  handleFetchSetting,
  handleFetchOrder,
  handleFetchAllProduct,
  handleFetchDisaccount,
};

export default connect(mapStateToProps, actionCreator)(App);
