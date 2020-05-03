const initState = {
  salesByPeriod: null,
  visitsByPeriod: null,
  ordersByPeriod: null,
  allSales: null,
  allVisits: null,
  allOrders: null,
  period: null,
};
export function periodData(state = initState, action) {
  switch (action.type) {
    case "HANDLE_SALES_BY_PERIOD":
      return {
        ...state,
        salesByPeriod: action.payload,
      };
    case "HANDLE_VISITS_BY_PERIOD":
      return {
        ...state,
        visitsByPeriod: action.payload,
      };
    case "HANDLE_ORDERS_BY_PERIOD":
      return {
        ...state,
        ordersByPeriod: action.payload,
      };
    case "HANDLE_ALL_SALES":
      return {
        ...state,
        allSales: action.payload,
      };
    case "HANDLE_ALL_VISITS":
      return {
        ...state,
        allVisits: action.payload,
      };
    case "HANDLE_ALL_ORDERS":
      return {
        ...state,
        allOrders: action.payload,
      };
    case "HANDLE_PERIOD":
      return {
        ...state,
        period: action.payload,
      };
    default:
      return state;
  }
}
