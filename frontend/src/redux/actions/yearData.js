import $axios from "@/axios/$axios";
export function handleSalesByYear(salesByYear) {
  return { type: "HANDLE_SALES_BY_YEAR", payload: salesByYear };
}
export function handleVisitsByYear(visitsByYear) {
  return { type: "HANDLE_VISITS_BY_YEAR", payload: visitsByYear };
}
export function handleOrdersByYear(ordersByYear) {
  return { type: "HANDLE_ORDERS_BY_YEAR", payload: ordersByYear };
}

export function handleFetchByYear(catergory) {
  return async (dispatch) => {
    let salesByYear = [];
    let visitsByYear = [];
    let ordersByYear = [];
    let date = new Date();
    let metadata = await $axios.get(`/todayData?year=${date.getFullYear()}`);
    let yearData = metadata.data;
    for (let i = 1; i <= 12; i++) {
      let monthData = [];
      yearData.forEach((item) => {
        if (item.month === i) {
          monthData.push(item);
        }
      });
      let sales = 0;
      let visits = 0;
      let orders = 0;
      if (monthData) {
        monthData.forEach((item) => {
          sales += parseFloat(item.sales);
        });

        monthData.forEach((item) => {
          visits += parseFloat(item.visits);
        });

        monthData.forEach((item) => {
          orders += parseFloat(item.orders);
        });
      }

      salesByYear.push(parseInt(sales));
      visitsByYear.push(parseInt(visits));
      ordersByYear.push(parseInt(orders));
    }
    dispatch(handleSalesByYear(salesByYear));
    dispatch(handleVisitsByYear(visitsByYear));
    dispatch(handleOrdersByYear(ordersByYear));
  };
}
