import React, { useEffect, useState } from "react";
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
const VerifyId = (props) => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    props.handleForm(null);
  }, []);

  const handleCancel = () => {
    props.handleVerifyDialog(false);
  };
  const onFinish = (values) => {
    setLoading(true);

    $axios
      .post("/user/verify", values)
      .then(() => {
        props.handleVerify(true);
        props.handleVerifyDialog(false);
        message.success("验证成功，请继续之前的操作");
        setLoading(false);
      })
      .catch((error) => {
        message.error(error.response.data.message);
        setLoading(false);
      });
  };
  return (
    <Modal
      visible={props.isShowDialog}
      title="我们需要验证你的身份"
      // onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="submit" type="primary" onClick={handleCancel}>
          取消
        </Button>,
      ]}
    >
      <Form {...layout} onFinish={onFinish}>
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
          <Button type="primary" htmlType="submit" loading={loading}>
            验证回答
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

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
