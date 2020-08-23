const Alipay = require("../models/alipay");
const Order = require("../models/order");
const Product = require("../models/product");
const alipayf2f = require("alipay-ftof");
const axios = require("axios");
const { sendMail } = require("../utils/emailUtil");
const { handleLimit } = require("../service/handleLimit");
class AlipayCtl {
  async updateAlipay(ctx) {
    ctx.verifyParams({
      paymentName: { type: "string", required: true },
      appId: { type: "string", required: true },
      publicKey: { type: "string", required: true },
      secretKey: { type: "string", required: true },
      notifyUrl: { type: "string", required: true },
    });
    const alipay = await Alipay.findByIdAndUpdate(ctx.params.id, {
      paymentName: ctx.request.body.paymentName.trim(),
      appId: ctx.request.body.appId.trim(),
      publicKey: ctx.request.body.publicKey.trim(),
      secretKey: ctx.request.body.secretKey.trim(),
      notifyUrl: ctx.request.body.notifyUrl.trim(),
    });
    ctx.body = alipay;
  }
  async handleRefund(ctx) {
    const order = await Order.findOne({ orderId: ctx.request.body.orderId });
    var refund = {
      /* 退款编号 可选 用于分批退款 */
      refundNo: Date.now(),
      /* 退款金额 如果refundNo为空 refundAmount必须为订单全款 */
      refundAmount: order.price,
    };
    const alipay = await Alipay.findOne();
    const alipayConfig = {
      /* 以下信息可以在https://openhome.alipay.com/platform/appManage.htm查到, 不过merchantPrivateKey需要您自己生成 */

      /* 应用AppID */
      appid: alipay.appId,

      /* 通知URL 接受支付宝异步通知需要用到  */
      notifyUrl: alipay.notifyUrl + "/api/alipay/callback",

      /* 公钥 和 私钥 的填写方式 */
      testPrivateKey:
        "-----BEGIN RSA PRIVATE KEY-----\n" +
        "公钥或私钥内容..." +
        "\n-----END RSA PRIVATE KEY-----",

      /* 应用RSA私钥 请勿忘记 -----BEGIN RSA PRIVATE KEY----- 与 -----END RSA PRIVATE KEY-----  */
      merchantPrivateKey:
        "-----BEGIN RSA PRIVATE KEY-----\n" +
        alipay.secretKey +
        "\n-----END RSA PRIVATE KEY-----",
      /* 支付宝公钥 如果为注释掉会使用沙盒公钥 请勿忘记 -----BEGIN PUBLIC KEY----- 与 -----END PUBLIC KEY----- */
      alipayPublicKey:
        "-----BEGIN PUBLIC KEY-----\n" +
        alipay.publicKey +
        "\n-----END PUBLIC KEY-----",

      /* 支付宝支付网关 如果为注释掉会使用沙盒网关 */
      gatewayUrl: "https://openapi.alipay.com/gateway.do",
    };
    var alipay_f2f = new alipayf2f(alipayConfig);
    console.log(order.noInvoice, refund, "order.tradeNo");
    // ctx.body = "success";
    await alipay_f2f
      .refund(order.noInvoice, refund)
      .then(async (result) => {
        if (result.code === "10000") {
          console.log(result, "result");
          await Order.updateOne(
            { orderId: ctx.request.body.orderId },
            {
              paymentStatus: "已退款",
            }
          );
          ctx.body = "success";
        } else {
          ctx.throw(404, "退款失败");
        }
      })
      .catch((err) => {
        console.log(err, "err");
        ctx.throw(404, "退款失败");
      });
  }
  async fetchAlipay(ctx) {
    ctx.body = await Alipay.findOne();
  }

  async fetchAlipayQrcode(ctx) {
    const alipay = await Alipay.findOne();
    const alipayConfig = {
      /* 以下信息可以在https://openhome.alipay.com/platform/appManage.htm查到, 不过merchantPrivateKey需要您自己生成 */

      /* 应用AppID */
      appid: alipay.appId,

      /* 通知URL 接受支付宝异步通知需要用到  */
      notifyUrl: alipay.notifyUrl + "/api/alipay/callback",

      /* 公钥 和 私钥 的填写方式 */
      testPrivateKey:
        "-----BEGIN RSA PRIVATE KEY-----\n" +
        "公钥或私钥内容..." +
        "\n-----END RSA PRIVATE KEY-----",

      /* 应用RSA私钥 请勿忘记 -----BEGIN RSA PRIVATE KEY----- 与 -----END RSA PRIVATE KEY-----  */
      merchantPrivateKey:
        "-----BEGIN RSA PRIVATE KEY-----\n" +
        alipay.secretKey +
        "\n-----END RSA PRIVATE KEY-----",
      /* 支付宝公钥 如果为注释掉会使用沙盒公钥 请勿忘记 -----BEGIN PUBLIC KEY----- 与 -----END PUBLIC KEY----- */
      alipayPublicKey:
        "-----BEGIN PUBLIC KEY-----\n" +
        alipay.publicKey +
        "\n-----END PUBLIC KEY-----",

      /* 支付宝支付网关 如果为注释掉会使用沙盒网关 */
      gatewayUrl: "https://openapi.alipay.com/gateway.do",
    };
    var alipay_f2f = new alipayf2f(alipayConfig);
    const result = await alipay_f2f.createQRPay({
      tradeNo: `${ctx.request.body.orderId}`, // 必填 商户订单主键, 就是你要生成的
      subject: `${ctx.request.body.productName}${ctx.request.body.levelName}`, // 必填 商品概要
      totalAmount: ctx.request.body.price, // 必填 多少钱
      body: `购买${ctx.request.body.productName}${ctx.request.body.levelName}共${ctx.request.body.price}元`, // 可选 订单描述, 可以对交易或商品进行一个详细地描述，比如填写"购买商品2件共15.00元"
      timeExpress: 5, // 可选 支付超时, 默认为5分钟
    });
    if (!result) {
      ctx.throw(404, "拉取支付信息失败");
    }
    await Order.updateOne(
      { orderId: ctx.request.body.orderId },
      {
        noInvoice: result.out_trade_no,
      }
    );
    ctx.body = result.qr_code; // 支付宝返回的结果
  }
  async handleAlipayCallback(ctx) {
    const { paymentStatus } = await Order.findOne({
      noInvoice: ctx.request.body.out_trade_no,
    });
    if (paymentStatus === "已支付") {
    }
    const alipay = await Alipay.findOne();
    const alipayConfig = {
      /* 以下信息可以在https://openhome.alipay.com/platform/appManage.htm查到, 不过merchantPrivateKey需要您自己生成 */

      /* 应用AppID */
      appid: alipay.appId,

      /* 通知URL 接受支付宝异步通知需要用到  */
      notifyUrl: alipay.notifyUrl + "/api/alipay/callback",

      /* 公钥 和 私钥 的填写方式 */
      testPrivateKey:
        "-----BEGIN RSA PRIVATE KEY-----\n" +
        "公钥或私钥内容..." +
        "\n-----END RSA PRIVATE KEY-----",

      /* 应用RSA私钥 请勿忘记 -----BEGIN RSA PRIVATE KEY----- 与 -----END RSA PRIVATE KEY-----  */
      merchantPrivateKey:
        "-----BEGIN RSA PRIVATE KEY-----\n" +
        alipay.secretKey +
        "\n-----END RSA PRIVATE KEY-----",
      /* 支付宝公钥 如果为注释掉会使用沙盒公钥 请勿忘记 -----BEGIN PUBLIC KEY----- 与 -----END PUBLIC KEY----- */
      alipayPublicKey:
        "-----BEGIN PUBLIC KEY-----\n" +
        alipay.publicKey +
        "\n-----END PUBLIC KEY-----",

      /* 支付宝支付网关 如果为注释掉会使用沙盒网关 */
      gatewayUrl: "https://openapi.alipay.com/gateway.do",
    };
    var alipay_f2f = new alipayf2f(alipayConfig);

    var signStatus = alipay_f2f.verifyCallback(ctx.request.body);
    if (signStatus === false) {
      return ctx.throw(404, "回调签名验证未通过");
    }

    const orderInfo = await Order.findOne({
      noInvoice: ctx.request.body.out_trade_no,
    });
    const { productId } = orderInfo;
    const { callbackUrl, productType } = await Product.findOne({ productId });
    if (productType === 1) {
      await Order.updateOne(
        { noInvoice: ctx.request.body.out_trade_no },
        { paymentStatus: "已支付" }
      );
      const order = await Order.findOne({
        noInvoice: ctx.request.body.out_trade_no,
      });
      const {
        code,
        email,
        productName,
        levelName,
        price,
        orderId,
        date,
      } = order;
      console.log(order);
      sendMail(code, email, productName, levelName, price, orderId, date);
      handleLimit(ctx.request.body.out_trade_no);
      ctx.body = "success";
    }
    if (productType === 2) {
      axios.post(callbackUrl, orderInfo).then(async (res) => {
        if (res.data.orderVerified) {
          await Order.updateOne(
            { noInvoice: ctx.request.body.out_trade_no },
            { paymentStatus: "已支付" }
          );
          const order = await Order.findOne({
            noInvoice: ctx.request.body.out_trade_no,
          });
          const {
            code,
            email,
            productName,
            levelName,
            price,
            orderId,
            date,
          } = order;
          sendMail(code, email, productName, levelName, price, orderId, date);
          handleLimit(ctx.request.body.out_trade_no);
          ctx.body = "success";
        }

        if (res.data.orderVerified === false) {
          await Order.updateOne(
            { noInvoice: ctx.request.body.out_trade_no },
            { paymentStatus: "订单异常" }
          );
        }
      });
    }
  }
}
module.exports = new AlipayCtl();
