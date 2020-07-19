const TodayData = require("../models/todayData");
const HistoryData = require("../models/historyData");
const addVisits = async (ctx, next) => {
  await next();
  setTimeout(async () => {
    let date = new Date();
    console.log(date);
    const todayData = await TodayData.findOne({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    });
    console.log(todayData);
    let todayVisits = todayData ? todayData.visits : 0;
    todayVisits++;
    console.log(todayVisits);
    await TodayData.findByIdAndUpdate(todayData._id, {
      visits: todayVisits,
    });
    const historyData = await HistoryData.findOne({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    });
    // console.log(historyData);

    let historyVisits = historyData ? historyData.historyVisits : 0;
    historyVisits++;
    await HistoryData.findByIdAndUpdate(historyData._id, {
      historyVisits,
    });
  });
};
module.exports = {
  addVisits,
};
