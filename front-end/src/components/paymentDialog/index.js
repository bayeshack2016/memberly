import React, { useState, useEffect } from "react";
import {
  AlipayCircleOutlined,
  createFromIconfontCN,
  CloseOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { encrypt } from "../../utils/crypto";
import { isMobile } from "react-device-detect";
import QRCode from "qrcode.react";
import $axios from "@/axios/$axios";
import {
  Result,
  Spin,
  Col,
  Row,
  Form,
  Input,
  Button,
  Radio,
  message,
} from "antd";
import "./index.css";
import socket from "../../utils/socketUtil";

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1701775_nrcqx2lm5ri.js",
});
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const PaymentDialog = (props) => {
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [formData, setFormData] = useState(null);
  const [orderInfo, setOrderInfo] = useState(null);
  const [paypalId, setPaypalId] = useState(null);
  const [failed, setFailed] = useState(false);
  const [currencyRate, setCurrencyRate] = useState(false);
  const { chooseLevel } = props;
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 12 },
    },
  };
  const formItemLayout = {
    labelCol: {
      sm: { span: 6 },
    },
    wrapperCol: {
      sm: { span: 16, offset: 1 },
    },
  };
  useEffect(() => {
    fetch("https://api.exchangeratesapi.io/latest?base=USD")
      .then((response) => response.json())
      .then((data) => {
        setCurrencyRate(data.rates.CNY);
      });
    $axios.get("/paypal").then((res) => {
      setPaypalId(res.data.clientId);
    });
  }, []);
  useEffect(() => {
    if (!paypalId) return;
    var scriptEle = document.createElement("script");
    scriptEle.src = `https://www.paypal.com/sdk/js?client-id=${paypalId}&currency=USD`;
    document.body.appendChild(scriptEle);
  }, [paypalId]);
  const onFinish = async (values) => {
    let orderId = Date.now().toString() + Math.floor(Math.random() * 9999) + 1;
    setFormData({ ...values, orderId });
    socket.on("payment checked", async (paymentStatus) => {
      let metadata = await $axios(`/order/fetch/${orderId}`);
      let orderInfo = metadata.data;
      if (paymentStatus === "已支付") {
        setOrderInfo(orderInfo);
        localStorage.setItem("orderInfo", encrypt(JSON.stringify(orderInfo)));
      }
      if (paymentStatus === "订单异常") {
        setOrderInfo(orderInfo);
        setFailed(true);
        localStorage.setItem("orderInfo", encrypt(JSON.stringify(orderInfo)));
      }
    });
  };
  const handleCreateOrder = () => {
    $axios
      .post(`/order/${formData.payment === "alipay" ? "alipay" : "paypal"}`, {
        ...formData,
        price: props.chooseLevel.levelPrice.price,
        productId: props.productInfo.productId,
        productName: props.productInfo.productName,
        productType: props.productInfo.productType,
        levelName: props.chooseLevel.levelName,
      })
      .then((res) => {
        setPaymentUrl(res.data);
      })
      .catch((error) => {
        message.error(error.response.data && error.response.data.message);
        setFormData(null);
      });
  };
  useEffect(() => {
    if (!formData) return;
    if (formData.payment === "alipay") {
      handleCreateOrder();
    } else {
      window.paypal
        .Buttons({
          // Set up the transaction
          createOrder: function (data, actions) {
            handleCreateOrder();
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: (
                      props.chooseLevel.levelPrice.price / currencyRate
                    ).toFixed(2),
                  },
                },
              ],
            });
          },

          onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
              // Show a success message to the buyer
              message.success("确认订单信息中，请稍候");
              $axios
                .post(`/paypal/callback`, {
                  orderId: formData.orderId,
                  captureId: details.purchase_units[0].payments.captures[0].id,
                })
                .then((res) => {})
                .catch((error) => {
                  message.error("交易失败");
                });
            });
          },
          style: {
            color: "blue",
            shape: "pill",
            label: "pay",
            height: 40,
          },
        })
        .render("#paypal-button-container");
    }
  }, [formData]);
  const closeDialog = () => {
    props.handleDialog(false, null);
  };
  return (
    <div className="product-payment-container">
      <CloseOutlined
        className="product-payment-close"
        onClick={() => {
          closeDialog();
        }}
      />
      <Row justify="center" className="product-payment-title">
        创建订单
      </Row>
      <Row justify="center" className="product-payment-message">
        {props.productInfo.productType === 1
          ? `支付完成后，您将获得一个${chooseLevel.levelName}会员的激活码，邮箱密码仅用于查询激活码，如果您有任何订单问题，请点击右上角的联系我们，与我们取得联系`
          : `请输入您的${props.productInfo.productName}邮箱和密码，支付完成后，您的账户就会自动获得${chooseLevel.levelName}会员，如果您有任何问题，请点击右上角的联系我们，与我们取得联系`}
      </Row>
      {orderInfo ? (
        failed ? (
          <Result
            status="error"
            title="购买失败"
            subTitle="支付成功，但更新订单状态失败，请尽快与技术人员取得联系，以下是您的订单信息"
            extra={[
              <div className="product-payment-results-detail" key={"orderInfo"}>
                <p>订单号：{orderInfo.orderId}</p>
                <p>购买日期：{orderInfo.date}</p>
                <p>
                  商品信息：{orderInfo.productName}
                  {orderInfo.levelName}
                </p>
                <p>金额：{orderInfo.price}元</p>
                <p>邮箱：{orderInfo.email}</p>
              </div>,
            ]}
            className="product-payment-results"
          />
        ) : (
          <Result
            status="success"
            title="购买成功"
            extra={[
              <div className="product-payment-results-detail" key={"orderInfo"}>
                <p>订单号：{orderInfo.orderId}</p>
                <p>购买日期：{orderInfo.date}</p>
                <p>
                  商品信息：{orderInfo.productName}
                  {orderInfo.levelName}
                </p>
                <p>金额：{orderInfo.price}元</p>
                <p>会员码：{orderInfo.code}</p>
              </div>,
            ]}
            className="product-payment-results"
          />
        )
      ) : (
        <Row justify="center">
          {isMobile && formData ? null : (
            <Col>
              <Row justify="center" style={{ marginTop: "20px" }}>
                <span className="product-payment-member">
                  购买{chooseLevel.levelName}会员
                </span>
                <span className="product-payment-price">
                  {chooseLevel.levelPrice.price}元
                </span>
              </Row>
              <Row>
                <Col>
                  <Form {...formItemLayout} onFinish={onFinish}>
                    <Form.Item
                      label="查询邮箱"
                      name="email"
                      rules={[
                        {
                          type: "email",
                          message: "请输入正确的邮箱格式",
                        },
                        {
                          required: true,
                          message: "请输入邮箱",
                        },
                      ]}
                    >
                      <Input
                        placeholder={
                          props.productInfo.productType === 1
                            ? `用于接收${props.productInfo.productName}会员码`
                            : `请输入您的${props.productInfo.productName}账号`
                        }
                      />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      label="查询密码"
                      rules={[
                        { min: 8, message: "密码长度不能小于8位" },
                        {
                          required: true,
                          message: "请输入密码",
                        },
                      ]}
                    >
                      <Input
                        placeholder={
                          props.productInfo.productType === 1
                            ? `用于查询${props.productInfo.productName}会员码`
                            : `请输入您的${props.productInfo.productName}密码`
                        }
                      />
                    </Form.Item>

                    <Form.Item
                      label="支付方式"
                      name="payment"
                      rules={[
                        {
                          required: true,
                          message: "请选择支付方式",
                        },
                      ]}
                    >
                      <Radio.Group defaultValue="alipay">
                        <Radio value="alipay">
                          <AlipayCircleOutlined className="product-ailpay-icon" />
                          <span className="alipay-text">支付宝</span>
                        </Radio>

                        <Radio
                          value="paypal"
                          disabled={paypalId ? false : true}
                        >
                          <IconFont
                            type="icon-paypal"
                            className="product-paypal-icon"
                          />
                          <span className="paypal-text">PayPal</span>
                        </Radio>
                      </Radio.Group>
                    </Form.Item>

                    <Form.Item>
                      <Button
                        className="product-payment-next-button"
                        type="primary"
                        htmlType="submit"
                      >
                        下一步
                      </Button>
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            </Col>
          )}
          {formData && (
            <Col>
              {formData.payment === "alipay" ? (
                <div className="product-payment-qrcode-container">
                  <div className="product-payment-qrcode">
                    {paymentUrl ? (
                      <a
                        href={paymentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <QRCode
                          value={paymentUrl} //value参数为生成二维码的链接
                          size={150} //二维码的宽高尺寸
                          fgColor="#000000" //二维码的颜色
                          className="product-payment-qrcode-image"
                        />
                      </a>
                    ) : (
                      <Spin
                        indicator={antIcon}
                        tip="  二维码生成中..."
                        className="product-payment-qrcode-spin"
                      />
                    )}
                  </div>

                  <div className="product-payment-qrcode-text">
                    {isMobile ? "点击二维码跳转支付" : "使用支付宝 扫一扫"}
                  </div>
                </div>
              ) : (
                <div className="product-payment-paypal">
                  <div id="paypal-button-container"></div>
                </div>
              )}
            </Col>
          )}
        </Row>
      )}
    </div>
  );
};

export default PaymentDialog;
