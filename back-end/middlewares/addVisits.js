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

    let { visits } = todayData;
    visits++;
    await TodayData.findByIdAndUpdate(todayData._id, {
      visits,
    });
    const historyData = await HistoryData.findOne({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    });
    // console.log(historyData);

    let { historyVisits } = historyData;
    historyVisits++;
    await HistoryData.findByIdAndUpdate(historyData._id, {
      historyVisits,
    });
  });
};
module.exports = {
  addVisits,
};
