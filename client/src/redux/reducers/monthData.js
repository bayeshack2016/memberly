const initState = {
  salesByMonth: null,
  visitsByMonth: null,
  ordersByMonth: null,
};
export function monthData(state = initState, action) {
  switch (action.type) {
    case "HANDLE_SALES_BY_MONTH":
      return {
        ...state,
        salesByMonth: action.payload,
      };
    case "HANDLE_VISITS_BY_MONTH":
      return {
        ...state,
        visitsByMonth: action.payload,
      };
    case "HANDLE_ORDERS_BY_MONTH":
      return {
        ...state,
        ordersByMonth: action.payload,
      };
    default:
      return state;
  }
}
