import React, { useState, useEffect } from "react";
import { Layout, Row } from "antd";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Content from "./components/content";
import "./index.css";
import { connect } from "react-redux";
import Pageloading from "../../components/pageLoading";
import {
  handleFetchAllProduct,
  handleFetchSetting,
} from "../../redux/actions/product";
import {
  handleFetchForm,
  handleFetchOrder,
  handleFetchDiscount,
} from "../../redux/actions/form";
import { useTranslation } from "react-i18next";

const App = (props) => {
  const [loading, setLoading] = useState(true);
  const uid = localStorage.getItem("uid");
  const { t } = useTranslation();
  useEffect(() => {
    props.handleFetchAllProduct(uid);
    props.handleFetchDiscount(uid);
    props.handleFetchForm(uid);
    props.handleFetchSetting(uid);
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    props.handleFetchOrder(uid);
    // eslint-disable-next-line
  }, [loading]);
  useEffect(() => {
    setLoading(!(props.allProducts && props.setting && props.user));
  }, [props.allProducts, props.setting, props.user]);
  const renderFetchMask = () => {
    return (
      <div
        className="fetching-data-mask"
        style={{
          backgroundImage: "url(/assets/theme/default.svg)",
          height: "100%",
        }}
      >
        <Row
          justify="center"
          className="login-mask-title"
          style={{ fontWeight: "bold" }}
        >
          Memberly
        </Row>
        <Row justify="center" className="login-mask-subtitle">
          {/* eslint-disable-next-line */}
          <span role="img">👏</span> {t("Welcome to Memberly")}
        </Row>
        <Pageloading />
        <Row justify="center" style={{ lineHeight: "40px" }}>
          {t("Loading your data")}
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

            <span className="login-mask-text">Memberly</span>
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
  handleFetchForm,
  handleFetchSetting,
  handleFetchOrder,
  handleFetchAllProduct,
  handleFetchDiscount,
};

export default connect(mapStateToProps, actionCreator)(App);
