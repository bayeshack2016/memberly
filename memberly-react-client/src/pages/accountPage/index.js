import React, { useState } from "react";
import { Menu } from "antd";
import { isMobile } from "react-device-detect";
import PaymentPage from "../paymentPage";
import ThemePage from "../themePage";
import SecurityPage from "../securityPage";
import MailPage from "../mailPage";
import AboutPage from "../aboutPage";
import GeneralPage from "../generalPage";
import DevelopPage from "../developPage";
import NotifyPage from "../notifyPage";

const { Item } = Menu;

const menuMap = {
  general: "通用设置",
  security: "安全设置",
  develop: "开发设置",
  payment: "支付设置",
  email: "邮箱设置",
  notification: "通知设置",
  theme: "主题设置",
  about: "关于项目",
  // notification: "New Message Notification"
};
const SettingPage = (props) => {
  const [selectedKey, setSelectedKey] = useState("general");

  const getMenu = () => {
    return Object.keys(menuMap).map((item) => (
      <Item key={item}>{menuMap[item]}</Item>
    ));
  };
  const selectKey = (key) => {
    setSelectedKey(key);
  };

  const renderChildren = () => {
    switch (selectedKey) {
      case "general":
        return <GeneralPage />;
      case "security":
        return <SecurityPage />;
      case "payment":
        return <PaymentPage />;
      case "theme":
        return <ThemePage />;
      case "email":
        return <MailPage />;
      case "notification":
        return <NotifyPage />;
      case "about":
        return <AboutPage />;
      case "develop":
        return <DevelopPage />;
      default:
        break;
    }

    return null;
  };
  return (
    <div className="product-page-container">
      <div className="main">
        <div className={"leftMenu"} style={isMobile ? { width: "100%" } : {}}>
          <Menu
            mode="inline"
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
        <div className="right" style={{ margin: 10, paddingBottom: 20 }}>
          {renderChildren()}
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
