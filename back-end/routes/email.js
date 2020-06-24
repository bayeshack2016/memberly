const Router = require("koa-router");
const jwt = require("koa-jwt");
const { secret } = require("../config");
const auth = jwt({ secret });
const router = new Router({ prefix: "/api/email" });
const { updateEmail, fetchEmail } = require("../controllers/email");
/**
 * @swagger
 * /api/email:
 *   post:
 *     tags:
 *       - 邮箱
 *     description: 更新邮箱信息
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: mailAddress
 *         description: 邮箱地址
 *         in: body
 *         required: true
 *         type: string
 *       - name: mailPassword
 *         description: 邮箱密码或授权码
 *         in: body
 *         required: true
 *         type: string
 *       - name: sendName
 *         description: 发件人昵称
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: 成功更新邮箱信息
 */
router.post("/:id", auth, updateEmail);
/**
 * @swagger
 * /api/email:
 *   get:
 *     tags:
 *       - 邮箱
 *     description: 获取邮箱信息
 *     responses:
 *       200:
 *         description: 成功更新邮箱信息
 */
router.get("/", auth, fetchEmail);

module.exports = router;
