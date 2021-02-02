const initState = {
  salesByWeek: null,
  visitsByWeek: null,
  ordersByWeek: null,
};
export function weekData(state = initState, action) {
  switch (action.type) {
    case "HANDLE_SALES_BY_WEEK":
      return {
        ...state,
        salesByWeek: action.payload,
      };
    case "HANDLE_VISITS_BY_WEEK":
      return {
        ...state,
        visitsByWeek: action.payload,
      };
    case "HANDLE_ORDERS_BY_WEEK":
      return {
        ...state,
        ordersByWeek: action.payload,
      };
    default:
      return state;
  }
}
