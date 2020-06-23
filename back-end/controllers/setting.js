const Setting = require("../models/setting");
class SettingCtl {
  async fetchSetting(ctx) {
    ctx.body = await Setting.findOne();
  }
  async updateSetting(ctx) {
    // console.log(ctx.request.body);
    ctx.verifyParams({
      themeOption: {
        type: "string",
        enum: ["default", "tech"],
        required: false
      },
      isFirst: {
        type: "string",
        enum: ["yes", "no"],
        required: true
      }
    });
    const setting = await Setting.findByIdAndUpdate(
      ctx.params.id,
      ctx.request.body
    );
    ctx.body = setting;
  }
}
module.exports = new SettingCtl();
