const TodayData = require("../models/todayData");
const HistoryData = require("../models/historyData");
const Product = require("../models/product");
const fs = require("fs");
const path = require("path");
const FormData = require("form-data");
const User = require("../models/user");
const axios = require("axios");
class HomeCtl {
  async getTodayData(ctx) {
    const todayData = await TodayData.find(ctx.request.query);
    ctx.body = todayData;
  }
  async getHistoryData(ctx) {
    const historyData = await HistoryData.find(ctx.request.query);
    const periodData = historyData.splice(
      historyData.length > 15 ? historyData.length - 15 : 0
    );
    ctx.body = periodData;
  }
  async upload(ctx) {
    ctx.verifyParams({
      uid: { type: "string", required: true },
    });
    const file = ctx.request.files.file;
    let formData = new FormData();
    const user = await User.findOne({ _id: ctx.request.body.uid });
    if (!user) {
      ctx.throw(403, "上传失败");
    }
    formData.append(
      "smfile",
      fs.createReadStream(
        process.env.NODE_ENV === "dev"
          ? path.join(
              __dirname,
              "../public/uploads",
              file.path.split("\\").reverse()[0]
            )
          : file.path.split("\\").reverse()[0]
      )
    );
    const formHeaders = formData.getHeaders();
    const { data } = await axios.post("https://sm.ms/api/v2/upload", formData, {
      headers: {
        ...formHeaders,
        Authorization: user.smmsKey || process.env.SMMS_KEY,
      },
    });
    if (!data.data) {
      ctx.throw(404, "上传logo失败");
    }
    await Product.updateOne(
      { uid: ctx.request.body.uid },
      {
        ...ctx.request.body,
        logo: data.data.url,
      }
    );
    ctx.body = { success: true };
  }
}
module.exports = new HomeCtl();
