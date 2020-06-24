const Setting = require("../models/setting");
class SettingCtl {
  async fetchSetting(ctx) {
    ctx.body = await Setting.findOne();
  }
  async updateSetting(ctx) {
    ctx.verifyParams({
      themeOption: {
        type: "string",
        enum: ["default", "tech"],
        required: false,
      },
      isFirst: {
        type: "string",
        enum: ["yes", "no"],
        required: false,
      },
    });
    const setting = await Setting.findByIdAndUpdate(
      ctx.params.id,
      ctx.request.body
    );
    ctx.body = setting;
  }
}
module.exports = new SettingCtl();
