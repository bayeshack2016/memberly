import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { login } from "./reducers/login";
import { sidebar } from "./reducers/sidebar";
import { weekData } from "./reducers/weekData";
import { monthData } from "./reducers/monthData";
import { yearData } from "./reducers/yearData";
import { periodData } from "./reducers/periodData";
import { product } from "./reducers/product";
import { form } from "./reducers/form";
import { combineReducers } from "redux";
const reducers = combineReducers({
  login,
  sidebar,
  weekData,
  monthData,
  yearData,
  periodData,
  form,
  product,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  process.env.NODE_ENV === "development"
    ? composeEnhancers(applyMiddleware(thunk))
    : composeEnhancers(applyMiddleware(thunk))
);
export default store;
