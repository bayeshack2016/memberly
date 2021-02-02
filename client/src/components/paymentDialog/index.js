import React, { useState, useEffect } from "react";
import { CloseOutlined, LoadingOutlined } from "@ant-design/icons";
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
import DisaccountVerify from "../disaccountVerify";
import axios from "axios";
let _count = 300;
let timer;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const PaymentDialog = (props) => {
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [formData, setFormData] = useState(null);
  const [orderInfo, setOrderInfo] = useState(null);
  const [paypalId, setPaypalId] = useState(null);
  const [alipayId, setAlipayId] = useState(null);
  const [failed, setFailed] = useState(false);
  const [currencyRate, setCurrencyRate] = useState(false);
  const [count, setCount] = useState(_count);
  const [isModalVisible, setModalVisible] = useState(false);
  const [useDisaccount, setDisaccount] = useState(null);
  let chooseLevel = { ...props.chooseLevel };
  let orderPrice = useDisaccount
    ? useDisaccount.price
    : chooseLevel.levelPrice.price;
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

    $axios.get("/checkPayment").then((res) => {
      setAlipayId(res.data.alipayId);
      setPaypalId(res.data.paypalId);
    });
    return clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!paypalId || paypalId === " ") return;
    var scriptEle = document.createElement("script");
    scriptEle.src = `https://www.paypal.com/sdk/js?client-id=${paypalId}&currency=USD`;
    document.body.appendChild(scriptEle);
  }, [paypalId]);

  const onFinish = async (values) => {
    let orderId =
      Date.now().toString() + Math.floor(Math.random() * 9000 + 1000);
    setFormData({ ...values, orderId });
    socket.on("payment checked", async (paymentStatus) => {
      let metadata = await $axios(`/order/fetch/${orderId}`);
      let orderInfo = metadata.data;
      if (paymentStatus === "支付成功") {
        setOrderInfo(orderInfo);
        message.success("支付成功");
        localStorage.setItem("orderInfo", encrypt(JSON.stringify(orderInfo)));
      }
      if (paymentStatus === "订单异常") {
        message.error("支付异常");
        setOrderInfo(orderInfo);
        setFailed(true);
        localStorage.setItem("orderInfo", encrypt(JSON.stringify(orderInfo)));
      }
      if (paymentStatus === "订单超时") {
        message.error("支付异常");
        setOrderInfo(orderInfo);
        setFailed(true);
        localStorage.setItem("orderInfo", encrypt(JSON.stringify(orderInfo)));
      }
    });
  };
  const handleCreateOrder = () => {
    $axios
      .post(`/order/${formData.payment}`, {
        ...formData,
        price: orderPrice,
        productId: props.productInfo.productId,
        productName: props.productInfo.productName,
        productType: props.productInfo.productType,
        levelName: chooseLevel.levelName,
        disaccount: useDisaccount ? useDisaccount.code : "未使用",
      })
      .then((res) => {
        if (formData.payment !== "balance") {
          setPaymentUrl(res.data);
          timer = setInterval(() => {
            _count--;
            setCount(_count);
            if (_count === 0) {
              clearInterval(timer);
            }
          }, 1000);
        }
      })
      .catch((error) => {
        if (error.response) {
          message.error(error.response.data.message);
        }
        setFormData(null);
      });
  };

  useEffect(() => {
    if (!formData) return;
    if (formData.payment === "alipay" || formData.payment === "balance") {
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
                    value:
                      //金额低于0.01,paypal会报错
                      orderPrice < 0.1
                        ? "0.01"
                        : (orderPrice / currencyRate).toFixed(2),
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
    _count = 300;
    clearInterval(timer);
    props.handleDialog(false, null);
  };
  return (
    <div className="product-payment-container">
      <DisaccountVerify
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        useDisaccount={useDisaccount}
        setDisaccount={setDisaccount}
        order={{
          productName: props.productInfo.productName,
          levelName: chooseLevel.levelName,
          price: chooseLevel.levelPrice.price,
        }}
      />
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
          ? `支付完成后，您将获得一个${chooseLevel.levelName}会员的兑换码，邮箱密码仅用于查询兑换码，如果您有任何订单问题，请点击右上角的联系我们，与我们取得联系`
          : `请输入您的${props.productInfo.productName}邮箱和密码，支付完成后，您的账户就会自动获得${chooseLevel.levelName}会员，如果您有任何问题，请点击右上角的联系我们，与我们取得联系`}
      </Row>
      {orderInfo ? (
        failed ? (
          <Result
            status="error"
            title="购买失败"
            subTitle="订单出现异常，请尽快与技术人员取得联系，以下是您的订单信息"
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
                <p>兑换码：{orderInfo.code}</p>
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
                <span className="product-payment-price">{orderPrice}元</span>
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
                            ? `用于接收${props.productInfo.productName}兑换码`
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
                            ? `用于查询${props.productInfo.productName}兑换码`
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
                        <Radio
                          value="alipay"
                          disabled={alipayId && alipayId !== " " ? false : true}
                        >
                          <span className="paypal-text">支付宝</span>
                        </Radio>

                        <Radio
                          value="paypal"
                          disabled={paypalId && paypalId !== " " ? false : true}
                        >
                          <span className="paypal-text">PayPal</span>
                        </Radio>
                        <Radio
                          value="balance"
                          disabled={
                            props.productInfo.allowBalance === "yes"
                              ? false
                              : true
                          }
                        >
                          <span className="paypal-text">余额</span>
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
                      <p
                        className="disaccount-option"
                        onClick={() => {
                          setModalVisible(true);
                        }}
                      >
                        使用折扣码
                      </p>
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            </Col>
          )}
          {formData && props.productInfo.allowBalance !== "yes" && (
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
                  {paymentUrl && count > -1 && (
                    <p className="payment-countdown">
                      支付倒计时：{"0" + Math.floor(count / 60) + ":"}
                      {count % 60 > 9 ? count % 60 : "0" + (count % 60)}
                    </p>
                  )}
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
