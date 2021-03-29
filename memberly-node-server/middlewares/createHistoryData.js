const HistoryData = require("../models/historyData");
const createHistoryData = async (ctx, next) => {
  ctx.verifyParams({
    uid: { type: "string", required: true },
  });
  await next();
  setTimeout(async () => {
    let date = new Date();
    let historyData = await HistoryData.findOne({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      uid: ctx.request.body.uid,
    });

    if (historyData) {
      return;
    } else {
      //获取总销售额，总访问量，总订单量，昨日销售数据的编号
      let lastHistoryData = await HistoryData.findOne({
        uid: ctx.request.body.uid,
      })
        .sort({ field: "asc", _id: -1 })
        .limit(1);
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
      historyData = await new HistoryData({
        date: date.format("yyyy-MM-dd"),
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        week: date.getDay(),
        historySales: historySales || 0,
        historyVisits: historyVisits || 0,
        historyOrders: historyOrders || 0,
        uid: ctx.request.body.uid,
      }).save();
    }
  });
};
module.exports = {
  createHistoryData,
};
