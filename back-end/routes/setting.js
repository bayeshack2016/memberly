const Router = require("koa-router");
const jwt = require("koa-jwt");

const router = new Router({ prefix: "/api/setting" });
const { fetchSetting, updateSetting } = require("../controllers/setting");
const { secret } = require("../config");
const auth = jwt({ secret });
/**
 * @swagger
 * /api/setting:
 *   get:
 *     tags:
 *       - 设置
 *     description: 获取设置信息
 *     responses:
 *       200:
 *         description: 成功获取设置信息
 */
router.get("/", fetchSetting);
/**
 * @swagger
 * /api/setting:
 *   post:
 *     tags:
 *       - 设置
 *     description: 更新设置信息
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: themeOption
 *         description: 主题设置
 *         in: body
 *         required: false
 *         type: string
 *       - name: isFirst
 *         description: 是否首次登陆
 *         in: body
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: 成功更新设置信息
 */
router.post("/:id", auth, updateSetting);
module.exports = router;
