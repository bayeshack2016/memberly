import $axios from "@/axios/$axios";
import moment from "moment";

export function handleSalesByWeek(salesByWeek) {
  return { type: "HANDLE_SALES_BY_WEEK", payload: salesByWeek };
}
export function handleVisitsByWeek(visitsByWeek) {
  return { type: "HANDLE_VISITS_BY_WEEK", payload: visitsByWeek };
}
export function handleOrdersByWeek(ordersByWeek) {
  return { type: "HANDLE_ORDERS_BY_WEEK", payload: ordersByWeek };
}

export function handleFetchByWeek(catergory) {
  return async (dispatch) => {
    let salesByMonth = [];
    let visitsByMonth = [];
    let ordersByMonth = [];
    let maxDay = moment().daysInMonth();
    let date = new Date();
    let week = (date.getDay() + 6) % 7;
    let day = date.getDate();

    let metadata = await $axios({
      method: "get",
      url: `/todayData?year=${date.getFullYear()}&&month=${
        date.getMonth() + 1
      }`,
    });
    let monthData = metadata.data;
    for (let i = 1; i <= maxDay; i++) {
      let data = monthData.filter((item) => {
        return item.day === i;
      });
      let sales = data.length !== 0 ? data[0].sales : 0;
      let visits = data.length !== 0 ? data[0].visits : 0;
      let orders = data.length !== 0 ? data[0].orders : 0;
      salesByMonth.push(parseInt(sales));
      visitsByMonth.push(parseInt(visits));
      ordersByMonth.push(parseInt(orders));
    }

    dispatch(handleSalesByWeek(salesByMonth.slice(day - week - 1, day)));
    dispatch(handleVisitsByWeek(visitsByMonth.slice(day - week - 1, day)));
    dispatch(handleOrdersByWeek(ordersByMonth.slice(day - week - 1, day)));
  };
}
