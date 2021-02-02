import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { connect } from "react-redux";
import PaymentMethod from "../../components/paymentMethod";
import PageHeader from "../../components/pageHeader";
import { isMobile } from "react-device-detect";
import "./index.css";
const { Item } = Menu;
const menuMap = {
  alipay: "支付宝",
  paypal: "Paypal",
};
let main;
const PaymentPage = (props) => {
  const [mode, setMode] = useState("inline");
  const [selectedKey, setSelectedKey] = useState("alipay");
  useEffect(() => {
    window.addEventListener("resize", resize);
    resize();
    return window.removeEventListener("resize", resize);
  }, []);

  const getMenu = () => {
    return Object.keys(menuMap).map((item) => (
      <Item key={item}>{menuMap[item]}</Item>
    ));
  };

  const selectKey = (key) => {
    setSelectedKey(key);
  };

  const resize = () => {
    if (!main) {
      return;
    }

    requestAnimationFrame(() => {
      if (!main) {
        return;
      }

      let mode = "inline";
      const { offsetWidth } = main;

      if (main.offsetWidth < 641 && offsetWidth > 400) {
        mode = "horizontal";
      }

      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = "horizontal";
      }

      setMode(mode);
    });
  };

  const renderChildren = () => {
    switch (selectedKey) {
      case "alipay":
        return (
          <PaymentMethod
            formData={props.alipay}
            mode="alipay"
            name="支付宝"
            title="添加支付宝当面付"
          />
        );
      case "paypal":
        return (
          <PaymentMethod
            formData={props.paypal}
            mode="paypal"
            name="PayPal"
            title="添加PayPal"
          />
        );

      default:
        break;
    }

    return null;
  };
  return (
    <div className="product-page-container" style={{ position: "relative" }}>
      <PageHeader title="支付设置" desc="在这里添加你的收款账户" />
      <div
        className={"main"}
        style={isMobile ? { margin: "5px" } : { margin: "20px" }}
      >
        <div className={"leftMenu"} style={isMobile ? { width: "100%" } : {}}>
          <Menu
            mode={mode}
            selectedKeys={[selectedKey]}
            onClick={({ key }) => selectKey(key)}
            className="payment-page"
            style={{
              marginTop: "10px",
            }}
          >
            {getMenu()}
          </Menu>
        </div>
        <div className={"right"} style={isMobile ? { padding: 0 } : {}}>
          {renderChildren()}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    alipay: state.form.alipay,
    wechatPay: state.form.wechatPay,
    paypal: state.form.paypal,
  };
};
const actionCreator = {
  // handleFetchForm
};
export default connect(mapStateToProps, actionCreator)(PaymentPage);
