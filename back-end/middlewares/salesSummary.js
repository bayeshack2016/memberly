const TodayData = require("../models/todayData");
const HistoryData = require("../models/historyData");
const salesSummary = async (ctx, next) => {
  ctx.verifyParams({
    price: { type: "number", required: true },
  });
  let date = new Date();
  const todayData = await TodayData.findOne({
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  });
  if (todayData) {
    let { sales, visits, orders } = todayData;
    sales += ctx.request.body.price;
    orders++;
    await TodayData.findByIdAndUpdate(todayData._id, {
      sales,
      orders,
    });
    const historyData = await HistoryData.findOne({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    });

    if (historyData) {
      let { historySales, historyVisits, historyOrders } = historyData;
      historySales += sales;
      historyVisits += visits;
      historyOrders += orders;
      await HistoryData.findByIdAndUpdate(historyData._id, {
        historySales,
        historyVisits,
        historyOrders,
      });
    }
  }

  await next();
};
module.exports = {
  salesSummary,
};
