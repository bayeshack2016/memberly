const Router = require("koa-router");
const jwt = require("koa-jwt");

const router = new Router({ prefix: "/api/user" });
const {
  fetchUser,
  createUser,
  loginUser,
  updateUser,
  forgetUser,
  createToken,
  updateSetting,
} = require("../controllers/user");
const auth = jwt({ secret: process.env.SECRET });
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

router.post("/fetch", auth, fetchUser);
router.post("/create", createUser);
router.post("/login", ipBasedRatelimit, loginUser);
router.post("/createToken", ipBasedRatelimit, createToken);
router.post("/updateSetting", auth, ipBasedRatelimit, updateSetting);
router.post("/forget", ipBasedRatelimit, forgetUser);
router.post("/updateInfo", auth, updateUser);

module.exports = router;
