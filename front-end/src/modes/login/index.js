import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Checkbox, message } from "antd";
import { connect } from "react-redux";
import { handleUserInfo } from "@/redux/actions/login";
import "./index.css";
import $axios from "@/axios/$axios";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import MobilePage from "@/pages/mobilePage";
import { isMobile } from "react-device-detect";
const FormItem = Form.Item;
const Login = (props) => {
  const [isForget, setIsforget] = useState(false);
  const [loading, setLoading] = useState(false);
  const onFinish = (values) => {
    setLoading(true);
    if (isForget) {
      $axios
        .post("/user/forget", values)
        .then(() => {
          message.success("修改成功，请使用新密码登录");
          setLoading(false);
        })
        .catch((error) => {
          message.error(error.response.data.message);
          setLoading(false);
        });
    } else {
      $axios
        .post("/user/login", values)
        .then((res) => {
          localStorage.setItem("jwt", res.data);
          props.history.push("/productList");
          message.success("登录成功");
          setLoading(false);
        })
        .catch((err) => {
          message.error("登录失败");
          setLoading(false);
        });
    }
  };

  const handleForget = (bool) => {
    setIsforget(bool);
  };
  if (isMobile) {
    return (
      <MobilePage productInfo={{ productName: "Coodo Pay" }} theme="default" />
    );
  }
  return (
    <div className="login-container">
      <img src="assets/login.svg" alt="" className="login-image" />
      <Row className="login-title" justify="center">
        <div style={{ width: "400px" }}>
          <img
            src="../assets/logo.svg"
            alt=""
            className="login-logo"
            style={{ width: "50px", marginTop: "70px", marginLeft: "70px" }}
          />

          <span className="login-logo-text">Coodo Pay</span>
        </div>
      </Row>

      <Row span={12} justify="center" className="login-subtitle">
        一个基于 React 和 Koa2 开发的在线支付系统
      </Row>
      <Row justify="center" span={8}>
        <div className="login-form">
          <Form
            className="login-form"
            initialValues={
              document.URL.indexOf("960960.xyz") > -1
                ? {
                    email: "admin@960960.xyz",
                    password: "12345678",
                    remember: true,
                  }
                : { remember: true }
            }
            onFinish={onFinish}
          >
            {isForget ? (
              <div>
                <FormItem
                  name="email"
                  rules={[{ required: true, message: "请输入邮箱！" }]}
                >
                  <Input
                    placeholder="邮箱"
                    className="login-input"
                    prefix={<UserOutlined />}
                  />
                </FormItem>
                <FormItem
                  name="answer1"
                  rules={[
                    {
                      required: true,
                      message: "请输入您就读小学的所在城市",
                    },
                  ]}
                  style={{ marginBottom: "20px" }}
                >
                  <Input
                    placeholder="请输入您就读小学的所在城市"
                    className="login-input"
                  />
                </FormItem>
                <FormItem
                  name="answer2"
                  rules={[
                    {
                      required: true,
                      message: "请输入您最高学历就读学校的所在城市！",
                    },
                  ]}
                >
                  <Input
                    placeholder="请输入您最高学历就读学校的所在城市！"
                    className="login-input"
                  />
                </FormItem>

                <FormItem
                  name="password"
                  rules={[
                    { min: 8, message: "密码长度不能小于8位" },
                    {
                      required: true,
                      message: "请输入新密码",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="请输入新密码"
                    className="login-input"
                    prefix={<LockOutlined />}
                  />
                </FormItem>
              </div>
            ) : (
              <div>
                <FormItem
                  name="email"
                  rules={[{ required: true, message: "请输入邮箱！" }]}
                >
                  <Input
                    placeholder="邮箱"
                    className="login-input"
                    prefix={<UserOutlined />}
                  />
                </FormItem>
                <FormItem
                  name="password"
                  rules={[
                    { min: 8, message: "密码长度不能小于8位" },
                    { required: true, message: "请输入密码！" },
                  ]}
                  style={{ marginBottom: "20px" }}
                >
                  <Input.Password
                    placeholder="密码"
                    prefix={<LockOutlined />}
                    className="login-input"
                  />
                </FormItem>
                <Row justify="space-between">
                  <Col style={{ height: "50px" }}>
                    <Form.Item name="remember" valuePropName="checked">
                      <Checkbox>记住密码</Checkbox>
                    </Form.Item>
                  </Col>
                  <Col
                    style={{
                      height: "30px",
                      lineHeight: "35px",
                      color: "#40a9ff",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      handleForget(true);
                    }}
                  >
                    忘记密码
                  </Col>
                </Row>
              </div>
            )}

            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                loading={loading}
              >
                {isForget ? "提交" : "登录"}
              </Button>
              {isForget ? (
                <Button
                  size="large"
                  style={{ marginTop: "20px" }}
                  onClick={() => {
                    handleForget(false);
                  }}
                >
                  返回
                </Button>
              ) : null}
            </FormItem>
          </Form>
        </div>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.form.user,
    setting: state.product.setting,
  };
};
const actionCreator = {
  handleUserInfo,
};
export default connect(mapStateToProps, actionCreator)(Login);
