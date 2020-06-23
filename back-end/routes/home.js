const Router = require("koa-router");
const jwt = require("koa-jwt");
const { secret } = require("../config");
const auth = jwt({ secret });
const router = new Router({ prefix: "/api" });

const { getSalesData, getStats, upload } = require("../controllers/home");

router.get("/stats", auth, getStats);
// router.post("/stats", createStats);
router.get("/salesData", auth, getSalesData);
// router.post("/salesData", createSalesData);
// router.get("/addVisits", addVisits);

router.post("/upload", auth, upload);

module.exports = router;
