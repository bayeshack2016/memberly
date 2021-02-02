import $axios from "@/axios/$axios";
import moment from "moment";

export function handleSalesByMonth(salesByMonth) {
  return { type: "HANDLE_SALES_BY_MONTH", payload: salesByMonth };
}
export function handleVisitsByMonth(visitsByMonth) {
  return { type: "HANDLE_VISITS_BY_MONTH", payload: visitsByMonth };
}
export function handleOrdersByMonth(ordersByMonth) {
  return { type: "HANDLE_ORDERS_BY_MONTH", payload: ordersByMonth };
}

export function handleFetchByMonth() {
  return async (dispatch) => {
    let salesByMonth = [];
    let visitsByMonth = [];
    let ordersByMonth = [];
    let maxDay = moment().daysInMonth();
    let date = new Date();
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
    dispatch(handleSalesByMonth(salesByMonth));
    dispatch(handleVisitsByMonth(visitsByMonth));
    dispatch(handleOrdersByMonth(ordersByMonth));
  };
}
