import React, { useState } from "react";
import { Modal, Button, Form, Input, message } from "antd";
import $axios from "../../axios/$axios";
import { isMobile } from "react-device-detect";

const DiscountVerify = (props) => {
  const [loading, setLoading] = useState(false);
  const onFinish = (values) => {
    setLoading(true);
    $axios
      .post("/discount/query", {
        code: values.code,
        ...props.order,
      })
      .then((res) => {
        props.setDiscount({ price: res.data, code: values.code });
        setLoading(false);
        message.success("验证成功");
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
      title="验证折扣码"
      style={{ top: 5 }}
      visible={props.isModalVisible}
      onOk={() => props.setModalVisible(false)}
      onCancel={() => props.setModalVisible(false)}
      footer={[
        <Button onClick={() => props.setModalVisible(false)}>取消</Button>,
      ]}
    >
      <Form
        onFinish={onFinish}
        layout={isMobile ? "horizontal" : "inline"}
        style={isMobile ? {} : { marginLeft: "60px" }}
      >
        <Form.Item
          label="折扣码"
          name="code"
          rules={[
            {
              required: true,
              message: "请输入折扣码",
            },
          ]}
        >
          <Input
            placeholder="请输入折扣码"
            style={isMobile ? {} : { borderRadius: "5px", width: "200px" }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            验证
          </Button>
        </Form.Item>
        ,
      </Form>
    </Modal>
  );
};
export default DiscountVerify;
