const Paypal = require("../models/paypal");
const Alipay = require("../models/alipay");
const Customer = require("../models/customer");
const Order = require("../models/order");
const { sendOrderMail } = require("../utils/emailUtil");
const { sendOrderMessage } = require("../utils/telegramUtil");
const Product = require("../models/product");

const app = require("../app");
const io = app.getSocketIo();
const { handleLimit } = require("../service/handleLimit");
const { handleDiscount } = require("../service/handleDiscount");

class PaymentCtl {
  async handleBalancePay(ctx) {
    ctx.verifyParams({
      uid: { type: "string", required: true },
      email: { type: "string", required: true },
    });
    const customer = await Customer.findOne({
      email: ctx.request.body.email,
      uid: ctx.request.body.uid,
    });
    if (!customer) {
      ctx.throw(403, "该用户不存在");
    }
    if (ctx.request.body.price > customer.balance) {
      ctx.throw(403, "用户余额不足");
    }

    await Order.updateOne(
      { orderId: ctx.request.body.orderId, uid: ctx.request.body.uid },
      { paymentStatus: "已支付" }
    );
    const order = await Order.findOne({
      orderId: ctx.request.body.orderId,
      uid: ctx.request.body.uid,
    });
    customer.orders.push(order);
    await Customer.updateOne(
      { email: ctx.request.body.email, uid: ctx.request.body.uid },
      {
        balance: customer.balance - ctx.request.body.price,
        orders: customer.orders,
      }
    );
    io.emit("payment checked", "支付成功");
    const { code, email, productName, levelName, price, orderId, date } = order;
    sendOrderMail(
      code,
      email,
      productName,
      levelName,
      price,
      orderId,
      date,
      ctx.request.body.uid
    );
    sendOrderMessage(
      code,
      email,
      productName,
      levelName,
      price,
      orderId,
      date,
      ctx.request.body.uid
    );
    handleLimit(orderId, ctx.request.body.uid);
    handleDiscount(order.discount, order, ctx.request.body.uid);

    ctx.body = "success";
  }
  async handleBalanceRefund(ctx) {
    ctx.verifyParams({
      uid: { type: "string", required: true },
      orderId: { type: "string", required: true },
      email: { type: "string", required: true },
    });
    const order = await Order.findOne({
      orderId: ctx.request.body.orderId,
      uid: ctx.request.body.uid,
    });
    const customer = await Customer.findOne({
      email: order.email,
    });
    await Customer.updateOne(
      { email: ctx.request.body.email, uid: ctx.request.body.uid },
      {
        balance: customer.balance + order.price,
      }
    );
    await Order.updateOne(
      { orderId: ctx.request.body.orderId, uid: ctx.request.body.uid },
      {
        paymentStatus: "已退款",
      }
    );
    ctx.body = "success";
  }
  async handlePaymentCheck(ctx) {
    ctx.verifyParams({
      productId: { type: "string", required: true },
    });
    let product = await Product.findOne({
      _id: ctx.request.body.productId,
    });
    if (!product) {
      ctx.throw(404, "商品不存在");
    }

    let paypal = await Paypal.findOne({ uid: product.uid });
    let alipay = await Alipay.findOne({ uid: product.uid });

    ctx.body = {
      alipayId: alipay.appId,
      paypalId: paypal.clientId,
    };
  }
}
module.exports = new PaymentCtl();
