import React, { Component } from "react";
import { Layout, Badge, Card, List, message, Modal, Button } from "antd";
import {
  BellOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { handleUserInfo } from "@/redux/actions/login";
import { handleCollapse } from "@/redux/actions/sidebar";
import $axios from "@/axios/$axios";
import { ExclamationCircleOutlined } from "@ant-design/icons";
const { confirm } = Modal;
const { Header } = Layout;
const { Meta } = Card;

class HeaderBar extends Component {
  state = {
    visible: false,
    showMessage: false,
    orders: null,
    messageNumber: null,
  };
  UNSAFE_componentWillMount() {
    let date = new Date();
    this.fetch({ year: date.getFullYear(), month: date.getMonth() + 1 });
  }
  showConfirm = () => {
    confirm({
      title: "退出",
      icon: <ExclamationCircleOutlined />,
      content: "是否退出登录?",
      okText: "退出",
      okType: "danger",
      cancelText: "取消",
      onOk: () => {
        this.handleLogout();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  fetch = (params = {}) => {
    $axios
      .get("/order/all", {
        params: { ...params },
      })
      .then((data) => {
        this.setState({
          orders: data.data.reverse(),
        });
        let ordersNumber = localStorage.getItem("ordersNumber") || 0;
        let length = this.state.orders.length;
        this.setState({ messageNumber: length - ordersNumber });
      })
      .catch(() => {
        message.error("获取订单失败");
      });
  };
  handleLogout = () => {
    localStorage.removeItem("jwt");
    this.props.history.push("/");
  };
  handleMessage = () => {
    this.setState({ showMessage: !this.state.showMessage });
  };
  setting = () => {
    this.setState({ visible: true });
  };
  onClose = () => {
    this.setState({ visible: false });
  };

  handleClearMessage = () => {
    this.setState({ messageNumber: 0 });
    localStorage.setItem("ordersNumber", this.state.orders.length);
  };
  renderMessage = () => {
    return this.state.orders.map((item) => {
      return `${item.email} 于 ${item.date} ${item.time} 购买 ${item.productName}${item.levelName}，消费${item.price}元`;
    });
  };
  render() {
    return (
      <Header theme="light">
        {this.state.visible}
        {this.props.isCollapsed ? (
          <MenuUnfoldOutlined
            onClick={() => {
              this.props.handleCollapse(!this.props.isCollapsed);
            }}
          />
        ) : (
          <MenuFoldOutlined
            onClick={() => {
              this.props.handleCollapse(!this.props.isCollapsed);
            }}
          />
        )}

        <LogoutOutlined onClick={this.showConfirm} />
        <div className="header-number" onClick={this.handleMessage}>
          <a href="#" className="header-number-icon">
            <Badge count={this.state.messageNumber}></Badge>
          </a>
          <BellOutlined />
        </div>
        {this.state.showMessage ? (
          <Card
            style={{ width: 300 }}
            actions={[
              <div onClick={this.handleClearMessage}>全部标记已读</div>,
            ]}
            className="header-message-box"
            onMouseLeave={() => {
              this.handleMessage();
            }}
          >
            <Meta
              title="本月交易提醒"
              description={
                <div className="header-message-box-content-container">
                  <List
                    size="small"
                    bordered={false}
                    dataSource={this.renderMessage()}
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
  }
}
const mapStateToProps = (state) => {
  return {
    isCollapsed: state.sidebar.isCollapsed,
    ordersByMonth: state.monthData.ordersByMonth,
  };
};
const actionCreator = {
  handleCollapse,
  handleUserInfo,
};
export default connect(mapStateToProps, actionCreator)(withRouter(HeaderBar));
