import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Checkbox, message } from "antd";
import { connect } from "react-redux";
import "./index.css";
import $axios from "../../axios/$axios";
import { withRouter } from "react-router-dom";
import { handleFetchSetting } from "../../redux/actions/product";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
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
          localStorage.setItem("jwt", res.data.jwt);
          localStorage.setItem("uid", res.data._id);
          props.handleFetchSetting(res.data._id);
          props.history.push("/productList");
          message.success("登录成功");
          setLoading(false);
        })
        .catch((err) => {
          message.error("用户名或密码错误");
          setLoading(false);
        });
    }
  };

  const handleForget = (bool) => {
    setIsforget(bool);
  };
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

          <span className="login-logo-text">Memberly</span>
        </div>
      </Row>

      <Row span={12} justify="center" className="login-subtitle">
        一个基于 React 和 Koa2 开发的在线支付系统
      </Row>
      <Row justify="center" span={8}>
        <div className="login-form">
          <Form
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            {isForget ? (
              <div>
                <FormItem
                  name="email"
                  rules={[{ required: true, message: "请输入邮箱！" }]}
                  style={{ marginBottom: "10px" }}
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
                      message: "请输入您最好的朋友的姓名",
                    },
                  ]}
                  style={{ marginBottom: "10px" }}
                >
                  <Input
                    placeholder="请输入您最好的朋友的姓名"
                    className="login-input"
                  />
                </FormItem>
                <FormItem
                  name="answer2"
                  rules={[
                    {
                      required: true,
                      message: "请输入您最爱的电影的名字",
                    },
                  ]}
                  style={{ marginBottom: "10px" }}
                >
                  <Input
                    placeholder="请输入您最爱的电影的名字"
                    className="login-input"
                  />
                </FormItem>
                <Form.Item
                  name="answer3"
                  rules={[
                    {
                      required: true,
                      message: "请输入您拥有的第一部手机的品牌",
                    },
                  ]}
                >
                  <Input placeholder="请输入您拥有的第一部手机的品牌" />
                </Form.Item>
                <FormItem
                  name="password"
                  rules={[
                    { min: 8, message: "密码长度不能小于8位" },
                    {
                      required: true,
                      message: "请输入新密码",
                    },
                  ]}
                  style={{ marginBottom: "10px" }}
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
                  style={{ marginBottom: "10px" }}
                >
                  <Input.Password
                    placeholder="密码"
                    prefix={<LockOutlined />}
                    className="login-input"
                  />
                </FormItem>

                <Row justify="space-between">
                  <Col style={{ height: "35px" }}>
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
                style={{ margin: "10px", width: "calc(100% - 20px)" }}
              >
                {isForget ? "提交" : "登录"}
              </Button>
              {isForget ? (
                <Button
                  size="large"
                  block
                  style={{ margin: "10px", width: "calc(100% - 20px)" }}
                  onClick={() => {
                    handleForget(false);
                  }}
                >
                  返回
                </Button>
              ) : (
                <Button
                  size="large"
                  block
                  style={{ margin: "10px", width: "calc(100% - 20px)" }}
                  onClick={() => {
                    props.history.push("install");
                  }}
                >
                  注册
                </Button>
              )}
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
  handleFetchSetting,
};
export default connect(mapStateToProps, actionCreator)(withRouter(Login));
