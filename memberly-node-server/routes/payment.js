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
const {
  handlePaymentCheck,
  handleBalanceRefund,
} = require("../controllers/payment");

const auth = jwt({ secret: process.env.SECRET });

router.post("/checkPayment", auth, handlePaymentCheck);

router.post("/alipay/callback", handleAlipayCallback);
router.post("/paypal/callback", handlePaypalCallback);

router.post("/alipay/update", auth, updateAlipay);
router.post("/paypal/update", auth, updatePaypal);

router.post("/alipay/fetch", auth, fetchAlipay);
router.post("/paypal/fetch", auth, fetchPaypal);

router.post("/refund/alipay", auth, handleAliPayRefund);
router.post("/refund/paypal", auth, handlePaypalRefund);
router.post("/refund/balance", auth, handleBalanceRefund);

module.exports = router;
