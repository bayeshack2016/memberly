import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Row } from "antd";
import "./index.css";
import { connect } from "react-redux";
import $axios from "@/axios/$axios";
import { handleFetchForm, handleVerifyDialog } from "@/redux/actions/form";
import VerifyId from "../../components/verifyId";
import { createFromIconfontCN } from "@ant-design/icons";
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1701775_6zx0gzvx0bl.js",
});
const NeteaseMail = (props) => {
  const [loading, setLoading] = useState(false);

  let formRef = React.createRef();
  const onFinish = (values) => {
    setLoading(true);
    if (!props.isVerified) {
      props.handleVerifyDialog(true);
      setLoading(false);
      return;
    }
    $axios
      .post(`/email/${props.email._id}`, values)
      .then(() => {
        message.success("保存成功");
        props.handleFetchForm();
        setLoading(false);
      })
      .catch(() => {
        message.error("验证失败");
        setLoading(false);
      });
  };
  const handleVerify = () => {
    if (props.isVerified) {
      formRef.current.setFieldsValue(props.email);
    } else {
      props.handleVerifyDialog(true);
    }
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 2 },
      sm: { span: 16, offset: 5 },
    },
  };
  const formItemLayout = {
    labelCol: {
      sm: { span: 5 },
    },
    wrapperCol: {
      sm: { span: 8, offset: 0 },
    },
  };
  return (
    <div className="mail-page-container">
      <VerifyId />
      <Row justify="center" style={{ marginTop: "20px" }}>
        <IconFont type="icon-wangyi" className="paypal-icon" />
        <p className="paypal-title">添加 Gmail邮箱</p>
      </Row>
      <div
        style={{
          backgroundColor: "white",
        }}
        className="mail-page-setting"
      >
        <div className="mail-page-message">
          <p className="mail-message-title">注意事项： </p>
          <p>
            目前发送邮件功能仅支持使用QQ邮箱发送，
            <br />
            <br />
            QQ邮箱授权码获取方式可以参考如下链接
            <br />
            <br />
            <a
              href="https://service.mail.qq.com/cgi-bin/help?subtype=1&&no=1001256&&id=28"
              target="_blank"
              rel="noopener noreferrer"
            >
              点我前往
            </a>
          </p>
        </div>
        <Form
          {...formItemLayout}
          ref={formRef}
          name="control-ref"
          onFinish={onFinish}
          initialValues={props.isVerified && props.email ? props.email : null}
          style={{ marginTop: "40px" }}
        >
          <Form.Item
            label="163邮箱地址"
            name="mailAddress"
            rules={[
              {
                required: true,
                message: "请输入163邮箱地址",
              },
            ]}
          >
            <Input placeholder="请输入163邮箱地址" />
          </Form.Item>
          <Form.Item
            label="163邮箱授权码"
            name="mailPassword"
            rules={[
              {
                required: true,
                message: "请输入163邮箱授权码",
              },
            ]}
          >
            <Input placeholder="请输入163邮箱授权码" />
          </Form.Item>
          <Form.Item
            label="发件人昵称"
            name="sendName"
            rules={[
              {
                required: true,
                message: "请输入发件人昵称",
              },
            ]}
          >
            <Input placeholder="请输入发件人昵称" />
          </Form.Item>

          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button
              onClick={handleVerify}
              // disabled={props.isVerified}
            >
              显示表单数据
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ marginLeft: "10px" }}
            >
              保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    email: state.form.email,
    isVerified: state.form.isVerified,
  };
};
const actionCreator = {
  handleFetchForm,
  handleVerifyDialog,
};
export default connect(mapStateToProps, actionCreator)(NeteaseMail);
