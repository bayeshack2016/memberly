import React, { Component } from "react";
import { Layout, Row } from "antd";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Content from "./components/content";
import "./index.css";
import { connect } from "react-redux";
import Pageloading from "../../components/pageLoading";
import { handleFetchByWeek } from "@/redux/actions/weekData";
import { handleFetchByMonth } from "@/redux/actions/monthData";
import { handleFetchByYear } from "@/redux/actions/yearData";
import { handleFetchByPeriod } from "@/redux/actions/periodData";
import {
  handleFetchAllProduct,
  handleFetchSetting,
} from "@/redux/actions/product";
import { handleFetchForm } from "@/redux/actions/form";
class App extends Component {
  state = { loading: true };
  UNSAFE_componentWillMount() {
    this.props.handleFetchByPeriod();
    this.props.handleFetchByYear();
    this.props.handleFetchByMonth();
    this.props.handleFetchByWeek();
    this.props.handleFetchAllProduct();
    this.props.handleFetchForm();
    this.props.handleFetchSetting();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      loading: !(nextProps.allProducts && nextProps.setting && nextProps.user),
    });
  }

  render() {
    const { loading } = this.state;
    const renderFetchMask = () => {
      return (
        <div className="fetching-data-mask">
          <img src="/assets/default.svg" alt="" className="login-mask-image" />
          <Row justify="center" className="login-mask-title">
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
                  // marginLeft: "70px"
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
  }
}
const mapStateToProps = (state) => {
  return {
    allProducts: state.product.allProducts,
    user: state.form.user,
    setting: state.product.setting,
  };
};
const actionCreator = {
  handleFetchByPeriod,
  handleFetchAllProduct,
  handleFetchByYear,
  handleFetchByMonth,
  handleFetchByWeek,
  handleFetchForm,
  handleFetchSetting,
};

export default connect(mapStateToProps, actionCreator)(App);
