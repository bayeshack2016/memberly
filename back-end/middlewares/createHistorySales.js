const HistoryData = require("../models/historyData");
const createHistorySales = async (ctx, next) => {
  let date = new Date();
  let historyData = await HistoryData.findOne({
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  });
  // console.log(historyData);
  if (historyData) {
    await next();
  } else {
    date = new Date();
    date.setDate(date.getDate() - 1);
    //获取总销售额，总访问量，总订单量，昨日销售数据的编号
    let lastHistoryData = await HistoryData.findOne({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    });
    let historySales,
      historyVisits,
      historyOrders,
      number = 0;
    if (lastHistoryData) {
      historySales = lastHistoryData.historySales;
      historyVisits = lastHistoryData.historyVisits;
      historyOrders = lastHistoryData.historyOrders;
      number = lastHistoryData.number + 1;
    }
    date = new Date();
    historyData = await new HistoryData({
      date: date.toLocaleDateString(),
      number: number || 0,
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      week: date.getDay(),
      historySales: historySales || 0,
      historyVisits: historyVisits || 0,
      historyOrders: historyOrders || 0,
    }).save();
    // console.log(historyData);
    await next();
  }
};
module.exports = {
  createHistorySales,
};
