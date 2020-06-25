const Alipay = require("../models/alipay");
const WechatPay = require("../models/wechatPay");
const Paypal = require("../models/paypal");
const Email = require("../models/email");
const Setting = require("../models/setting");
const HistoryData = require("../models/historyData");
const TodayData = require("../models/todayData");
const Order = require("../models/order");
const User = require("../models/user");

class initUtil {
  async initData() {
    // await TodayData.deleteMany({}, () => {
    //   console.log("delete success");
    // });
    const alipay = await Alipay.find();
    if (alipay.length === 0) {
      await Alipay({
        paymentName: "支付宝",
        appId: " ",
        publicKey: " ",
        secretKey: " ",
        notifyUrl: " ",
      }).save();
    }
    const paypal = await Paypal.find();
    if (paypal.length === 0) {
      await Paypal({
        paymentName: "Paypal",
        clientID: " ",
        exchangeRate: 7,
        secretKey: " ",
        mode: "生产模式",
      }).save();
    }
    const wechatPay = await WechatPay.find();
    if (wechatPay.length === 0) {
      await WechatPay({
        paymentName: "微信支付",
        accountID: " ",
        bussinessId: " ",
        signMethod: "MD5",
        secretKey: " ",
      }).save();
    }
    const email = await Email.find();
    if (email.length === 0) {
      await Email({
        mailAddress: " ",
        mailPassword: " ",
        sendName: " ",
      }).save();
    }
    const setting = await Setting.find();
    if (setting.length === 0) {
      await Setting({
        themeOption: "default",
        isFirst: "yes",
        version: 1.2,
      }).save();
    }
    const historyData = await HistoryData.find();
    if (historyData.length === 0) {
      let date = new Date();
      new HistoryData({
        date: date.toLocaleDateString(),
        number: 0,
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        week: date.getDay(),
        historySales: 0,
        historyVisits: 0,
        historyOrders: 0,
      }).save();
    }

    const todayData = await TodayData.find();
    if (todayData.length === 0) {
      let date = new Date();
      date.setDate(date.getDate());
      new TodayData({
        date: date.toLocaleDateString(),
        number: 0,
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        week: date.getDay(),
        sales: 0,
        orders: 0,
        visits: 0,
      }).save();
    }
  }
}
module.exports = new initUtil();
