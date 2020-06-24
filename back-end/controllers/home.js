const SalesData = require("../models/salesData");
const Stats = require("../models/stats");
const Product = require("../models/product");
const { smms } = require("../config");
const fs = require("fs");
const path = require("path");
const FormData = require("form-data");
const axios = require("axios");
class HomeCtl {
  async getSalesData(ctx) {
    const salesData = await SalesData.find(ctx.request.query);
    ctx.body = salesData;
  }
  async getStats(ctx) {
    const stats = await Stats.find(ctx.request.query);
    ctx.body = stats;
  }
  async upload(ctx) {
    console.log("shangchuan");
    const file = ctx.request.files.file;
    let formData = new FormData();
    formData.append(
      "smfile",
      fs.createReadStream(
        path.join(
          __dirname,
          "../public/uploads",
          file.path.split("\\").reverse()[0]
        )
      )
    );
    const formHeaders = formData.getHeaders();
    const { data } = await axios.post("https://sm.ms/api/v2/upload", formData, {
      headers: {
        ...formHeaders,
        Authorization: smms,
      },
    });
    if (!data.data) {
      ctx.throw(404, "上传logo失败");
    }
    await Product.findByIdAndUpdate(ctx.request.body.id, {
      ...ctx.request.body,
      logo: data.data.url,
    });
    ctx.body = { success: true };
  }
  async addVisits(ctx, next) {
    let date = new Date();
    const stat = await Stats.findOne({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    });
    if (stat) {
      let todayVisits = stat.todayVisits;
      todayVisits++;
      await Stats.findByIdAndUpdate(stat._id, { todayVisits: todayVisits });
    }
    await next();
  }
}
module.exports = new HomeCtl();
