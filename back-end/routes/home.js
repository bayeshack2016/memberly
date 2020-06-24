const Router = require("koa-router");
const jwt = require("koa-jwt");
const { secret } = require("../config");
const auth = jwt({ secret });
const router = new Router({ prefix: "/api" });

const { getSalesData, getStats, upload } = require("../controllers/home");
/**
 * @swagger
 * /api/stats:
 *   get:
 *     tags:
 *       - 统计数据
 *     description: 获取总订单数，总访问量，总销售额
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: year
 *         description: 根据年获取
 *         in: query
 *         required: false
 *         type: string
 *       - name: month
 *         description: 根据月获取
 *         in: query
 *         required: false
 *         type: string
 *       - name: day
 *         description: 根据日获取
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: 成功获取数据
 */
router.get("/stats", auth, getStats);
/**
 * @swagger
 * /api/saleData:
 *   get:
 *     tags:
 *       - 统计数据
 *     description: 获取今日的订单量，销售额，访问量
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: year
 *         description: 根据年获取
 *         in: query
 *         required: false
 *         type: string
 *       - name: month
 *         description: 根据月获取
 *         in: query
 *         required: false
 *         type: string
 *       - name: day
 *         description: 根据日获取
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: 成功获取数据
 */
router.get("/salesData", auth, getSalesData);
/**
 * @swagger
 * /api/upload:
 *   post:
 *     tags:
 *       - 上传接口
 *     description: 上传商品Logo
 *     produces:
 *       - multipart/form-data
 *     parameters:
 *       - name: year
 *         description: 图片文件
 *         in: files
 *         required: true
 *         type: jpeg/png/bmp
 *     responses:
 *       200:
 *         description: 成功上传图片
 */
router.post("/upload", auth, upload);

module.exports = router;
