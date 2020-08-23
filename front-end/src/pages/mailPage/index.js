import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import "./index.css";
import { connect } from "react-redux";
import QQMail from "../../components/qqMail";
import NeteaseMail from "../../components/neteaseMail";
import Gmail from "../../components/gmail";
const { Item } = Menu;
const menuMap = {
  qqMail: "QQ 邮箱",
  neteaseMail: "163 邮箱",
  gmail: "Gmail 邮箱",
};
let main;
const MailPage = (props) => {
  const [mode, setMode] = useState("inline");
  const [selectedKey, setSelectedKey] = useState("qqMail");
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
      case "qqMail":
        return <QQMail formData={props.qqMail} />;

      case "neteaseMail":
        return <NeteaseMail formData={props.neteaseMail} />;

      case "gmail":
        return <Gmail formData={props.gmail} />;

      default:
        break;
    }

    return null;
  };
  return (
    <div className="shadow-radius">
      <div
        className="order-page-header"
        style={{
          backgroundColor: "white",
          height: "100px",
          padding: "30px 20px",
        }}
      >
        <div style={{ fontSize: "20px", fontWeight: "500" }}>邮箱设置</div>
        <p style={{ lineHeight: "35px", fontSize: "15px", opacity: "0.8" }}>
          当用户完成下单，会通过邮件的方式向用户发送订单信息，在这里填写您用于发送订单的邮箱
        </p>
      </div>
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
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    email: state.form.email,
    isVerified: state.form.isVerified,
  };
};
const actionCreator = {};
export default connect(mapStateToProps, actionCreator)(MailPage);
