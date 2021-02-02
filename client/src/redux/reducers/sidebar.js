const initState = {
  isCollapsed: false,
};
export const sidebar = (state = initState, action) => {
  switch (action.type) {
    case "HANLDE_COLLAPSE":
      return {
        ...state,
        isCollapsed: action.payload,
      };
    default:
      return state;
  }
};
