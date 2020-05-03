const initState = {
  productInfo: null,
  allProducts: null,
  setting: null,
};
export const product = (state = initState, action) => {
  switch (action.type) {
    case "HANLDE_PRODUCT_INFO":
      return {
        ...state,
        productInfo: action.payload,
      };
    case "HANLDE_ALL_PRODUCTS":
      return {
        ...state,
        allProducts: action.payload,
      };
    case "HANLDE_SETTING":
      return {
        ...state,
        setting: action.payload,
      };
    default:
      return state;
  }
};
