const Setting = require("../models/setting");
class SettingCtl {
  async fetchSetting(ctx) {
    ctx.verifyParams({ uid: { type: "string", required: true } });
    ctx.body = await Setting.findOne({ uid: ctx.request.body.uid });
  }
  async updateSetting(ctx) {
    ctx.verifyParams({
      themeOption: {
        type: "string",
        enum: [
          "default",
          "tech",
          "nostalgic",
          "blur",
          "black_yellow",
          "blue_white",
          "blue_gray",
          "purple_yellow",
          "black_blue",
          "dark_blue",
        ],
        required: false,
      },
      defaultMail: {
        type: "string",
        enum: ["qq", "163", "gmail", "smtp"],
        required: false,
      },
      isSendOrderByEmail: { type: "boolean", required: true },
      isSendLoginByEmail: { type: "boolean", required: true },
      isSendVerByEmail: { type: "boolean", required: true },
      isSendOrderByTele: { type: "boolean", required: true },
      isSendLoginByTele: { type: "boolean", required: true },
      isSendVerByTele: { type: "boolean", required: true },
      uid: { type: "string", required: true },
    });
    const setting = await Setting.findByIdAndUpdate(
      ctx.request.body._id,
      ctx.request.body
    );
    ctx.body = setting;
  }
}
module.exports = new SettingCtl();
