const Product = require("../models/product");
const Customer = require("../models/customer");
const axios = require("axios");
const utils = require("utility");
const verifyAccount = async (ctx, next) => {
  ctx.verifyParams({
    email: { type: "string", required: true },
    password: { type: "string", required: true },
    productId: { type: "string", required: true },
    orderId: { type: "string", required: true },
    uid: { type: "string", required: true },
    productType: { type: "number", enum: [1, 2, 3], required: true },
  });

  if (ctx.request.body.productType === 1) {
    await next();
  }
  if (ctx.request.body.productType === 3) {
    const customer = await Customer.findOne({
      email: ctx.request.body.email,
      password: utils.md5(
        utils.md5(ctx.request.body.password + process.env.SECRET)
      ),
      uid: ctx.request.body.uid,
    });
    if (!customer) {
      ctx.throw(403, "该用户不存在");
    }
    await next();
  }
  if (ctx.request.body.productType === 2) {
    const { callbackUrl } = await Product.findOne({
      _id: ctx.request.body.productId,
      uid: ctx.request.body.uid,
    });
    await axios
      .post(callbackUrl, {
        email: ctx.request.body.email,
        password: ctx.request.body.password,
      })
      .then(async (res) => {
        if (res.data.accountVerified) {
          await next();
        }
        if (res.data.accountVerified === false) {
          ctx.throw(404, "未找到账户信息");
        }
      });
  }
};

module.exports = {
  verifyAccount,
};
