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
  console.log("handleFetchByMonth");
  return async (dispatch) => {
    let salesByMonth = [];
    let visitsByMonth = [];
    let ordersByMonth = [];
    let maxDay = moment().daysInMonth();
    let date = new Date();
    let metadata = await $axios({
      method: "get",
      url: `/salesData?year=${date.getFullYear()}&&month=${
        date.getMonth() + 1
      }`,
    });
    let monthData = metadata.data;
    console.log(metadata, "monthdata");
    for (let i = 1; i <= maxDay; i++) {
      let sales = monthData[i] ? monthData[i].sales : 0;
      let visits = monthData[i] ? monthData[i].visits : 0;
      let orders = monthData[i] ? monthData[i].orders : 0;
      salesByMonth.push(parseInt(sales));
      visitsByMonth.push(parseInt(visits));
      ordersByMonth.push(parseInt(orders));
    }
    // console.log(salesByMonth, salesByMonth, ordersByMonth);
    dispatch(handleSalesByMonth(salesByMonth));
    dispatch(handleVisitsByMonth(visitsByMonth));
    dispatch(handleOrdersByMonth(ordersByMonth));
  };
}
