import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Row, Radio } from "antd";
import "./index.css";
import { connect } from "react-redux";
import $axios from "../../axios/$axios";
import { handleFetchForm } from "../../redux/actions/form";
import { handleFetchSetting } from "../../redux/actions/product";
import { createFromIconfontCN } from "@ant-design/icons";
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1701775_j1vsjy26z5r.js",
});
const Mail = (props) => {
  const [loading, setLoading] = useState(false);
  const email = props.email;
  let formRef = React.createRef();
  const onFinish = (values) => {
    setLoading(true);

    if (values.defaultMail === 1) {
      $axios
        .post(`/setting/update`, {
          ...props.setting,
          defaultMail: props.mailName,
        })
        .then(() => {
          props.handleFetchSetting(props.setting.uid);
        })
        .catch(() => {
          message.error("修改默认邮箱失败");
        });
    }
    $axios
      .post(`/email/update/${email._id}`, {
        ...values,
        mailName: props.mailName,
      })
      .then(() => {
        message.success("保存成功");

        props.handleFetchForm(props.setting.uid);
        setLoading(false);
      })
      .catch(() => {
        message.error("保存邮箱失败");
        setLoading(false);
      });
  };
  useEffect(() => {
    if (props.isVerified) {
      formRef.current.setFieldsValue(email);
    }
    // eslint-disable-next-line
  }, [props.mailName]);
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
      xs: { span: 6, offset: 0 },
      sm: { span: 12, offset: 0 },
    },
  };
  return (
    <div className="mail-page-container">
      <Row justify="center" style={{ marginTop: "20px" }}>
        <IconFont type={props.iconName} className="paypal-icon" />
        <p className="paypal-title">{`添加 ${props.mailTitle} 邮箱`}</p>
      </Row>
      <div
        style={{
          backgroundColor: "white",
        }}
        className="mail-page-setting"
      >
        <Form
          {...formItemLayout}
          ref={formRef}
          name="control-ref"
          onFinish={onFinish}
          initialValues={{
            ...email,
            defaultMail: 1,
          }}
          style={{ marginTop: "40px" }}
        >
          <Form.Item
            label={`${props.mailTitle} 邮箱地址`}
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
            label={`${props.mailTitle} 邮箱授权码`}
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
          {props.mailTitle === "smtp" && (
            <>
              <Form.Item
                label={`${props.mailTitle} 服务器地址`}
                name="host"
                rules={[
                  {
                    required: true,
                    message: `请输入${props.mailTitle} 服务器地址`,
                  },
                ]}
              >
                <Input placeholder={`请输入 ${props.mailTitle} 服务器地址`} />
              </Form.Item>
            </>
          )}
          {props.mailTitle === "gmail" && (
            <>
              <Form.Item
                label={`${props.mailTitle} client id`}
                name="clientId"
                rules={[
                  {
                    required: true,
                    message: `请输入${props.mailTitle} client id`,
                  },
                ]}
              >
                <Input placeholder={`请输入${props.mailTitle} client id`} />
              </Form.Item>
              <Form.Item
                label={`${props.mailTitle} client secret`}
                name="clientSecret"
                rules={[
                  {
                    required: true,
                    message: `请输入${props.mailTitle} client secret`,
                  },
                ]}
              >
                <Input placeholder={`请输入${props.mailTitle} client secret`} />
              </Form.Item>
              <Form.Item
                label={`${props.mailTitle} refresh token`}
                name="refreshToken"
                rules={[
                  {
                    required: true,
                    message: `请输入${props.mailTitle} refresh token`,
                  },
                ]}
              >
                <Input placeholder={`请输入${props.mailTitle} refresh token`} />
              </Form.Item>
            </>
          )}
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
    setting: state.product.setting,
  };
};
const actionCreator = {
  handleFetchForm,
  handleFetchSetting,
};
export default connect(mapStateToProps, actionCreator)(Mail);
