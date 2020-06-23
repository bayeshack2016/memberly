import React, { Component } from "react";
import { Tabs, Modal, Button, Form, Input, message } from "antd";
import "./index.css";
import { decrypt } from "../../utils/crypto";
import $axios from "@/axios/$axios";
import Captcha from "../captcha";
const { TabPane } = Tabs;

class Query extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogVisible: false,
      allowQuery: "forbid",
      orderInfo: null,
      formData: null,
      loading: false,
      activeTab: 1,
    };
  }
  handleCheck = async () => {
    this.setState({ loading: true });
    if (this.state.formData.orderId !== undefined) {
      $axios(`/order/query?orderId=${this.state.formData.orderId}`)
        .then((result) => {
          this.setState({ orderInfo: result.data });
          this.setState({ loading: false });
          this.showModal();
        })
        .catch((err) => {
          console.log(err);
          this.setState({ loading: false });
          message.warning("未找到订单，请确认查询条件是否正确");
        });
    } else {
      $axios(
        `/order/query?email=${this.state.formData.email}&&password=${this.state.formData.password}`
      )
        .then((result) => {
          this.setState({ orderInfo: result.data });
          this.showModal();
          this.setState({ loading: false });
        })
        .catch((err) => {
          message.warning("未找到订单，请确认查询条件是否正确");
          this.setState({ loading: false });
        });
    }
  };
  showModal = () => {
    if (localStorage.getItem("orderInfo")) {
      this.setState({
        orderInfo: JSON.parse(decrypt(localStorage.getItem("orderInfo"))),
      });
    } else {
      message.warning("未查询到订单信息");
      return;
    }

    this.setState({
      dialogVisible: true,
    });
    this.setState({
      allowQuery: "forbid",
    });
  };

  handleOk = (e) => {
    this.setState({
      dialogVisible: false,
    });
    this.setState({ orderInfo: null });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      dialogVisible: false,
    });
    this.setState({ orderInfo: null });
  };
  handleChange = (key) => {
    console.log(key, "key");
    this.setState({ activeTab: parseInt(key) });
  };
  handleQuery = () => {
    this.setState({ allowQuery: "allow" });
  };
  onFinish = (values) => {
    console.log(values);
    this.setState({ formData: values });
    this.handleCheck();
  };
  render() {
    return (
      <div className="query-container">
        {this.state.dialogVisible ? (
          <Modal
            title="订单信息"
            visible={this.state.dialogVisible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            style={{ userSelect: "text" }}
            footer={[
              <Button key="confirm" type="primary" onClick={this.handleOk}>
                确认
              </Button>,
            ]}
          >
            <p>订单号：{this.state.orderInfo.orderId}</p>
            <p>购买日期：{this.state.orderInfo.date}</p>
            <p>
              产品信息：{this.state.orderInfo.productName}
              {this.state.orderInfo.levelName}
            </p>
            <p>金额：{this.state.orderInfo.price}</p>
            <p>会员码：{this.state.orderInfo.code}</p>
          </Modal>
        ) : null}

        <div
          id="captcha"
          className="query-captcha"
          style={this.state.captchaVisible ? {} : { display: "none" }}
        ></div>
        <p className="query-alert">仅能查询最近一次购买记录</p>
        <Tabs
          defaultActiveKey="1"
          className="query-box-container"
          onChange={(activeKey) => {
            this.handleChange(activeKey);
          }}
        >
          <TabPane tab="本机查询" key="1" className="query-by-local">
            <Button
              type="primary"
              onClick={this.showModal}
              size="medium"
              loading={this.state.loading}
            >
              获取订单信息
            </Button>

            <div>本方法仅对下单的浏览器有效</div>
          </TabPane>
          <TabPane tab="订单号查询" key="2">
            <Form onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
              <Form.Item
                // label="查询邮箱"
                name="orderId"
                rules={[
                  {
                    required: true,
                    message: "请输入订单号",
                  },
                ]}
              >
                <Input
                  placeholder="请输入订单号"
                  className="query-input-box"
                  style={{ borderRadius: "5px" }}
                />
              </Form.Item>
              {this.state.activeTab === 2 ? (
                <Captcha handleQuery={this.handleQuery} />
              ) : null}

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={this.state.allowQuery === "forbid"}
                  size="medium"
                  style={{ marginTop: "10px" }}
                  loading={this.state.loading}
                >
                  获取订单信息
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="邮箱查询" key="3">
            <Form onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
              <Form.Item
                // label="查询邮箱"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "请输入查询邮箱",
                  },
                ]}
              >
                <Input
                  placeholder="请输入查询邮箱"
                  className="query-input-mail"
                  style={{ borderRadius: "5px" }}
                />
              </Form.Item>
              <Form.Item
                name="password"
                // label="查询密码"
                rules={[
                  {
                    required: true,
                    message: "请输入查询密码",
                  },
                ]}
              >
                <Input
                  placeholder="请输入查询密码"
                  className="query-input-mail"
                  style={{ borderRadius: "5px" }}
                />
              </Form.Item>
              {this.state.activeTab === 3 ? (
                <Captcha handleQuery={this.handleQuery} />
              ) : null}
              <Form.Item>
                <Button
                  className=""
                  type="primary"
                  htmlType="submit"
                  size="medium"
                  disabled={this.state.allowQuery === "forbid"}
                  style={{ marginTop: "10px" }}
                  loading={this.state.loading}
                >
                  获取订单信息
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Query;
