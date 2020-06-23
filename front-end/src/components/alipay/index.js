//添加支付宝当面付的支付信息
import React, { useState } from "react";
import { Form, Input, Button, Row, message } from "antd";
import { AlipayCircleOutlined } from "@ant-design/icons";
import "./index.css";
import { connect } from "react-redux";
import { handleFetchForm, handleVerifyDialog } from "@/redux/actions/form";
import $axios from "@/axios/$axios";
import VerifyId from "../../components/verifyId";
export const Alipay = (props) => {
  const [loading, setLoading] = useState(false);
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 2 },
      sm: { span: 16, offset: 4 },
    },
  };
  const formItemLayout = {
    labelCol: {
      sm: { span: 3 },
    },
    wrapperCol: {
      sm: { span: 10, offset: 0 },
    },
  };
  const formRef = React.createRef();
  const handleVerify = () => {
    if (props.isVerified) {
      console.log(formRef);
      formRef.current.setFieldsValue(props.formData);
    } else {
      props.handleVerifyDialog(true);
    }
  };
  const onFinish = (values) => {
    setLoading(true);
    if (!props.isVerified) {
      props.handleVerifyDialog(true);
      setLoading(false);
      return;
    }
    $axios
      .post(`/alipay/${props.formData._id}`, {
        ...values,
        paymentName: "支付宝",
      })
      .then(() => {
        message.success("保存成功");
        setLoading(false);
        props.handleFetchForm();
      })
      .catch(() => {
        setLoading(false);
        message.error("验证失败");
      });
  };
  return (
    <div className="alipay-container" style={{ position: "relative" }}>
      <VerifyId />
      <Row justify="center" style={{ marginTop: "20px" }}>
        <AlipayCircleOutlined className="alipay-icon" />
        <p className="alipay-title">添加支付宝当面付</p>
      </Row>
      <div className="alipay-page-message">
        <p className="alipay-message-title">注意事项： </p>
        <p>
          支付宝当面付需要到支付宝开发者平台提交申请，
          <br />
          <br />
          审核通过了才能使用，具体介绍可以参考如下链接
          <br />
          <br />
          <a
            href="https://51.ruyo.net/12354.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            点我前往
          </a>
        </p>
      </div>
      <Form
        {...formItemLayout}
        onFinish={onFinish}
        ref={formRef}
        name="control-ref"
        initialValues={
          props.isVerified && props.formData ? props.formData : null
        }
        style={{ marginTop: "40px" }}
      >
        <Form.Item label="支付名称" name="paymentName">
          <Input placeholder="请输入支付名称" defaultValue="支付宝" />
        </Form.Item>
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
  return { isVerified: state.form.isVerified };
};
const actionCreator = {
  handleFetchForm,
  handleVerifyDialog,
};
export default connect(mapStateToProps, actionCreator)(Alipay);
