const Koa = require("koa");
const app = new Koa();
const koaBody = require("koa-body");
const routing = require("./routes");
const error = require("koa-json-error");
const parameter = require("koa-parameter");
const mongoose = require("mongoose");
const helmet = require("koa-helmet");
const logger = require("koa-logger");
const morgan = require("koa-morgan");
const fs = require("fs");
const path = require("path");
const cors = require("koa2-cors");
const koaStatic = require("koa-static");
const { connection } = require("./config");
const { initData } = require("./utils/initUtil");
const compress = require("koa-compress");
const koaSwagger = require("koa2-swagger-ui");
const swagger = require("./utils/swagger");
mongoose.connect(connection, { useNewUrlParser: true }, () => {
  console.log("连接成功");
});
mongoose.connection.on("error", console.error);
app.use(helmet());
app.use(cors());
app.use(logger());
app.use(compress({ threshold: 2048 }));
app.use(koaStatic(path.join(__dirname, "public")));
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
app.use(
  koaSwagger({
    routePrefix: "/swagger", // host at /swagger instead of default /docs
    swaggerOptions: {
      url: "/swagger.json", // example path to json 其实就是之后swagger-jsdoc生成的文档地址
    },
  })
);
app.use(swagger.routes(), swagger.allowedMethods());
const ENV = process.env.NODE_ENV;
if (ENV !== "production") {
  // 开发环境 / 测试环境
  app.use(morgan("dev"));
} else {
  // 线上环境
  const logFileName = path.join(__dirname, "logs", "access.log");
  const writeStream = fs.createWriteStream(logFileName, {
    flags: "a",
  });
  app.use(
    morgan("combined", {
      stream: writeStream,
    })
  );
}
app.use(
  error({
    postFormat: (e, { stack, ...rest }) =>
      process.env.NODE_ENV === "production" ? { ...rest } : { stack, ...rest },
  })
);
var dirPath = path.join(__dirname, "/public/uploads");
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
  console.log("文件夹创建成功");
} else {
  console.log("文件夹已存在");
}
app.use(
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, "/public/uploads"),
      keepExtensions: true,
    },
  })
);
app.use(parameter(app));
routing(app);

initData();
module.exports = app;
