import React, { useState, useEffect } from "react";
import { Layout, Badge, Card, List, Modal } from "antd";
import {
  BellOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { handleUserInfo } from "@/redux/actions/login";
import { handleCollapse } from "@/redux/actions/sidebar";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
const { confirm } = Modal;
const { Header } = Layout;
const { Meta } = Card;
const HeaderBar = (props) => {
  const [showMessage, setShowMessage] = useState(false);
  const [messageNumber, setMessageNumber] = useState(null);
  const [orders, setOrders] = useState(null);
  useEffect(() => {
    isMobile && props.handleCollapse(true);
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
      title: "退出",
      icon: <ExclamationCircleOutlined />,
      content: "是否退出登录?",
      okText: "退出",
      okType: "danger",
      cancelText: "取消",
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
        return `${item.email} 于 ${item.date} ${item.time} 购买 ${item.productName}${item.levelName}，消费${item.price}元`;
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
      <LogoutOutlined onClick={showConfirm} />
      <div className="header-number" onClick={handleMessage}>
        {props.order ? (
          <span className="header-number-icon">
            <Badge count={messageNumber}></Badge>
          </span>
        ) : null}

        <BellOutlined />
      </div>
      <Link to="/account">
        <div className="avatar">{props.user.email}</div>
      </Link>

      {showMessage && orders ? (
        <Card
          actions={[<div onClick={handleClearMessage}>全部标记已读</div>]}
          className="header-message-box"
          onMouseLeave={() => {
            handleMessage();
          }}
        >
          <Meta
            title="本月交易提醒"
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
  handleUserInfo,
};
export default connect(mapStateToProps, actionCreator)(withRouter(HeaderBar));
