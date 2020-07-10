import React, { useState, useEffect } from "react";
import { Tabs, Modal, Button, Form, Input, message } from "antd";
import "./index.css";
import { decrypt } from "../../utils/crypto";
import $axios from "@/axios/$axios";
import Captcha from "../captcha";
const { TabPane } = Tabs;
const Query = (props) => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [allowQuery, setAllowQuery] = useState("forbid");
  const [orderInfo, setOrderInfo] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(1);

  const handleCheck = async () => {
    setLoading(true);
    if (formData.orderId !== undefined) {
      $axios(`/order/query?orderId=${formData.orderId}`)
        .then((result) => {
          setOrderInfo(result.data);
          setLoading(false);
          showModal();
        })
        .catch((err) => {
          setLoading(false);
          message.warning("未找到订单，请确认查询条件是否正确");
        });
    } else {
      $axios(
        `/order/query?email=${formData.email}&&password=${formData.password}`
      )
        .then((result) => {
          setOrderInfo(result.data);
          showModal();
          setLoading(false);
        })
        .catch((err) => {
          message.warning("未找到订单，请确认查询条件是否正确");
          setLoading(false);
        });
    }
  };
  const showModal = () => {
    if (localStorage.getItem("orderInfo")) {
      setOrderInfo(JSON.parse(decrypt(localStorage.getItem("orderInfo"))));
    } else {
      message.warning("未查询到订单信息");
      return;
    }
    setDialogVisible(true);
    setAllowQuery("forbid");
  };

  const handleOk = (e) => {
    setDialogVisible(false);
    setOrderInfo(null);
  };

  const handleCancel = (e) => {
    setDialogVisible(false);
    setOrderInfo(null);
  };
  const handleChange = (key) => {
    setActiveTab(parseInt(key));
  };
  const handleQuery = () => {
    setAllowQuery("allow");
  };
  const onFinish = (values) => {
    setFormData(values);
  };
  useEffect(() => {
    formData && handleCheck();
  }, [formData]);
  return (
    <div className="query-container">
      {dialogVisible ? (
        <Modal
          title="订单信息"
          visible={dialogVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          style={{ userSelect: "text" }}
          footer={[
            <Button key="confirm" type="primary" onClick={handleOk}>
              确认
            </Button>,
          ]}
        >
          <p>订单号：{orderInfo.orderId}</p>
          <p>购买日期：{orderInfo.date}</p>
          <p>
            商品信息：{orderInfo.productName}
            {orderInfo.levelName}
          </p>
          <p>金额：{orderInfo.price}</p>
          <p>会员码：{orderInfo.code}</p>
        </Modal>
      ) : null}
      <p className="query-alert">仅能查询最近一次购买记录</p>
      <Tabs
        defaultActiveKey="1"
        className="query-box-container"
        onChange={(activeKey) => {
          handleChange(activeKey);
        }}
      >
        <TabPane tab="本机查询" key="1" className="query-by-local">
          <Button
            type="primary"
            onClick={showModal}
            size="medium"
            loading={loading}
          >
            获取订单信息
          </Button>

          <div>本方法仅对下单的浏览器有效</div>
        </TabPane>
        <TabPane tab="订单号查询" key="2">
          <Form onFinish={onFinish}>
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
            {activeTab === 2 ? <Captcha handleQuery={handleQuery} /> : null}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                disabled={allowQuery === "forbid"}
                size="medium"
                style={{ marginTop: "10px" }}
                loading={loading}
              >
                获取订单信息
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="邮箱查询" key="3">
          <Form onFinish={onFinish}>
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
            {activeTab === 3 ? <Captcha handleQuery={handleQuery} /> : null}
            <Form.Item>
              <Button
                className=""
                type="primary"
                htmlType="submit"
                size="medium"
                disabled={allowQuery === "forbid"}
                style={{ marginTop: "10px" }}
                loading={loading}
              >
                获取订单信息
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Query;
