const Router = require("koa-router");
const jwt = require("koa-jwt");
const router = new Router({ prefix: "/api" });
const {
  fetchAlipay,
  updateAlipay,
  handleAlipayCallback,
  handleAliPayRefund,
} = require("../controllers/alipay");
const {
  fetchPaypal,
  updatePaypal,
  handlePaypalCallback,
  handlePaypalRefund,
} = require("../controllers/paypal");
const { updateWechat, fetchWechatPay } = require("../controllers/payment");
const { secret } = require("../config");
const auth = jwt({ secret });

router.post("/alipay/callback", handleAlipayCallback);
router.post("/paypal/callback", handlePaypalCallback);

router.post("/alipay/:id", auth, updateAlipay);
router.post("/wechatPay/:id", auth, updateWechat);
router.post("/paypal/:id", auth, updatePaypal);

router.get("/alipay", auth, fetchAlipay);
router.get("/wechatPay", auth, fetchWechatPay);
router.get("/paypal", fetchPaypal);

router.post("/refund/alipay", auth, handleAliPayRefund);
router.post("/refund/paypal", auth, handlePaypalRefund);

module.exports = router;
