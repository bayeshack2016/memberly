import React from "react";
import { Layout, Menu } from "antd";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import {
  SettingOutlined,
  DashboardOutlined,
  ShopOutlined,
  AccountBookOutlined,
  ShoppingOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const { Sider } = Layout;
const Sidebar = (props) => {
  const { t } = useTranslation();
  const { isCollapsed } = props;
  const menuSelected = props.history.location.pathname;
  const menuOpened = `/${menuSelected.split("/")[1]}`;
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={isCollapsed}
      width="218px"
      style={{
        height: "100%",
        boxShadow: "0px 0px 6px rgba(0,0,0,0.09)",
        zIndex: "10",
      }}
      theme="light"
    >
      <div className="logo" style={{ width: "100%", height: "92px" }}>
        <img
          src="../assets/logo.svg"
          alt=""
          style={{
            width: "40px",
            margin: "30px 10px 20px 24px",
            float: "left",
          }}
        />

        {isCollapsed ? null : (
          <span
            style={{
              fontSize: "23px",
              color: "rgba(72,72,72,1)",
              float: "left",
              marginTop: "40px",
              fontWeight: "500",
            }}
          >
            Memberly
          </span>
        )}
      </div>
      <Menu
        theme="light"
        mode="inline"
        defaultOpenKeys={[menuOpened]}
        defaultSelectedKeys={[menuSelected]}
        selectedKeys={[menuSelected]}
      >
        <Menu.Item key="/productList">
          <Link to="/productList">
            <AccountBookOutlined />
            <span className="nav-text">{t("Products")}</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/order">
          <Link to="/order">
            <ShopOutlined />
            <span className="nav-text">{t("Orders")}</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/discount">
          <Link to="/discount">
            <ShoppingOutlined />
            <span className="nav-text">{t("Discounts")}</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/customer">
          <Link to="/customer">
            <SmileOutlined />
            <span className="nav-text">{t("Users")}</span>
          </Link>
        </Menu.Item>

        <Menu.Item key="/dashboard">
          <Link to="/dashboard">
            <DashboardOutlined />
            <span className="nav-text">{t("Analysis")}</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/account">
          <Link to="/account">
            <SettingOutlined />

            <span className="nav-text">{t("Setting")}</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
const mapStateToProps = (state) => {
  return {
    isCollapsed: state.sidebar.isCollapsed,
  };
};
const actionCreator = {};
export default connect(mapStateToProps, actionCreator)(withRouter(Sidebar));
