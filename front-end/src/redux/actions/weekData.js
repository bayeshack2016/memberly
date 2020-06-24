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
    console.log(metadata, "metadata");
    let id = metadata.data[0] ? metadata.data[0].number : 0;
    let data = await $axios.get(`/salesData`);
    console.log(data, "data");
    let weekData = data.data;
    for (let i = id - ((date.getDay() + 6) % 7); i <= id; i++) {
      let sales = weekData[i] ? weekData[i].sales : 0;
      let visits = weekData[i] ? weekData[i].visits : 0;
      let orders = weekData[i] ? weekData[i].orders : 0;
      salesByWeek.push(parseInt(sales));
      visitsByWeek.push(parseInt(visits));
      ordersByWeek.push(parseInt(orders));
    }
    // console.log(salesByWeek);
    dispatch(handleSalesByWeek(salesByWeek));
    dispatch(handleVisitsByWeek(visitsByWeek));
    dispatch(handleOrdersByWeek(ordersByWeek));
  };
}
