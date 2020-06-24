const Router = require("koa-router");
const jwt = require("koa-jwt");

const router = new Router({ prefix: "/api/product" });
const {
  fetchProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  fetchAllProduct,
} = require("../controllers/product");
const { addVisits } = require("../controllers/home");
const { secret } = require("../config");
const auth = jwt({ secret });
/**
 * @swagger
 * /api/product/all:
 *   get:
 *     tags:
 *       - 商品
 *     description: 获取所有商品信息
 *     responses:
 *       200:
 *         description: 成功获取所有商品信息
 */
router.get("/all", auth, fetchAllProduct);
/**
 * @swagger
 * /api/product:
 *   get:
 *     tags:
 *       - 商品
 *     description: 获取单个商品信息
 *     parameters:
 *       - name: id
 *         description: 商品编号
 *         in: params
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: 成功获取单个商品信息
 */
router.get("/:id", addVisits, fetchProduct);
/**
 * @swagger
 * /api/product:
 *   post:
 *     tags:
 *       - 商品
 *     description: 创建商品
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: productType
 *         description: 商品类型（会员码类型/非会员码类型）
 *         in: body
 *         required: true
 *         type: number
 *       - name: productName
 *         description: 商品名称
 *         in: body
 *         required: true
 *         type: string
 *       - name: productInfo
 *         description: 商品简介
 *         in: body
 *         required: true
 *         type: string
 *       - name: memberLevel
 *         description: 等级数量
 *         in: body
 *         required: true
 *         type: number
 *       - name: onSale
 *         description: 是否在售
 *         in: body
 *         required: true
 *         type: string
 *       - name: levelName
 *         description: 商品等级名称
 *         in: body
 *         required: true
 *         type: array
 *       - name: levelPrice
 *         description: 商品价格
 *         in: body
 *         required: true
 *         type: array
 *       - name: levelDesc
 *         description: 等级介绍
 *         in: body
 *         required: true
 *         type: array
 *       - name: levelLimit
 *         description: 等级限购数量
 *         in: body
 *         required: false
 *         type: array
 *       - name: levelNote
 *         description: 等级备注
 *         in: body
 *         required: false
 *         type: array
 *       - name: contact
 *         description: 联系方式
 *         in: body
 *         required: true
 *         type: array
 *       - name: productId
 *         description: 商品编号
 *         in: body
 *         required: true
 *         type: number
 *       - name: callbackUrl
 *         description: 非会员码商品回调地址
 *         in: body
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: 成功创建商品
 */
router.post("/", auth, createProduct);
/**
 * @swagger
 * /api/product/update:
 *   post:
 *     tags:
 *       - 商品
 *     description: 更新商品
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: productType
 *         description: 商品类型（会员码类型/非会员码类型）
 *         in: body
 *         required: true
 *         type: number
 *       - name: productName
 *         description: 商品名称
 *         in: body
 *         required: true
 *         type: string
 *       - name: productInfo
 *         description: 商品简介
 *         in: body
 *         required: true
 *         type: string
 *       - name: memberLevel
 *         description: 等级数量
 *         in: body
 *         required: true
 *         type: number
 *       - name: onSale
 *         description: 是否在售
 *         in: body
 *         required: true
 *         type: string
 *       - name: levelName
 *         description: 商品等级名称
 *         in: body
 *         required: true
 *         type: array
 *       - name: levelPrice
 *         description: 商品价格
 *         in: body
 *         required: true
 *         type: array
 *       - name: levelDesc
 *         description: 等级介绍
 *         in: body
 *         required: true
 *         type: array
 *       - name: levelLimit
 *         description: 等级限购数量
 *         in: body
 *         required: false
 *         type: array
 *       - name: levelNote
 *         description: 等级备注
 *         in: body
 *         required: false
 *         type: array
 *       - name: contact
 *         description: 联系方式
 *         in: body
 *         required: true
 *         type: array
 *       - name: productId
 *         description: 商品编号
 *         in: body
 *         required: true
 *         type: number
 *       - name: callbackUrl
 *         description: 非会员码商品回调地址
 *         in: body
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: 成功更新商品
 */
router.post("/update/:id", auth, updateProduct);
/**
 * @swagger
 * /api/product/delete:
 *   delete:
 *     tags:
 *       - 商品
 *     description: 删除商品
 *     parameters:
 *       - name: id
 *         description: 商品编号
 *         in: params
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: 成功删除商品
 */
router.delete("/delete/:id", auth, deleteProduct);

module.exports = router;
