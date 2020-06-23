const SalesData = require("../models/salesData");
const Stats = require("../models/stats");
const faker = require("faker");
const Product = require("../models/product");
class HomeCtl {
  async getSalesData(ctx) {
    const salesData = await SalesData.find(ctx.request.query);
    console.log(ctx.request.query, salesData, "salesData");
    ctx.body = salesData;
  }
  async getStats(ctx) {
    const stats = await Stats.find(ctx.request.query);

    ctx.body = stats;
  }
  async upload(ctx) {
    console.log("shangchuan");
    const file = ctx.request.files.file;

    console.log(file, ctx.request.body.id);
    const product = await Product.findByIdAndUpdate(ctx.request.body.id, {
      ...ctx.request.body,
      logo: file.path.split("\\").reverse()[0],
    });
    if (!product) {
      ctx.throw(404, "上传logo失败");
    }
    console.log(product, "product");
    ctx.body = product;
    // ctx.body = { success: true, path: file.path.split("\\").reverse()[0] };
  }
  async addVisits(ctx, next) {
    let date = new Date();
    const stat = await Stats.findOne({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    });
    // console.log(stat);
    if (stat) {
      // console.log(stat.todayVisits);
      let todayVisits = stat.todayVisits;
      todayVisits++;
      await Stats.findByIdAndUpdate(stat._id, { todayVisits: todayVisits });
    }
    await next();
  }
}
module.exports = new HomeCtl();
