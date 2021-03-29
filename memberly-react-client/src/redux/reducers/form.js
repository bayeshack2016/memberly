const initState = {
  formData: null,
  alipay: null,
  paypal: null,
  email: null,
  user: null,
  isVerified: false,
  isShowDialog: false,
  order: null,
  discount: null,
  customer: null,
};
export const form = (state = initState, action) => {
  switch (action.type) {
    case "HANDLE_FORM_DATA":
      return { ...state, formData: action.payload };
    case "HANDLE_ALIPAY":
      return { ...state, alipay: action.payload };
    case "HANDLE_PAYPAL":
      return { ...state, paypal: action.payload };
    case "HANDLE_EMAIL":
      return { ...state, email: action.payload };
    case "HANDLE_USER":
      return { ...state, user: action.payload };
    case "HANDLE_CUSTOMER":
      return { ...state, customer: action.payload };
    case "HANDLE_VERIFY":
      return { ...state, isVerified: action.payload };
    case "HANDLE_ORDER":
      return { ...state, order: action.payload };
    case "HANDLE_DISACCOUNT":
      return { ...state, discount: action.payload };
    case "HANDLE_VERIFY_DIALOG":
      return { ...state, isShowDialog: action.payload };
    default:
      return state;
  }
};
