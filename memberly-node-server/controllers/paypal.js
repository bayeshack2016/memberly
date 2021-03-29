const Paypal = require("../models/paypal");
const Order = require("../models/order");
const checkoutNodeJssdk = require("@paypal/checkout-server-sdk");
const Product = require("../models/product");
const Customer = require("../models/customer");
const axios = require("axios");
const app = require("../app");
const io = app.getSocketIo();
const { sendOrderMail } = require("../utils/emailUtil");
const { sendOrderMessage } = require("../utils/telegramUtil");
const { handleLimit } = require("../service/handleLimit");
const { handleDiscount } = require("../service/handleDiscount");

const OrderNotify = async (order) => {
  const {
    code,
    email,
    productName,
    levelName,
    price,
    orderId,
    date,
    uid,
  } = order;
  sendOrderMail(code, email, productName, levelName, price, orderId, date, uid);
  sendOrderMessage(
    code,
    email,
    productName,
    levelName,
    price,
    orderId,
    date,
    uid
  );
  handleLimit(orderId, uid);
  handleDiscount(order.discount, order, uid);
};
class PaypalCtl {
  async updatePaypal(ctx) {
    ctx.verifyParams({
      clientId: { type: "string", required: true },
      secret: { type: "string", required: true },
      uid: { type: "string", required: true },
    });
    await Paypal.updateOne(
      { uid: ctx.request.body.uid },
      {
        clientId: ctx.request.body.clientId.trim(),
        secret: ctx.request.body.secret.trim(),
      },
      { new: true }
    );
    ctx.body = "success";
  }
  async handlePaypalRefund(ctx) {
    ctx.verifyParams({
      orderId: { type: "string", required: true },
    });
    const order = await Order.findOne({
      orderId: ctx.request.body.orderId,
    });
    let paypal = await Paypal.findOne({ uid: ctx.request.body.uid });
    let clientId = paypal.clientId;
    let clientSecret = paypal.secret;
    let environment;

    if (process.env.NODE_ENV === "production") {
      environment = new checkoutNodeJssdk.core.LiveEnvironment(
        clientId,
        clientSecret
      );
    } else {
      environment = new checkoutNodeJssdk.core.SandboxEnvironment(
        clientId,
        clientSecret
      );
    }

    let client = new checkoutNodeJssdk.core.PayPalHttpClient(environment);
    const captureId = order.noInvoice;
    const request = new checkoutNodeJssdk.payments.CapturesRefundRequest(
      captureId
    );

    let data = await axios.get(
      "https://api.exchangeratesapi.io/latest?base=USD"
    );
    if (!data.data.rates) {
      data.data.rates = 6.25;
    }
    request.requestBody({
      amount: {
        currency_code: "USD",
        value: (order.price / data.data.rates.CNY < 0.01
          ? 0.01
          : order.price / data.data.rates.CNY
        ).toFixed(2),
      },
    });
    let res = await client.execute(request);
    if (res.result.status !== "COMPLETED") {
      ctx.throw(404, "退款失败");
    } else {
      await Order.updateOne(
        { orderId: ctx.request.body.orderId, uid: ctx.request.body.uid },
        {
          paymentStatus: "已退款",
        }
      );
      ctx.body = "success";
    }
  }
  async fetchPaypal(ctx) {
    ctx.verifyParams({
      uid: { type: "string", required: true },
    });
    const paypal = await Paypal.findOne({ uid: ctx.request.body.uid });
    if (!paypal) {
      ctx.throw(404, "获取支付方式失败");
    }
    ctx.body = paypal;
  }

  async fetchPaypalLink(ctx) {
    ctx.body = "创建订单成功";
  }
  async handlePaypalCallback(ctx) {
    ctx.verifyParams({
      orderId: { type: "string", required: true },
      uid: { type: "string", required: true },
      captureId: { type: "string", required: true },
    });
    const orderInfo = await Order.findOne({
      orderId: ctx.request.body.orderId,
    });
    const { productId } = orderInfo;
    const { callbackUrl, productType } = await Product.findOne({
      _id: productId,
    });
    if (productType === 1) {
      await Order.updateOne(
        { orderId: ctx.request.body.orderId, uid: ctx.request.body.uid },
        { paymentStatus: "已支付", noInvoice: ctx.request.body.captureId }
      );

      io.emit("payment checked", "支付成功");

      const order = await Order.findOne({
        orderId: ctx.request.body.orderId,
      });
      await OrderNotify(order);
      ctx.body = "success";
    }
    if (productType === 2) {
      axios.post(callbackUrl, orderInfo).then(async (res) => {
        if (res.data.orderVerified) {
          await Order.updateOne(
            { orderId: ctx.request.body.orderId, uid: ctx.request.body.uid },
            { paymentStatus: "已支付", noInvoice: ctx.request.body.captureId }
          );
          io.emit("payment checked", "支付成功");

          const order = await Order.findOne({
            orderId: ctx.request.body.orderId,
          });
          await OrderNotify(order);

          ctx.body = "success";
        }

        if (res.data.orderVerified === false) {
          await Order.updateOne(
            { orderId: orderId, uid: ctx.request.body.uid },
            { paymentStatus: "订单异常" }
          );
          io.emit("payment checked", "订单异常");
        }
      });
    }
    if (productType === 3) {
      await Order.updateOne(
        { orderId: ctx.request.body.orderId, uid: ctx.request.body.uid },
        { paymentStatus: "已支付" }
      );
      io.emit("payment checked", "支付成功");
      const order = await Order.findOne({ orderId: ctx.request.body.orderId });
      let customer = await Customer.findOne({
        email: order.email,
        uid: ctx.request.body.uid,
      });
      customer.orders.push(order);
      await Customer.updateOne(
        { email: ctx.request.body.email, uid: ctx.request.body.uid },
        {
          balance: customer.balance - order.price,
          orders: customer.orders,
        }
      );
      await OrderNotify(order);

      ctx.body = "success";
    }
  }
}
module.exports = new PaypalCtl();
