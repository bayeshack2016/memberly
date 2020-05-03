import $axios from "@/axios/$axios";

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
    let salesByWeek = [];
    let visitsByWeek = [];
    let ordersByWeek = [];
    let date = new Date();
    let metadata = await $axios({
      method: "get",
      url: `/salesData?year=${date.getFullYear()}&&month=${
        date.getMonth() + 1
      }&&day=${date.getDate()}`,
    });
    let id = metadata.data[0] ? metadata.data[0].number : 0;
    for (let i = id - ((date.getDay() + 6) % 7); i <= id; i++) {
      let metadata = await $axios({
        method: "get",
        url: `/salesData?number=${i}`,
      });
      let sales = metadata.data[0] !== undefined ? metadata.data[0].sales : 0;
      let visits = metadata.data[0] !== undefined ? metadata.data[0].visits : 0;
      let orders = metadata.data[0] !== undefined ? metadata.data[0].orders : 0;
      salesByWeek.push(parseInt(sales));
      visitsByWeek.push(parseInt(visits));
      ordersByWeek.push(parseInt(orders));
    }
    dispatch(handleSalesByWeek(salesByWeek));
    dispatch(handleVisitsByWeek(visitsByWeek));
    dispatch(handleOrdersByWeek(ordersByWeek));
  };
}
