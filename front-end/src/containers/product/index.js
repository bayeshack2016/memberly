import React, { Component } from "react";
import {
  handleFetchProductInfo,
  handleFetchSetting,
} from "@/redux/actions/product";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import ProductPage from "@/components/productPage";
import MobilePage from "@/components/mobilePage";
import "./index.css";
import PaymentDialog from "@/components/paymentDialog";
import PageLoading from "@/components/pageLoading";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDialog: false,
      chooseLevel: null,
      formData: null,
      qrUrl: null,
      orderInfo: null,
    };
    this.checkPayment = null;
  }
  UNSAFE_componentWillMount() {
    let url = document.location.toString();
    let idArr = url.split("/");
    let id = idArr.pop();
    this.props.handleFetchProductInfo(id);
    this.props.handleFetchSetting();
  }
  handleDialog = (bool, chooseLevel) => {
    this.setState({ formData: null });
    this.setState({ showDialog: bool });
    this.setState({ chooseLevel: chooseLevel });
  };

  render() {
    this.state.orderInfo && clearInterval(this.checkPayment);
    const { productInfo, setting } = this.props;
    // console.log(productInfo, setting, "productInfo, setting");
    const { chooseLevel } = this.state;
    if (!setting || !productInfo) {
      return <PageLoading />;
    }
    if (productInfo === 404) {
      return <Redirect to="/error/404" />;
    }
    const sUserAgent = navigator.userAgent.toLowerCase();
    let userAgent;
    if (
      /ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(
        sUserAgent
      )
    ) {
      //跳转移动端页面
      userAgent = "mobile";
    } else {
      //跳转pc端页面
      userAgent = "pc";
    }
    // console.log(sUserAgent, userAgent, "userAgent");
    return (
      <div className="product-theme-container">
        {this.state.showDialog ? (
          <PaymentDialog
            productInfo={productInfo}
            chooseLevel={chooseLevel}
            handleDialog={this.handleDialog}
            showDialog={this.state.showDialog}
          />
        ) : null}
        {userAgent === "mobile" ? (
          <MobilePage
            productInfo={productInfo}
            handleDialog={this.handleDialog}
            theme={setting.themeOption}
          />
        ) : (
          <ProductPage
            productInfo={productInfo}
            handleDialog={this.handleDialog}
            theme={setting.themeOption}
          />
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    productInfo: state.product.productInfo,
    setting: state.product.setting,
  };
};
const actionCreator = {
  handleFetchProductInfo,
  handleFetchSetting,
};

export default connect(mapStateToProps, actionCreator)(Product);
