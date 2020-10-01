const Router = require("koa-router");
const jwt = require("koa-jwt");
const { secret } = require("../config");
const auth = jwt({ secret });
const router = new Router({ prefix: "/api" });

const { getTodayData, getHistoryData, upload } = require("../controllers/home");

router.get("/historyData", auth, getHistoryData);

router.get("/todayData", auth, getTodayData);

router.post("/upload", auth, upload);

module.exports = router;
