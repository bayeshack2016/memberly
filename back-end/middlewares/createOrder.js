const Order = require("../models/order");
const { md5Pwd } = require("../utils/cryptoUtil");

const createOrder = async (ctx, next) => {
  console.log(ctx.request.body, "ctx.request.body");
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
  let date = new Date();
  let code =
    Math.random().toString(36).substr(4).toUpperCase() +
    Math.random().toString(36).substr(4).toUpperCase();
  await new Order({
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString(),
    code: ctx.request.body.productType === 1 ? code : "非会员码商品",
    productType: ctx.request.body.productType,
    activation: ctx.request.body.productType === 1 ? "未激活" : "非会员码商品",
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    week: date.getDay(),
    price: ctx.request.body.price,
    email: ctx.request.body.email,
    password: md5Pwd(ctx.request.body.password),
    payment: ctx.request.body.payment,
    productId: ctx.request.body.productId,
    orderId: ctx.request.body.orderId,
    productName: ctx.request.body.productName,
    levelName: ctx.request.body.levelName,
    paymentStatus: "未知",
    noInvoice: "noInvoice",
  }).save();
  await next();
};

module.exports = {
  createOrder,
};
