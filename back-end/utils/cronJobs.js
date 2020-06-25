const TodayData = require("../models/todayData");
const HistoryData = require("../models/historyData");
const CronJob = require("cron").CronJob;

const setData = async () => {
  let date = new Date();
  date.setDate(date.getDate() - 1);
  //获取总销售额，总访问量，总订单量，昨日销售数据的编号
  let lastHistoryData = await HistoryData.findOne({
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  });
  let historySales, historyVisits, historyOrders, number=0;
  if(lastHistoryData){
    historySales=lastHistoryData.historySales;
    historyVisits = lastHistoryData.historyVisits;
    historyOrders = lastHistoryData.historyOrders;
    number = lastHistoryData.number;
  }
  date = new Date();
  number++;
  new HistoryData({
    date: date.toLocaleDateString(),
    number: number || 1,
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    week: date.getDay(),
    historySales: historySales || 0,
    historyVisits: historyVisits || 0,
    historyOrders: historyOrders || 0,
  }).save();
  new TodayData({
    date: date.toLocaleDateString(),
    number: number || 1,
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    week: date.getDay(),
    sales: 0,
    orders: 0,
    visits: 0,
  }).save();
};
class CronJobs {
  DataCron() {
    const dataCron = new CronJob("* 01 00 * * *", setData, null, true);
    dataCron.start();
  }
}
module.exports = new CronJobs();
