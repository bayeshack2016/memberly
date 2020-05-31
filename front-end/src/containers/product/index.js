import React, { Component } from "react";
import {
  handleFetchProductInfo,
  handleFetchSetting,
} from "@/redux/actions/product";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PaymentPage from "@/components/paymentPage";
import MobilePage from "@/components/mobilePage";
import "./index.css";
import PaymentDialog from "@/components/paymentDialog";
import PageLoading from "@/components/pageLoading";
import { isMobile } from "react-device-detect";
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
        {isMobile ? (
          <MobilePage
            productInfo={productInfo}
            handleDialog={this.handleDialog}
            theme={setting.themeOption}
          />
        ) : (
          <PaymentPage
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
