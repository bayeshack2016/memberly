const Order = require("../models/order");
const { md5Pwd } = require("../utils/cryptoUtil");
class OrderCtl {
  async verifyCode(ctx) {
    const order = await Order.findOne({ code: ctx.request.body.code });
    if (!order) {
      ctx.throw(404, "未找到您的订单信息");
    }
    await Order.updateOne(
      { code: ctx.request.body.code },
      { activation: "已激活" }
    );
    ctx.body = order;
  }
  async queryOrder(ctx) {
    if (ctx.request.query.password) {
      var order = await Order.findOne({
        email: ctx.request.query.email,
        password: md5Pwd(ctx.request.query.password),
      });
    } else {
      var order = await Order.findOne(ctx.request.query);
    }
    if (!order) {
      ctx.throw(404, "未找到您的订单信息");
      ctx.body = null;
    }
    ctx.body = order;
  }
  async fetchOrder(ctx) {
    const order = await Order.findOne({ orderId: ctx.params.id });
    if (!order) {
      ctx.throw(404, "未找到您的订单信息");
    }
    ctx.body = order;
  }
  async fetchAllOrder(ctx) {
    ctx.body = await Order.find(ctx.request.query);
  }
}
module.exports = new OrderCtl();
