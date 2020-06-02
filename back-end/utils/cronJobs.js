const SalesData = require("../models/salesData");
const Stats = require("../models/stats");
const Order = require("../models/order");
const CronJob = require("cron").CronJob;

const setSalesData = async () => {
  let date = new Date();
  //获取今日订单数据
  const todayOrders = await Order.find({
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  });

  date.setDate(date.getDate() - 1);
  //获取昨日销售数据
  let salesData = await SalesData.findOne({
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  });
  let number = 0;
  if (salesData) {
    number = salesData.number;
  }
  //销售数据编号加一
  number++;
  const sales = 0;
  let newTodayOrders;
  if (todayOrders[0]) {
    newTodayOrders = todayOrders.filter((item) => {
      return item.activation === "已激活";
    });
  }
  if (newTodayOrders[0]) {
    newTodayOrders.forEach((item) => {
      //计算今日销售额
      sales += item.price;
    });
  }

  date = new Date();
  //获取今日访问量
  let todayStat = await Stats.findOne({
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  });
  let todayVisits;
  if (todayStat) {
    todayVisits = todayStat.todayVisits;
  }
  const sale = await SalesData.findOne({
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  });
  //解决sceduler.js 和 cronjob 重复添加的问题
  // console.log(sale, date.toLocaleDateString(), !sale, "!sale");
  if (!sale) {
    new SalesData({
      date: date.toLocaleDateString(),
      number: number,
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      week: date.getDay(),
      sales: sales,
      orders: todayOrders.length || 0,
      visits: todayVisits || 0,
    }).save();
  }
};
const setStats = async () => {
  let date = new Date();
  date.setDate(date.getDate() - 1);
  //获取总销售额，总访问量，总订单量，昨日销售数据的编号
  let todayStat = await Stats.findOne({
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  });
  let totalSales, totalVisits, totalOrders, number;
  if (todayStat) {
    [totalSales, totalVisits, totalOrders, number] = [
      todayStat.totalSales,
      todayStat.totalVisits,
      todayStat.totalOrders,
      todayStat.number,
    ];
  }

  number++;
  //统计销售数据
  date = new Date();
  const stat = await Stats.findOne({
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  });
  //解决sceduler.js 和 cronjob 重复添加的问题
  if (!stat) {
    new Stats({
      date: date.toLocaleDateString(),
      number: number || 0,
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      week: date.getDay(),
      totalSales: totalSales || 0,
      totalVisits: totalVisits || 0,
      totalOrders: totalOrders || 0,
      todayVisits: 0,
    }).save();
  }
};
class CronJobs {
  salesCron() {
    // setSalesData();
    const salesJob = new CronJob("* 59 23 * * *", setSalesData, null, true);

    salesJob.start();
  }
  statsCron() {
    // setStats();
    const statsJob = new CronJob("* 01 00 * * *", setStats, null, true);
    statsJob.start();
  }
}
module.exports = new CronJobs();
