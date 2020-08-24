import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Row, Radio } from "antd";
import "./index.css";
import { connect } from "react-redux";
import $axios from "@/axios/$axios";
import { handleFetchForm, handleVerifyDialog } from "@/redux/actions/form";
import { handleFetchSetting } from "@/redux/actions/product";
import VerifyId from "../verifyId";
import { createFromIconfontCN } from "@ant-design/icons";
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1701775_5ffvr7n7qh8.js",
});
const Mail = (props) => {
  const [loading, setLoading] = useState(false);
  const email = props.email;
  console.log(props, email, "props,");
  let formRef = React.createRef();
  const onFinish = (values) => {
    setLoading(true);
    if (!props.isVerified) {
      props.handleVerifyDialog(true);
      setLoading(false);
      return;
    }
    if (values.defaultMail === 1) {
      $axios
        .post(`/setting/${props.setting._id}`, {
          ...props.setting,
          defaultMail: props.mailName,
        })
        .then(() => {
          props.handleFetchSetting();
        })
        .catch(() => {
          message.error("修改默认邮箱失败");
        });
    }
    console.log(values, "values");
    $axios
      .post(`/email/${email._id}`, { ...values, mailName: props.mailName })
      .then(() => {
        message.success("保存成功");

        props.handleFetchForm();
        setLoading(false);
      })
      .catch(() => {
        message.error("保存邮箱失败");
        setLoading(false);
      });
  };
  const handleVerify = () => {
    if (props.isVerified) {
      formRef.current.setFieldsValue(email);
    } else {
      props.handleVerifyDialog(true);
    }
  };
  useEffect(() => {
    if (props.isVerified) {
      formRef.current.setFieldsValue(email);
    }
  }, [props.mailName]);
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
      <Row justify="center" style={{ marginTop: "20px" }}>
        <IconFont type={props.iconName} className="paypal-icon" />
        <p className="paypal-title">{`添加 ${props.mailTitle}邮箱`}</p>
      </Row>
      <VerifyId />
      <div
        style={{
          backgroundColor: "white",
        }}
        className="mail-page-setting"
      >
        <div className="mail-page-message">
          <p className="mail-message-title">注意事项： </p>
          <p>
            {`目前发送邮件功能仅支持使用${props.mailTitle}邮箱发送，`}
            <br />
            <br />
            {`${props.mailTitle}邮箱授权码获取方式可以参考如下链接`}
            <br />
            <br />
            <a href={props.mailLink} target="_blank" rel="noopener noreferrer">
              点我前往
            </a>
          </p>
        </div>
        <Form
          {...formItemLayout}
          ref={formRef}
          name="control-ref"
          onFinish={onFinish}
          initialValues={
            props.isVerified && email
              ? {
                  ...email,
                  defaultMail: 1,
                }
              : {
                  defaultMail: 1,
                }
          }
          style={{ marginTop: "40px" }}
        >
          <Form.Item
            label={`${props.mailTitle}邮箱地址`}
            name="mailAddress"
            rules={[
              {
                required: true,
                message: `请输入${props.mailTitle}邮箱地址`,
              },
            ]}
          >
            <Input placeholder={`请输入${props.mailTitle}邮箱地址`} />
          </Form.Item>
          <Form.Item
            label={`${props.mailTitle}邮箱授权码`}
            name="mailPassword"
            rules={[
              {
                required: true,
                message: `请输入${props.mailTitle}邮箱授权码`,
              },
            ]}
          >
            <Input placeholder={`请输入${props.mailTitle}邮箱授权码`} />
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
          <Form.Item
            label="设为默认"
            name="defaultMail"
            rules={[
              {
                required: true,
                message: "请选择是否设为默认邮箱",
              },
            ]}
          >
            <Radio.Group>
              <Radio value={1}>是</Radio>
              <Radio value={2}>否</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button onClick={handleVerify}>显示表单数据</Button>
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
    isVerified: state.form.isVerified,
    setting: state.product.setting,
  };
};
const actionCreator = {
  handleFetchForm,
  handleVerifyDialog,
  handleFetchSetting,
};
export default connect(mapStateToProps, actionCreator)(Mail);
