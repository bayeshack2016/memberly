const SalesData = require("../models/salesData");
const Stats = require("../models/stats");
const Order = require("../models/order");
const CronJob = require("cron").CronJob;

const setSalesData = async () => {
  let date = new Date();
  //获取今日订单数据
  const todayOrders = await Order.find({
    date: date.toLocaleDateString(),
  });
  date.setDate(date.getDate() - 1);
  //获取昨日销售数据
  let salesData = await SalesData.findOne({
    date: date.toLocaleDateString(),
  });

  let number = salesData.number || 0;
  //销售数据编号加一
  number++;
  const sales = 0;
  if(todayOrders){
  todayOrders.forEach((item) => {
    //计算今日销售额
    sales += item.price;
  });
  }

  date = new Date();
  //获取今日访问量
  const { todayVisits } = await Stats.findOne({
    date: date.toLocaleDateString(),
  });

  const sale = SalesData.findOne({
    date: date.toLocaleDateString(),
  });
  //解决sceduler.js 和 cronjob 重复添加的问题

  if (!sale) {
    new SalesData({
      date: date.toLocaleDateString(),
      number: number,
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      week: date.getDay(),
      sales: sales,
      orders: todayOrders.length||0,
      visits: todayVisits||0,
    }).save();
  }
};
const setStats = async () => {
  let date = new Date();
  date.setDate(date.getDate() - 1);
  //获取总销售额，总访问量，总订单量，昨日销售数据的编号
  let { totalSales, totalVisits, totalOrders, number } = await Stats.findOne({
    date: date.toLocaleDateString(),
  });

  number++;
  //统计销售数据
  date = new Date();
  const stat = Stats.findOne({ date: date.toLocaleDateString() });
  //解决sceduler.js 和 cronjob 重复添加的问题
  if (!stat) {
    new Stats({
      date: date.toLocaleDateString(),
      number: number,
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      week: date.getDay(),
      totalSales: totalSales||0,
      totalVisits: totalVisits||0,
      totalOrders: totalOrders||0,
      todayVisits: 0,
    }).save();
  }
};
class CronJobs {
  salesCron() {
    const salesJob = new CronJob("* 59 23 * * *", setSalesData, null, true);

    salesJob.start();
  }
  statsCron() {
    const statsJob = new CronJob("* 01 00 * * *", setStats, null, true);
    statsJob.start();
  }
}
module.exports = new CronJobs();
