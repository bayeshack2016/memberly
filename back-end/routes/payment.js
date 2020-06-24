const Router = require("koa-router");
const jwt = require("koa-jwt");
const { verifyAnswer } = require("../middlewares/verifyAnswer");
const router = new Router({ prefix: "/api" });
const {
  fetchAlipay,
  updateAlipay,
  handleAlipayCallback,
} = require("../controllers/alipay");
const {
  updateWechat,
  updatePaypal,
  fetchWechatPay,
  fetchPaypal,
} = require("../controllers/payment");
const { secret } = require("../config");
const auth = jwt({ secret });
/**
 * @swagger
 * /api/alipay/callback:
 *   post:
 *     tags:
 *       - 支付
 *     description: 支付宝支付成功的回调地址
 *     responses:
 *       200:
 *         description: 完成支付
 */
router.post("/alipay/callback", handleAlipayCallback);
/**
 * @swagger
 * /api/alipay:
 *   post:
 *     tags:
 *       - 支付
 *     description: 更新支付宝信息
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: paymentName
 *         description: 支付方式名称
 *         in: body
 *         required: true
 *         type: string
 *       - name: appId
 *         description: 支付宝应用id
 *         in: body
 *         required: true
 *         type: string
 *       - name: publicKey
 *         description: 应用公匙
 *         in: body
 *         required: true
 *         type: string
 *       - name: secretKey
 *         description: RSA私匙
 *         in: body
 *         required: true
 *         type: string
 *       - name: notifyUrl
 *         description: 支付宝回调地址
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: 成功更新支付宝信息
 */
router.post("/alipay/:id", auth, updateAlipay);
router.post("/wechatPay/:id", auth, verifyAnswer, updateWechat);
router.post("/paypal/:id", auth, verifyAnswer, updatePaypal);
/**
 * @swagger
 * /api/alipay:
 *   get:
 *     tags:
 *       - 支付
 *     description: 获取支付宝信息
 *     responses:
 *       200:
 *         description: 成功获取支付宝信息
 */
router.get("/alipay", auth, fetchAlipay);
router.get("/wechatPay", auth, fetchWechatPay);
router.get("/paypal", auth, fetchPaypal);

module.exports = router;
