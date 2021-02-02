const initState = {
  salesByYear: null,
  visitsByYear: null,
  ordersByYear: null,
};
export function yearData(state = initState, action) {
  switch (action.type) {
    case "HANDLE_SALES_BY_YEAR":
      return {
        ...state,
        salesByYear: action.payload,
      };
    case "HANDLE_VISITS_BY_YEAR":
      return {
        ...state,
        visitsByYear: action.payload,
      };
    case "HANDLE_ORDERS_BY_YEAR":
      return {
        ...state,
        ordersByYear: action.payload,
      };
    default:
      return state;
  }
}
