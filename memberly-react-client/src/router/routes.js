import Dashboard from "../pages/dashboard";
import ProductPage from "../pages/productPage";
import AddProduct from "../pages/addProduct";
import OrderPage from "../pages/orderPage";
import DiscountPage from "../pages/discountPage";
import AccountPage from "../pages/accountPage";
import CustomerPage from "../pages/customerPage";
import Error404 from "../pages/errorPage/error404";
import Error500 from "../pages/errorPage/error500";

export const routes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/productList", component: ProductPage },
  { path: "/productAdd", component: AddProduct },
  { path: "/order", component: OrderPage },
  { path: "/discount", component: DiscountPage },
  { path: "/customer", component: CustomerPage },
  { path: "/account", component: AccountPage },
  { path: "/error/404", component: Error404 },
  { path: "/error/500", component: Error500 },
];
