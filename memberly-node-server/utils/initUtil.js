const Alipay = require("../models/alipay");
const Paypal = require("../models/paypal");
const Email = require("../models/email");
const Setting = require("../models/setting");
const User = require("../models/user");

class initUtil {
  async initData(uid) {
    // await await Setting.findByIdAndUpdate(
    //    uid ,
    //   {
    //     isSendOrderByEmail: true,
    //     isSendLoginByEmail: true,
    //     isSendVerByEmail: true,
    //     isSendOrderByTele: false,
    //     isSendLoginByTele: false,
    //     isSendVerByTele: false,
    //   }
    // );

    await Alipay({
      uid,
    }).save();

    await Paypal({
      uid,
    }).save();

    await Email({
      mailName: "qq",
      uid,
    }).save();
    await Email({
      mailName: "163",
      uid,
    }).save();
    await Email({
      mailName: "gmail",
      uid,
    }).save();
    await Email({
      mailName: "smtp",
      uid,
    }).save();

    await Setting({
      themeOption: "default",
      defaultMail: "smtp",
      isSendOrderByEmail: true,
      isSendLoginByEmail: false,
      isSendVerByEmail: true,
      isSendOrderByTele: false,
      isSendLoginByTele: false,
      isSendVerByTele: false,
      uid,
    }).save();
  }
}
module.exports = new initUtil();
