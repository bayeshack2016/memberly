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
const { secret } = require("../config");
const auth = jwt({ secret });

router.get("/all", auth, fetchAllProduct);

router.get("/:id", createTodayData, createHistoryData, addVisits, fetchProduct);

router.post("/", auth, createProduct);

router.post("/update/:id", auth, updateProduct);

router.post("/delete/:id", auth, deleteProduct);

module.exports = router;
