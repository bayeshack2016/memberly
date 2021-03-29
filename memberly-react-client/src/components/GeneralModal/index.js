import React, { useState } from "react";
import { Modal, Button, Form, Input, message } from "antd";
import $axios from "../../axios/$axios";
import { isMobile } from "react-device-detect";

const GeneralModal = (props) => {
  const [loading, setLoading] = useState(false);
  const onFinish = (values) => {
    setLoading(true);
    $axios
      .post(props.target, { ...props.user, ...values })
      .then((res) => {
        setLoading(false);
        message.success("设置成功");
        props.setModalVisible(false);
      })
      .catch((error) => {
        message.warning(error.response.data.message);
        setLoading(false);
        console.log(error, "error");
      });
  };
  return (
    <Modal
      title={props.title}
      visible={props.isModalVisible}
      onOk={() => props.setModalVisible(false)}
      onCancel={() => props.setModalVisible(false)}
      footer={[
        <Button onClick={() => props.setModalVisible(false)}>取消</Button>,
      ]}
    >
      <Form onFinish={onFinish} layout={isMobile ? "horizontal" : "inline"}>
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
          <Input
            placeholder={props.placeholder}
            style={isMobile ? {} : { borderRadius: "5px", width: "200px" }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            设置
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default GeneralModal;
