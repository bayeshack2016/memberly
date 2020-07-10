const TodayData = require("../models/todayData");
const createTodaySales = async (ctx, next) => {
  let date = new Date();
  let todayData = await TodayData.findOne({
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  });
  // console.log(todayData);
  if (todayData) {
    await next();
  } else {
    date = new Date();
    date.setDate(date.getDate() - 1);
    //获取总销售额，总访问量，总订单量，昨日销售数据的编号
    let yesterdayData = await TodayData.findOne({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    });
    let number = 0;
    if (yesterdayData) {
      number = yesterdayData.number + 1;
    }
    date = new Date();
    todayData = await new TodayData({
      date: date.toLocaleDateString(),
      number: number || 0,
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      week: date.getDay(),
      sales: 0,
      orders: 0,
      visits: 0,
    }).save();
    // console.log(todayData);
    await next();
  }
};
module.exports = {
  createTodaySales,
};
