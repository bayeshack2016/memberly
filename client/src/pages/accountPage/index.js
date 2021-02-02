import React, { useState } from "react";
import { Menu, Form, Input, Button, Descriptions, message, Modal } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PageHeader from "../../components/pageHeader";
import $axios from "@/axios/$axios";
import axios from "axios";
import { isMobile } from "react-device-detect";
import { version } from "../../../package.json";

const { Item } = Menu;
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 16, offset: 8 },
  },
};
const formItemLayout = {
  labelCol: {
    sm: { span: 8 },
  },
  wrapperCol: {
    sm: { span: 12, offset: 0 },
  },
};
const menuMap = {
  info: "账户信息",
  changeEmail: "更改邮箱",
  changePassword: "更改密码",
  // notification: "New Message Notification"
};
const AccountPage = (props) => {
  const [loading, setLoading] = useState(false);
  const [selectedKey, setSelectedKey] = useState("info");
  const info = () => {
    Modal.info({
      title: "检查到新版本",
      content: (
        <div>
          <p>快去 Github 更新吧！</p>
        </div>
      ),
      onOk: () => {
        setLoading(false);
      },
    });
  };

  const onFinish = (values) => {
    setLoading(true);
    $axios
      .post(`/user/update/${props.user._id}`, values)
      .then(() => {
        message.success("保存成功");
        setLoading(false);
      })
      .catch(() => {
        message.error("保存失败");
        setLoading(false);
      });
  };
  const checkUpdate = async () => {
    setLoading(true);

    const res = await axios.get(
      "https://api.github.com/repos/troyeguo/coodo-pay/releases/latest"
    );
    if (res.status === 200) {
      if (parseInt(res.data.name) > parseInt(version)) {
        info();
      } else {
        message.success("暂无版本更新");
        setLoading(false);
      }
    } else {
      message.error("检查更新失败");
      setLoading(false);
    }
  };
  const getMenu = () => {
    return Object.keys(menuMap).map((item) => (
      <Item key={item}>{menuMap[item]}</Item>
    ));
  };
  const selectKey = (key) => {
    setSelectedKey(key);
  };
  const renderAccountInfo = () => {
    return (
      <Descriptions title="账户信息" style={{ padding: 20 }}>
        <Descriptions.Item label="邮箱">{props.user.email}</Descriptions.Item>
        <Descriptions.Item label="注册日期">
          {props.user.date}
        </Descriptions.Item>
        <Descriptions.Item label="当前版本">
          {props.setting.version}
        </Descriptions.Item>
        <Descriptions.Item label="检查更新">
          <Button type="primary" onClick={checkUpdate} loading={loading}>
            检查更新
          </Button>
          <a
            href="https://github.com/troyeguo/coodo-pay"
            target="_blank"
            rel="noopener noreferrer"
          >
            &nbsp;&nbsp;&nbsp;更新地址
          </a>
        </Descriptions.Item>
      </Descriptions>
    );
  };
  const renderChangeEmail = () => {
    return (
      <Form
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={props.formData ? props.formData : null}
        style={{ marginTop: "40px" }}
      >
        <Form.Item
          label="新邮箱"
          name="email"
          rules={[
            {
              required: true,
              message: "请输入邮箱",
            },
          ]}
        >
          <Input placeholder="请输入邮箱" />
        </Form.Item>

        <Form.Item
          label="安全问题1"
          name="answer1"
          rules={[
            {
              required: true,
              message: "请输入您最好的朋友的姓名",
            },
          ]}
        >
          <Input placeholder="请输入您最好的朋友的姓名" />
        </Form.Item>
        <Form.Item
          label="安全问题2"
          name="answer2"
          rules={[
            {
              required: true,
              message: "请输入您最爱的电影的名字",
            },
          ]}
        >
          <Input placeholder="请输入您最爱的电影的名字" />
        </Form.Item>
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="primary" htmlType="submit" loading={loading}>
            保存
          </Button>
        </Form.Item>
      </Form>
    );
  };
  const renderChangePassword = () => {
    return (
      <Form
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={props.formData ? props.formData : null}
        style={{ marginTop: "40px" }}
      >
        <Form.Item
          label="新密码"
          name="password"
          rules={[
            { min: 8, message: "密码长度不能小于8位" },
            {
              required: true,
              message: "请输入密码",
            },
          ]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>

        <Form.Item
          label="安全问题1"
          name="answer1"
          rules={[
            {
              required: true,
              message: "请输入您最好的朋友的姓名",
            },
          ]}
        >
          <Input placeholder="请输入您最好的朋友的姓名" />
        </Form.Item>
        <Form.Item
          label="安全问题2"
          name="answer2"
          rules={[
            {
              required: true,
              message: "请输入您最爱的电影的名字",
            },
          ]}
        >
          <Input placeholder="请输入您最爱的电影的名字" />
        </Form.Item>
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="primary" htmlType="submit" loading={loading}>
            保存
          </Button>
        </Form.Item>
      </Form>
    );
  };

  const renderChildren = () => {
    switch (selectedKey) {
      case "info":
        return renderAccountInfo();

      case "changeEmail":
        return renderChangeEmail();
      case "changePassword":
        return renderChangePassword();
      default:
        break;
    }

    return null;
  };
  return (
    <div className="product-page-container" style={{ position: "relative" }}>
      <PageHeader title="账户信息" desc="修改账户的邮箱、密码，检查更新" />
      <div
        className="main"
        style={
          isMobile
            ? { margin: "5px", height: "100%", position: "relative" }
            : { margin: "20px", height: "100%", position: "relative" }
        }
      >
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
        <div
          className="right"
          style={isMobile ? { padding: 0 } : { marginLeft: "50px" }}
        >
          {renderChildren()}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.form.user,
    setting: state.product.setting,
  };
};
const actionCreator = {};
export default connect(mapStateToProps, actionCreator)(withRouter(AccountPage));
