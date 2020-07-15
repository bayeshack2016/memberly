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
    const queryParams = JSON.parse(JSON.stringify(ctx.request.query));
    console.log(queryParams.orderId, "test");
    let order;
    if (queryParams.password) {
      order = await Order.findOne({
        email: ctx.request.query.email,
        password: md5Pwd(ctx.request.query.password),
      })
        .sort({ field: "asc", _id: -1 })
        .limit(1);
    } else {
      order = await Order.findOne({ orderId: queryParams.orderId })
        .sort({ field: "asc", _id: -1 })
        .limit(1);
    }
    console.log(order, "order");
    if (!order) {
      ctx.throw(404, "未找到您的订单信息");
      ctx.body = null;
    }
    ctx.body = order;
  }
  async fetchOrder(ctx) {
    const order = await Order.findOne({ orderId: ctx.params.id })
      .sort({ field: "asc", _id: -1 })
      .limit(1);
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
