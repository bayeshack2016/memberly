const Router = require("koa-router");
const jwt = require("koa-jwt");
const { secret } = require("../config");
const auth = jwt({ secret });
const router = new Router({ prefix: "/api/user" });
const {
  fetchUser,
  createUser,
  loginUser,
  updateUser,
  forgetUser,
  verifyAnswer,
} = require("../controllers/user");
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
 * /api/user:
 *   get:
 *     tags:
 *       - 用户
 *     description: 获取用户信息
 *     responses:
 *       200:
 *         description: 成功获取用户信息
 */
router.get("/", auth, fetchUser);
/**
 * @swagger
 * /api/user/verify:
 *   get:
 *     tags:
 *       - 用户
 *     description: 验证用户身份
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: answer1
 *         description: 问题一答案
 *         in: body
 *         required: true
 *         type: string
 *       - name: answer2
 *         description: 问题二答案
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: 成功验证用户身份
 */
router.post("/verify", auth, verifyAnswer);
/**
 * @swagger
 * /api/user:
 *   post:
 *     tags:
 *       - 用户
 *     description: 创建用户信息
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: 邮箱
 *         in: body
 *         required: true
 *         type: string
 *       - name: password
 *         description: 密码
 *         in: body
 *         required: true
 *         type: string
 *       - name: answer1
 *         description: 问题一答案
 *         in: body
 *         required: true
 *         type: string
 *       - name: answer2
 *         description: 问题二答案
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: 成功创建用户
 */
router.post("/", createUser);
/**
 * @swagger
 * /api/user/login:
 *   post:
 *     tags:
 *       - 用户
 *     description: 登陆账户
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: 邮箱
 *         in: body
 *         required: true
 *         type: string
 *       - name: password
 *         description: 密码
 *         in: body
 *         required: true
 *         type: string
 *       - name: answer1
 *     responses:
 *       200:
 *         description: 成功登陆
 */
router.post("/login", ipBasedRatelimit, loginUser);
/**
 * @swagger
 * /api/user/forget:
 *   get:
 *     tags:
 *       - 用户
 *     description: 忘记密码
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: password
 *         description: 新密码
 *         in: body
 *         required: true
 *         type: string
 *       - name: answer1
 *         description: 问题一答案
 *         in: body
 *         required: true
 *         type: string
 *       - name: answer2
 *         description: 问题二答案
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: 成功重置密码
 */
router.post("/forget", ipBasedRatelimit, forgetUser);
/**
 * @swagger
 * /api/user/update:
 *   get:
 *     tags:
 *       - 用户
 *     description: 更新用户信息
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: 新邮箱
 *         in: body
 *         required: true
 *         type: string
 *       - name: password
 *         description: 新密码
 *         in: body
 *         required: true
 *         type: string
 *       - name: answer1
 *         description: 问题一答案
 *         in: body
 *         required: true
 *         type: string
 *       - name: answer2
 *         description: 问题二答案
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: 成功更新用户信息
 */
router.post("/update/:id", auth, updateUser);

module.exports = router;
