const Router = require("koa-router");
const jwt = require("koa-jwt");
const { secret } = require("../config");
const auth = jwt({ secret });
const router = new Router({ prefix: "/api/email" });
const { updateEmail, fetchEmail } = require("../controllers/email");

router.post("/:id", auth, updateEmail);

router.get("/", auth, fetchEmail);

module.exports = router;
