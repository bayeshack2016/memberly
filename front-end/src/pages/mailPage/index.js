import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import "./index.css";
import { connect } from "react-redux";
import Mail from "../../components/mail";
import PageHeader from "../../components/pageHeader";
import { isMobile } from "react-device-detect";

const { Item } = Menu;
const menuMap = {
  qqMail: "QQ 邮箱",
  neteaseMail: "163 邮箱",
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
        return (
          <Mail
            mailName="qq"
            mailTitle="QQ"
            iconName="icon-QQyouxiango"
            mailLink="https://service.mail.qq.com/cgi-bin/help?subtype=1&&no=1001256&&id=28"
            email={props.email.filter((item) => item.mailName === "qq")[0]}
          />
        );

      case "neteaseMail":
        return (
          <Mail
            mailName="163"
            mailTitle="163"
            iconName="icon-wangyi"
            mailLink="http://help.mail.163.com/faqDetail.do?code=d7a5dc8471cd0c0e8b4b8f4f8e49998b374173cfe9171305fa1ce630d7f67ac2cda80145a1742516"
            email={props.email.filter((item) => item.mailName === "163")[0]}
          />
        );

      case "gmail":
        return (
          <Mail
            mailName="gmail"
            mailTitle="Gmail"
            iconName="icon-Gmail"
            mailLink="https://codeburst.io/sending-an-email-using-nodemailer-gmail-7cfa0712a799"
            email={props.email.filter((item) => item.mailName === "gmail")[0]}
          />
        );

      default:
        break;
    }

    return null;
  };
  return (
    <div className="shadow-radius">
      <PageHeader title="邮箱设置" desc="在这里填写您用于发送订单的邮箱" />
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
    email: state.form.email,
    isVerified: state.form.isVerified,
  };
};
const actionCreator = {};
export default connect(mapStateToProps, actionCreator)(MailPage);
