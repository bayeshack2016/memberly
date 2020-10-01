const WechatPay = require("../models/wechatPay");
const Paypal = require("../models/paypal");

class PaymentCtl {
  async updateWechat(ctx) {
    ctx.verifyParams({
      accountID: { type: "string", required: true },
      bussinessId: { type: "string", required: true },
      signMethod: { type: "string", enum: ["MD5", "SHA256"], required: true },
      secretKey: { type: "string", required: true },
    });
    const wechatPay = await WechatPay.findByIdAndUpdate(ctx.params.id, {
      accountID: ctx.request.body.accountID.trim(),
      bussinessId: ctx.request.body.bussinessId.trim(),
      signMethod: ctx.request.body.signMethod,
      secretKey: ctx.request.body.secretKey.trim(),
    });
    ctx.body = wechatPay;
  }

  async fetchWechatPay(ctx) {
    ctx.body = await WechatPay.findOne();
  }
}
module.exports = new PaymentCtl();
