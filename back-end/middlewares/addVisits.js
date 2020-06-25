const TodayData = require("../models/todayData");
const addVisits = async (ctx, next) => {
  let date = new Date();
  const todayData = await TodayData.findOne({
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  });
  if (todayData) {
    let { visits } = todayData;
    visits++;
    await TodayData.findByIdAndUpdate(todayData._id, {
      visits,
    });
  }
  await next();
};
module.exports = {
  addVisits,
};
