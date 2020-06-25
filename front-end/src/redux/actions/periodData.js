import $axios from "@/axios/$axios";

export function handleSalesByPeriod(salesByPeriod) {
  return { type: "HANDLE_SALES_BY_PERIOD", payload: salesByPeriod };
}
export function handleVisitsByPeriod(visitsByPeriod) {
  return { type: "HANDLE_VISITS_BY_PERIOD", payload: visitsByPeriod };
}
export function handleOrdersByPeriod(ordersByPeriod) {
  return { type: "HANDLE_ORDERS_BY_PERIOD", payload: ordersByPeriod };
}
export function handleAllSales(data) {
  return { type: "HANDLE_ALL_SALES", payload: data };
}
export function handleAllVisits(data) {
  return { type: "HANDLE_ALL_VISITS", payload: data };
}
export function handleAllOrders(data) {
  return { type: "HANDLE_ALL_ORDERS", payload: data };
}
export function handlePeriod(period) {
  return { type: "HANDLE_PERIOD", payload: period };
}
export function handleFetchByPeriod(catergory) {
  return async (dispatch) => {
    let salesByPeriod = [];
    let visitsByPeriod = [];
    let ordersByPeriod = [];
    let period = [];
    let date = new Date();
    let metadata = await $axios(
      `/historyData?year=${date.getFullYear()}&&month=${
        date.getMonth() + 1
      }&&day=${date.getDate()}`
    );
    let id = metadata.data[0] !== undefined ? metadata.data[0].number : 14;
    let data = await $axios(`/historyData`);
    let periodData = data.data;
    // console.log(periodData, "periodData");
    for (let i = id - 14; i <= id; i++) {
      let historySales = periodData[i] ? periodData[i].historySales : [0];
      let historyVisits = periodData[i] ? periodData[i].historyVisits : [0];
      let historyOrders = periodData[i] ? periodData[i].historyOrders : [0];
      let date = periodData[i]
        ? `${periodData[i].month}-${periodData[i].day}`
        : "00-00";
      period.push(date);
      salesByPeriod.push(parseInt(historySales));
      visitsByPeriod.push(parseInt(historyVisits));
      ordersByPeriod.push(parseInt(historyOrders));
    }
    dispatch(handlePeriod(period.splice(1, 14)));
    dispatch(handleSalesByPeriod(salesByPeriod));
    dispatch(handleVisitsByPeriod(visitsByPeriod));
    dispatch(handleOrdersByPeriod(ordersByPeriod));
    dispatch(handleAllSales(salesByPeriod[14] || "00"));
    dispatch(handleAllVisits(visitsByPeriod[14] || "00"));
    dispatch(handleAllOrders(ordersByPeriod[14] || "00"));
  };
}
