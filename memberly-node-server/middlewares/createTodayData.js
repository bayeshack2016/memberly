const TodayData = require("../models/todayData");
const Product = require("../models/product");

const createTodayData = async (ctx, next) => {
  ctx.verifyParams({
    productId: { type: "string", required: true },
  });

  const product = await Product.findOne({
    _id: ctx.request.body.productId,
  });
  if (!product || product.onSale === "no") {
    ctx.throw(404, "未找到商品信息信息");
  }
  ctx.request.body.uid = product.uid;
  await next();
  setTimeout(async () => {
    let date = new Date();
    let todayData = await TodayData.findOne({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      uid: ctx.request.body.uid,
    });
    if (todayData) {
      return;
    } else {
      //获取总销售额，总访问量，总订单量，昨日销售数据的编号
      todayData = await new TodayData({
        date: date.format("yyyy-MM-dd"),
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        week: date.getDay(),
        sales: 0,
        orders: 0,
        visits: 0,
        uid: ctx.request.body.uid,
      }).save();
    }
  });
};
module.exports = {
  createTodayData,
};
