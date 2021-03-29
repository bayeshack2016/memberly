import React, { useEffect, useState } from "react";
import { Button, Modal, message, Form, Input } from "antd";
import { connect } from "react-redux";
import $axios from "../../axios/$axios";
import {
  handleForm,
  handleVerify,
  handleVerifyDialog,
  handleFetchForm,
} from "../../redux/actions/form";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
const tailLayout = {
  wrapperCol: {
    xs: { span: 16, offset: 0 },
    sm: { span: 16, offset: 10 },
  },
};
const SecurtyModal = (props) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    props.handleForm(null);
    // eslint-disable-next-line
  }, []);

  const handleCancel = () => {
    props.handleVerifyDialog(false);
  };
  const onFinish = (values) => {
    setLoading(true);
    $axios
      .post(`/user/updateInfo`, {
        ...values,
        uid: props.user._id,
      })
      .then(() => {
        props.handleVerify(true);
        props.handleVerifyDialog(false);
        props.handleFetchForm(props.user._id);
        message.success("修改成功");
        setLoading(false);
      })
      .catch((error) => {
        message.error("修改失败");
        setLoading(false);
      });
  };
  return (
    <Modal
      visible={props.isShowDialog}
      title={props.title}
      onCancel={handleCancel}
      footer={[
        <Button key="submit" type="primary" onClick={handleCancel}>
          取消
        </Button>,
      ]}
    >
      <Form {...layout} onFinish={onFinish}>
        <Form.Item
          label={props.label}
          name={props.name}
          rules={[
            {
              required: true,
              message: props.placeholder,
            },
          ]}
        >
          <Input placeholder={props.placeholder} />
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
        <Form.Item
          label="安全问题3"
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
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" loading={loading}>
            更新
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
    user: state.form.user,
  };
};
const actionCreator = {
  handleForm,
  handleVerify,
  handleVerifyDialog,
  handleFetchForm,
};
export default connect(mapStateToProps, actionCreator)(SecurtyModal);
