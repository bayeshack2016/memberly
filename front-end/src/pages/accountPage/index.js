import React, { Component } from "react";
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
class accountPage extends Component {
  main = undefined;

  constructor(props) {
    super(props);
    const menuMap = {
      info: "账户信息",
      changeInfo: "更改账户",
      // notification: "New Message Notification"
    };
    this.state = {
      mode: "inline",
      menuMap,
      selectKey: "info",
      loading: false,
    };
  }
  info = () => {
    Modal.info({
      title: "检查到新版本",
      content: (
        <div>
          <p>快去 Github 更新吧！</p>
        </div>
      ),
      onOk: () => {
        this.setState({ loading: false });
      },
    });
  };

  onFinish = (values) => {
    this.setState({ loading: true });
    $axios
      .post(`/user/${this.props.user._id}`, values)
      .then(() => {
        message.success("保存成功");
        this.setState({ loading: false });
      })
      .catch(() => {
        message.error("保存失败");
        this.setState({ loading: false });
      });
  };
  checkUpdate = async () => {
    this.setState({ loading: true });
    await $axios
      .get("/setting")
      .then((result) => {
        if (result.data.version > this.props.setting.version) {
          this.info();
        } else {
          message.success("暂无版本更新");
          this.setState({ loading: false });
        }
      })
      .catch(() => {
        message.error("检查更新失败");
        this.setState({ loading: false });
      });
  };
  getMenu = () => {
    const { menuMap } = this.state;
    return Object.keys(menuMap).map((item) => (
      <Item key={item}>{menuMap[item]}</Item>
    ));
  };
  getRightTitle = () => {
    const { selectKey, menuMap } = this.state;
    return menuMap[selectKey];
  };
  selectKey = (key) => {
    this.setState({
      selectKey: key,
    });
  };
  renderAccountInfo = () => {
    // console.log(this.props.user);
    return (
      <Descriptions title="账户信息">
        <Descriptions.Item label="邮箱">
          {this.props.user.email}
        </Descriptions.Item>
        <Descriptions.Item label="注册日期">
          {this.props.user.date}
        </Descriptions.Item>
        <Descriptions.Item label="当前版本">
          {this.props.setting.version}
        </Descriptions.Item>
        <Descriptions.Item label="检查更新">
          <Button
            type="primary"
            onClick={this.checkUpdate}
            loading={this.state.loading}
          >
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
  renderChangeInfo = () => {
    return (
      <Form
        {...formItemLayout}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
        initialValues={this.props.formData ? this.props.formData : null}
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
          <Button type="primary" htmlType="submit" loading={this.state.loading}>
            保存
          </Button>
        </Form.Item>
      </Form>
    );
  };

  renderChildren = () => {
    const { selectKey } = this.state;

    switch (selectKey) {
      case "info":
        return this.renderAccountInfo();

      case "changeInfo":
        return this.renderChangeInfo();
      default:
        break;
    }

    return null;
  };

  render() {
    const { mode, selectKey } = this.state;
    return (
      <div className={"main"} style={{ height: "100%" }}>
        <div className={"leftMenu"}>
          <Menu
            mode={mode}
            selectedKeys={[selectKey]}
            onClick={({ key }) => this.selectKey(key)}
            className="payment-page"
            style={{
              marginTop: "10px",
            }}
          >
            {this.getMenu()}
          </Menu>
        </div>
        <div className={"right"}>{this.renderChildren()}</div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.form.user,
    setting: state.product.setting,
  };
};
const actionCreator = {};
export default connect(mapStateToProps, actionCreator)(withRouter(accountPage));
