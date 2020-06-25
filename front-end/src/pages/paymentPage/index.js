import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { connect } from "react-redux";
import Alipay from "../../components/alipay";
import WechatPay from "../../components/wechatPay";
import Paypal from "../../components/paypal";
import "./index.css";
const { Item } = Menu;
const menuMap = {
  alipay: "支付宝",
  wechatPay: "微信支付",
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
  });

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
        return <Alipay formData={props.alipay} />;

      case "wechatPay":
        return <WechatPay formData={props.wechatPay} />;

      case "paypal":
        return <Paypal formData={props.paypal} />;

      default:
        break;
    }

    return null;
  };
  return (
    <div className={"main"}>
      <div className={"leftMenu"}>
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
      <div className={"right"}>{renderChildren()}</div>
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
