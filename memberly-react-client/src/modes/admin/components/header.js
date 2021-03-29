import React, { useState, useEffect } from "react";
import { Layout, Badge, Card, List, Modal, Menu, Dropdown, Button } from "antd";
import {
  BellOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BankOutlined,
  ExclamationCircleOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { handleCollapse } from "../../../redux/actions/sidebar";
import { isMobile } from "react-device-detect";
const { confirm } = Modal;
const { Header } = Layout;
const { Meta } = Card;

const HeaderBar = (props) => {
  const { t, i18n } = useTranslation();
  const [showMessage, setShowMessage] = useState(false);
  const [messageNumber, setMessageNumber] = useState(null);
  const [orders, setOrders] = useState(null);
  const menu = (
    <Menu
      onClick={(e) => {
        if (e.key === "1") {
          i18n.changeLanguage("zh");
        } else {
          i18n.changeLanguage("en");
        }
      }}
    >
      <Menu.Item key="1" icon={<BankOutlined />}>
        简体中文
      </Menu.Item>
      <Menu.Item key="2" icon={<BankOutlined />}>
        English
      </Menu.Item>
    </Menu>
  );
  useEffect(() => {
    isMobile && props.handleCollapse(true);
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (!props.order) {
      return;
    }
    let date = new Date();
    let monthOrder = [];

    props.order.reverse().forEach((item) => {
      if (
        item.year === date.getFullYear() &&
        item.month === date.getMonth() + 1
      ) {
        monthOrder.push(item);
      }
    });
    setOrders(monthOrder);

    let ordersNumber =
      monthOrder.length < (parseInt(localStorage.getItem("ordersNumber")) || 0)
        ? 0
        : localStorage.getItem("ordersNumber") || 0;
    setMessageNumber(monthOrder.length - ordersNumber);
  }, [props.order]);

  const showConfirm = () => {
    confirm({
      title: t("Exit"),
      icon: <ExclamationCircleOutlined />,
      content: t("Confirm to Logout?"),
      okText: t("Exit"),
      okType: "danger",
      cancelText: t("Cancel"),
      onOk: () => {
        handleLogout();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    props.history.push("/");
  };
  const handleMessage = () => {
    setShowMessage(!showMessage);
  };

  const handleClearMessage = () => {
    setMessageNumber(0);
    localStorage.setItem("ordersNumber", orders.length);
  };
  const renderMessage = () => {
    return (
      orders &&
      orders.map((item) => {
        return i18n.language === "zh"
          ? `${item.email} 于 ${item.date} ${item.time} 购买 ${item.productName}${item.levelName}，消费${item.price}元`
          : `${item.email} bought ${item.productName}${item.levelName} at ${item.date} ${item.time} in USD ${item.price}`;
      })
    );
  };
  return (
    <Header theme="light">
      {props.isCollapsed ? (
        <MenuUnfoldOutlined
          onClick={() => {
            props.handleCollapse(!props.isCollapsed);
          }}
        />
      ) : (
        <MenuFoldOutlined
          onClick={() => {
            props.handleCollapse(!props.isCollapsed);
          }}
        />
      )}
      <Dropdown overlay={menu}>
        <Button>
          {t("Language")} <DownOutlined />
        </Button>
      </Dropdown>
      <LogoutOutlined onClick={showConfirm} />
      <div className="header-number" onClick={handleMessage}>
        {props.order ? (
          <span className="header-number-icon">
            <Badge count={messageNumber}></Badge>
          </span>
        ) : null}

        <BellOutlined />
      </div>

      {showMessage && orders ? (
        <Card
          actions={[
            <div onClick={handleClearMessage}>{t("Mark as read")}</div>,
          ]}
          className="header-message-box"
          onMouseLeave={() => {
            handleMessage();
          }}
        >
          <Meta
            title={t("Sales of this month")}
            description={
              <div className="header-message-box-content-container">
                <List
                  size="small"
                  bordered={false}
                  dataSource={renderMessage()}
                  renderItem={(item) => <List.Item>{item}</List.Item>}
                  className="header-message-box-content"
                />
              </div>
            }
          />
        </Card>
      ) : null}
    </Header>
  );
};

const mapStateToProps = (state) => {
  return {
    isCollapsed: state.sidebar.isCollapsed,
    ordersByMonth: state.monthData.ordersByMonth,
    order: state.form.order,
    user: state.form.user,
  };
};
const actionCreator = {
  handleCollapse,
};
export default connect(mapStateToProps, actionCreator)(withRouter(HeaderBar));
