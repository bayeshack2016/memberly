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
const { addVisits } = require("../middlewares/addVisits");
const { createTodayData } = require("../middlewares/createTodayData");
const { createHistoryData } = require("../middlewares/createHistoryData");

const auth = jwt({ secret: process.env.SECRET });
router.post("/all", auth, fetchAllProduct);

router.post(
  "/fetch",
  createTodayData,
  createHistoryData,
  addVisits,
  fetchProduct
);

router.post("/create", auth, createProduct);

router.post("/update", auth, updateProduct);

router.post("/delete", auth, deleteProduct);

module.exports = router;
