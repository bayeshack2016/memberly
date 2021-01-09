const Order = require("../models/order");
const Disaccount = require("../models/disaccount");
const User = require("../models/user");
const utils = require("utility");

const createOrder = async (ctx, next) => {
  ctx.verifyParams({
    price: { type: "number", required: true },
    email: { type: "string", required: true },
    password: { type: "string", required: true },
    payment: { type: "string", required: true },
    productId: { type: "number", required: true },
    orderId: { type: "string", required: true },
    productName: { type: "string", required: true },
    levelName: { type: "string", required: true },
    productType: { type: "number", enum: [1, 2], required: true },
  });
  const user = await User.findOne();
  let date = new Date();
  let code =
    Math.random().toString(36).substr(4, 8).toUpperCase() +
    Math.random().toString(36).substr(4, 6).toUpperCase();
  if (ctx.request.body.disaccount !== "未使用") {
    const disaccount = await Disaccount.findOne({
      code: ctx.request.body.disaccount,
    });
    await Disaccount.updateOne(
      { code: ctx.request.body.disaccount },
      {
        activation: [
          ...disaccount.activation,
          { timestamp: new Date().getTime() },
        ],
      }
    );
  }
  await new Order({
    date: date.format("yyyy-MM-dd"),
    time: date.format("yyyy-MM-dd"),
    code: ctx.request.body.productType === 1 ? code : "非兑换码商品",
    productType: ctx.request.body.productType,
    activation:
      ctx.request.body.productType === 1
        ? []
        : [{ timestamp: new Date().getTime() }],
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    week: date.getDay(),
    price: ctx.request.body.price,
    email: ctx.request.body.email,
    password: utils.md5(utils.md5(ctx.request.body.password + user.secret)),
    payment: ctx.request.body.payment,
    productId: ctx.request.body.productId,
    orderId: ctx.request.body.orderId,
    productName: ctx.request.body.productName,
    levelName: ctx.request.body.levelName,
    paymentStatus: "未支付",
    noInvoice: "noInvoice",
    disaccount: ctx.request.body.disaccount,
  }).save();
  await next();
};

module.exports = {
  createOrder,
};
