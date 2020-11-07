//添加支付信息
import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, message, Select } from "antd";
import { AlipayCircleOutlined, createFromIconfontCN } from "@ant-design/icons";
import "./index.css";
import { connect } from "react-redux";
import { handleFetchForm, handleVerifyDialog } from "@/redux/actions/form";
import $axios from "@/axios/$axios";
import VerifyId from "../verifyId";
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1701775_nrcqx2lm5ri.js",
});
export const PaymentMethod = (props) => {
  const [loading, setLoading] = useState(false);
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 16, offset: 8 },
    },
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 5, offset: 0 },
      sm: { span: 5, offset: 3 },
    },
    wrapperCol: {
      xs: { span: 8, offset: 0 },
      sm: { span: 12, offset: 0 },
    },
  };
  const formRef = React.createRef();
  const handleVerify = () => {
    if (props.isVerified) {
      formRef.current.setFieldsValue(props.formData);
    } else {
      props.handleVerifyDialog(true);
    }
  };
  useEffect(() => {
    formRef.current.setFieldsValue(null);
  }, []);
  const onFinish = (values) => {
    setLoading(true);
    if (!props.isVerified) {
      props.handleVerifyDialog(true);
      setLoading(false);
      return;
    }
    $axios
      .post(`/${props.mode}/${props.formData._id}`, {
        ...values,
      })
      .then(() => {
        message.success("保存成功");
        setLoading(false);
        props.handleFetchForm();
      })
      .catch((error) => {
        setLoading(false);
        message.error(error.response.data.message);
      });
  };
  return (
    <div className="alipay-container" style={{ position: "relative" }}>
      <VerifyId />
      <Row justify="center" style={{ marginTop: "20px" }}>
        {props.mode === "alipay" ? (
          <AlipayCircleOutlined className="alipay-icon" />
        ) : (
          <IconFont type="icon-social-paypal" className="paypal-icon" />
        )}

        <p className="alipay-title">{props.title}</p>
      </Row>
      <Form
        {...formItemLayout}
        onFinish={onFinish}
        ref={formRef}
        name="control-ref"
        // initialValues={
        //   props.isVerified && props.formData ? props.formData : null
        // }
        style={{ marginTop: "40px" }}
      >
        {props.mode === "alipay" ? (
          <div>
            <Form.Item
              label="应用ID"
              name="appId"
              rules={[
                {
                  required: true,
                  message: "请输入您申请的应用ID",
                },
              ]}
            >
              <Input placeholder="请输入您申请的应用ID" />
            </Form.Item>
            <Form.Item
              name="publicKey"
              label="支付宝公匙"
              rules={[
                {
                  required: true,
                  message: "请输入支付宝公匙",
                },
              ]}
            >
              <Input.TextArea
                placeholder="请输入支付宝公匙（注意不是应用公匙）"
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
            </Form.Item>
            <Form.Item
              name="secretKey"
              label="应用私匙"
              rules={[
                {
                  required: true,
                  message: "请输入应用私匙",
                },
              ]}
            >
              <Input.TextArea
                placeholder="请输入RSA2(SHA256)私匙"
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
            </Form.Item>
            <Form.Item
              label="服务器域名"
              name="notifyUrl"
              rules={[
                {
                  required: true,
                  message: "请输入您的服务器域名",
                },
              ]}
            >
              <Input placeholder="请输入您的服务器域名，请带上http或https" />
            </Form.Item>
          </div>
        ) : (
          <div>
            <Form.Item
              label="ClientID"
              name="clientId"
              rules={[
                {
                  required: true,
                  message: "请输入您申请的ClientID",
                },
              ]}
            >
              <Input.TextArea
                placeholder="请输入您申请的ClientID"
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
            </Form.Item>
            <Form.Item
              label="Secret"
              name="secret"
              rules={[
                {
                  required: true,
                  message: "请输入您申请的Secret",
                },
              ]}
            >
              <Input.TextArea
                placeholder="请输入您申请的Secret"
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
            </Form.Item>
          </div>
        )}

        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button onClick={handleVerify} style={{ marginRight: "10px" }}>
            显示表单数据
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isVerified: state.form.isVerified,
  };
};
const actionCreator = {
  handleFetchForm,
  handleVerifyDialog,
};
export default connect(mapStateToProps, actionCreator)(PaymentMethod);
