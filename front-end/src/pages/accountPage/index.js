import React, { useState } from "react";
import { Menu, Form, Input, Button, Descriptions, message, Modal } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import $axios from "@/axios/$axios";
const { Item } = Menu;
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 12 },
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
  changeInfo: "更改账户",
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

    await $axios
      .get("/setting")
      .then((result) => {
        if (result.data.version > props.setting.version) {
          info();
        } else {
          message.success("暂无版本更新");
          setLoading(false);
        }
      })
      .catch(() => {
        message.error("检查更新失败");
        setLoading(false);
      });
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
      <Descriptions title="账户信息">
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
  const renderChangeInfo = () => {
    return (
      <Form
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={props.formData ? props.formData : null}
        style={{ marginTop: "40px" }}
      >
        <Form.Item
          label="邮箱"
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
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: "请输入密码",
            },
          ]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>

        <Form.Item
          label="您就读小学的所在城市"
          name="answer1"
          rules={[
            {
              required: true,
              message: "请输入您就读小学的所在城市",
            },
          ]}
        >
          <Input placeholder="请输入您就读小学的所在城市" />
        </Form.Item>
        <Form.Item
          label="您最高学历就读学校的所在城市"
          name="answer2"
          rules={[
            {
              required: true,
              message: "请输入您最高学历就读学校的所在城市",
            },
          ]}
        >
          <Input placeholder="请输入您最高学历就读学校的所在城市" />
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

      case "changeInfo":
        return renderChangeInfo();
      default:
        break;
    }

    return null;
  };
  return (
    <div className="main" style={{ height: "100%" }}>
      <div className={"leftMenu"}>
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
      <div className={"right"}>{renderChildren()}</div>
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
