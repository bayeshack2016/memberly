import React, { useState, useEffect } from "react";
import {
  handleFetchProductInfo,
  handleFetchSetting,
} from "../../redux/actions/product";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import ShoppingPage from "../../pages/shoppingPage";
import MobilePage from "../../pages/mobilePage";
import "./index.css";
import PaymentDialog from "../../components/paymentDialog";
import PageLoading from "../../components/pageLoading";
import { isMobile } from "react-device-detect";
const Product = (props) => {
  const [showDialog, setShowDialog] = useState(false);
  const [chooseLevel, setchooseLevel] = useState(null);
  const { productInfo, setting } = props;
  useEffect(() => {
    let id = document.location.href.split("/").reverse()[0];
    props.handleFetchProductInfo(id);
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    props.productInfo && props.handleFetchSetting(props.productInfo.uid);
    // eslint-disable-next-line
  }, [props.productInfo]);
  const handleDialog = (bool, chooseLevel) => {
    setShowDialog(bool);
    setchooseLevel(chooseLevel);
  };

  if (!setting || !productInfo) {
    return <PageLoading />;
  }
  if (productInfo === 404) {
    return <Redirect to="/error/404" />;
  }
  return (
    <div className="product-theme-container">
      {showDialog ? (
        <PaymentDialog
          productInfo={productInfo}
          chooseLevel={chooseLevel}
          handleDialog={handleDialog}
          showDialog={showDialog}
          paypal={props.paypal}
        />
      ) : null}
      {isMobile ? (
        <MobilePage
          productInfo={productInfo}
          handleDialog={handleDialog}
          showDialog={showDialog}
          theme={setting.themeOption}
        />
      ) : (
        <ShoppingPage
          productInfo={productInfo}
          handleDialog={handleDialog}
          showDialog={showDialog}
          theme={setting.themeOption}
        />
      )}
      <img
        src="/assets/contact-header.png"
        alt=""
        style={{ display: "none" }}
      />
      <img
        src="/assets/contact-footer.png"
        alt=""
        style={{ display: "none" }}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    productInfo: state.product.productInfo,
    setting: state.product.setting,
    paypal: state.form.paypal,
  };
};
const actionCreator = {
  handleFetchProductInfo,
  handleFetchSetting,
};

export default connect(mapStateToProps, actionCreator)(Product);
