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
    let { sales, orders } = todayData;
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
    // console.log(historyData);
    if (historyData) {
      let { historySales, historyOrders } = historyData;
      historySales += ctx.request.body.price;
      historyOrders++;
      // console.log(historyOrders);
      await HistoryData.findByIdAndUpdate(historyData._id, {
        historySales,
        historyOrders,
      });
    }
  }

  await next();
};
module.exports = {
  salesSummary,
};
