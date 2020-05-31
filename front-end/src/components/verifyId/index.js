import React, { Component } from "react";
import { Button, Modal, message, Form, Input } from "antd";
import { connect } from "react-redux";
import $axios from "@/axios/$axios";
import {
  handleForm,
  handleVerify,
  handleVerifyDialog,
} from "../../redux/actions/form";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
const tailLayout = {
  wrapperCol: { offset: 10, span: 16 },
};
class VerifyId extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }
  componentDidMount() {
    this.props.handleForm(null);
  }
  handleVerify = (index) => {
    this.setState({ visible: true });
    this.setState({ deleteIndex: index });
  };
  handleCancel = () => {
    this.props.handleVerifyDialog(false);
  };
  onFinish = (values) => {
    // console.log(values);
    this.setState({ loading: true });

    $axios
      .post("/user/verify", values)
      .then(() => {
        this.props.handleVerify(true);
        this.props.handleVerifyDialog(false);
        this.setState({ visible: false });
        message.success("验证成功，请继续之前的操作");
        this.setState({ loading: false });
      })
      .catch(() => {
        message.error("验证失败");
        this.setState({ loading: false });
      });
  };

  render() {
    const { loading } = this.state;
    return (
      <Modal
        visible={this.props.isShowDialog}
        title="我们需要验证你的身份"
        // onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={this.handleCancel}>
            取消
          </Button>,
        ]}
      >
        <Form
          {...layout}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Form.Item
            label="问题一"
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
            label="问题二"
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
          <Form.Item {...tailLayout}>
            <Button
              type="primary"
              htmlType="submit"
              loading={this.state.loading}
            >
              验证回答
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isShowDialog: state.form.isShowDialog,
    isVerified: state.form.isVerified,
  };
};
const actionCreator = {
  handleForm,
  handleVerify,
  handleVerifyDialog,
};
export default connect(mapStateToProps, actionCreator)(VerifyId);
