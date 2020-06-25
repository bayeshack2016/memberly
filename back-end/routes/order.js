const Router = require("koa-router");
const jwt = require("koa-jwt");
const { salesSummary } = require("../middlewares/salesSummary");

const router = new Router({ prefix: "/api/order" });
const {
  fetchOrder,
  createOrder,
  fetchAllOrder,
  queryOrder,
  verifyCode,
} = require("../controllers/order");
const { fetchAlipayQrcode } = require("../controllers/alipay");
const { secret } = require("../config");
const auth = jwt({ secret });
const db = new Map();
const ratelimit = require("koa-ratelimit");
const ipBasedRatelimit = ratelimit({
  driver: "memory",
  db: db,
  duration: 60000,
  errorMessage: "请求次数太多，请稍后重试",
  id: (ctx) => ctx.ip,
  headers: {
    remaining: "Rate-Limit-Remaining",
    reset: "Rate-Limit-Reset",
    total: "Rate-Limit-Total",
  },
  max: 10,
  disableHeader: false,
});
/**
 * @swagger
 * /api/order/all:
 *   get:
 *     tags:
 *       - 订单
 *     description: 获取所有订单
 *     responses:
 *       200:
 *         description: 成功获取所有订单
 */
router.get("/all", auth, fetchAllOrder);
/**
 * @swagger
 * /api/order/query:
 *   get:
 *     tags:
 *       - 订单
 *     description: 查询订单
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: 购买商品时填写的邮箱
 *         in: query
 *         required: false
 *         type: string
 *       - name: password
 *         description: 购买商品时填写的密码
 *         in: query
 *         required: false
 *         type: string
 *       - name: orderId
 *         description: 订单编号
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: 成功更新邮箱信息
 */
router.get("/query", ipBasedRatelimit, queryOrder);
/**
 * @swagger
 * /api/order/fetch:
 *   get:
 *     tags:
 *       - 订单
 *     description: 轮询订单的支付状态
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: 订单在数据库中的_id
 *         in: params
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: 成功查询到订单支付状态
 */
router.get("/fetch/:id", fetchOrder);
/**
 * @swagger
 * /api/order:
 *   post:
 *     tags:
 *       - 订单
 *     description: 创建订单
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: price
 *         description: 支付金额
 *         in: body
 *         required: true
 *         type: string
 *       - name: email
 *         description: 创建订单时填写的邮箱
 *         in: body
 *         required: true
 *         type: string
 *       - name: password
 *         description: 创建订单时填写的密码
 *         in: body
 *         required: true
 *         type: string
 *       - name: payment
 *         description: 支付方式（支付宝，微信，Paypal)
 *         in: body
 *         required: true
 *         type: string
 *       - name: productId
 *         description: 商品编号
 *         in: body
 *         required: true
 *         type: string
 *       - name: orderId
 *         description: 订单编号
 *         in: body
 *         required: true
 *         type: string
 *       - name: productName
 *         description: 商品名称
 *         in: body
 *         required: true
 *         type: string
 *       - name: levelName
 *         description: 商品等级
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: 成功创建订单
 */
router.post(
  "/",
  ipBasedRatelimit,
  salesSummary,
  createOrder,
  fetchAlipayQrcode
);
/**
 * @swagger
 * /api/order/verify:
 *   post:
 *     tags:
 *       - 订单
 *     description: 根据会员码查询订单
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: code
 *         description: 会员码
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: 成功查询到订单支付状态
 */
router.post("/verify", ipBasedRatelimit, verifyCode);

module.exports = router;
