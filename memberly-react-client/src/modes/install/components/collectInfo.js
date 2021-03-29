import React, { useState, useEffect } from "react";
import { Steps, Button, message, Row, Form, Input, Result } from "antd";
import { Link } from "react-router-dom";
import $axios from "../../../axios/$axios";
import { useTranslation } from "react-i18next";

const { Step } = Steps;
const formItemLayoutWithOutLabel1 = {
  wrapperCol: {
    xs: { span: 24, offset: 12 },
    sm: { span: 16, offset: 11 },
  },
};
const formItemLayoutWithOutLabel2 = {
  wrapperCol: {
    xs: { span: 24, offset: 12 },
    sm: { span: 16, offset: 5 },
  },
};
const formItemLayout1 = {
  labelCol: {
    sm: { span: 6, offset: 0 },
  },
  wrapperCol: {
    sm: { span: 16, offset: 0 },
  },
};
const formItemLayout2 = {
  labelCol: {
    sm: { span: 0, offset: 1 },
  },
  wrapperCol: {
    sm: { span: 20, offset: 2 },
  },
};
const CollectInfo = (props) => {
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState(null);
  const { t } = useTranslation();

  const onFinish = (values) => {
    if (values.password === values.passwordAgain) {
      setFormData({ ...formData, ...values });
    } else {
      message.warning(t("Enter two different passwords"));
    }
  };
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  useEffect(() => {
    if (!formData) return;
    if (current === 1) {
      $axios
        .post("/user/create", formData)
        .then(() => {
          next();
        })
        .catch(() => {
          message.error(t("Errors happen, please try again"));
        });
    } else {
      next();
    }
    // eslint-disable-next-line
  }, [formData]);
  const steps = [
    {
      title: t("Complete your information"),
      content: (
        <Form
          onFinish={onFinish}
          initialValues={formData ? formData : null}
          style={{ marginTop: "40px" }}
          defaultValue={formData}
          {...formItemLayout1}
        >
          <Form.Item
            label={t("Email")}
            name="email"
            rules={[
              {
                type: "email",
                message: t("Please use the right email format"),
              },
              {
                required: true,
                message: t("Please enter email"),
              },
            ]}
          >
            <Input placeholder={t("Email")} />
          </Form.Item>
          <Form.Item
            label={t("Password")}
            name="password"
            rules={[
              {
                min: 8,
                message: t("Length of password should be longer then 8"),
              },
              {
                required: true,
                message: t("Please enter password"),
              },
            ]}
          >
            <Input.Password placeholder={t("Password")} />
          </Form.Item>
          <Form.Item
            label={t("Enter again")}
            name="passwordAgain"
            rules={[
              {
                required: true,
                message: t("Please enter password again"),
              },
            ]}
          >
            <Input.Password placeholder={t("Enter again")} />
          </Form.Item>

          <Form.Item {...formItemLayoutWithOutLabel1}>
            <Button type="primary" htmlType="submit">
              {t("Next")}
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: t("Config security questions"),
      content: (
        <Form
          onFinish={onFinish}
          initialValues={formData ? formData : null}
          style={{ marginTop: "40px" }}
          {...formItemLayout2}
        >
          <Form.Item
            label={t("Name of your best friends")}
            name="answer1"
            rules={[
              {
                required: true,
                message: t("Please enter your best friend's name"),
              },
            ]}
          >
            <Input placeholder={t("Name of your best friends")} />
          </Form.Item>
          <Form.Item
            label={t("Name of your favorite movie")}
            name="answer2"
            rules={[
              {
                required: true,
                message: t("Please enter your favorite movie's name"),
              },
            ]}
          >
            <Input placeholder={t("Name of your favorite movie")} />
          </Form.Item>
          <Form.Item
            label={t("Brand of your first phone")}
            name="answer3"
            rules={[
              {
                required: true,
                message: t("Please enter your first phone's brand"),
              },
            ]}
          >
            <Input placeholder={t("Brand of your first phone")} />
          </Form.Item>

          <Form.Item {...formItemLayoutWithOutLabel2}>
            <Button type="primary" htmlType="submit" className="collect-finish">
              {t("Register finished")}
            </Button>
          </Form.Item>
          <Button
            onClick={() => {
              prev();
            }}
            className="collect-prev"
          >
            {t("Last")}
          </Button>
        </Form>
      ),
    },
    {
      title: t("Register successfully"),
      content: (
        <Result
          status="success"
          title={t("Register successfully")}
          subTitle={t("Go to login your account")}
          extra={
            <div>
              <Link to="/">
                <Button type="primary" size="large">
                  {t("Login")}
                </Button>
              </Link>
            </div>
          }
          className="result"
          style={{ marginTop: "20px" }}
        ></Result>
      ),
    },
  ];
  return (
    <div>
      <img src="/assets/theme/tech.svg" alt="" className="welcome-bg" />
      <Row justify="center" className="collect-steps-container">
        <Steps current={current} className="collect-steps">
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        {/* eslint-disable-next-line */}
        <div className="steps-content" className="collect-steps-box">
          {steps[current].content}
        </div>
      </Row>
    </div>
  );
};

export default CollectInfo;
