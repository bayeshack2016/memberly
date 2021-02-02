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
    let data = await $axios(`/historyData`);
    let periodData = data.data;
    for (let i = 0; i < periodData.length; i++) {
      period.push(`${periodData[i].month}-${periodData[i].day}`);
      salesByPeriod.push(parseInt(periodData[i].historySales));
      visitsByPeriod.push(parseInt(periodData[i].historyVisits));
      ordersByPeriod.push(parseInt(periodData[i].historyOrders));
    }
    dispatch(handlePeriod(period.splice(1, period.length)));
    dispatch(handleSalesByPeriod(salesByPeriod));
    dispatch(handleVisitsByPeriod(visitsByPeriod));
    dispatch(handleOrdersByPeriod(ordersByPeriod));
    dispatch(handleAllSales(salesByPeriod[salesByPeriod.length - 1] || "0"));
    dispatch(handleAllVisits(visitsByPeriod[visitsByPeriod.length - 1] || "0"));
    dispatch(handleAllOrders(ordersByPeriod[ordersByPeriod.length - 1] || "0"));
  };
}
