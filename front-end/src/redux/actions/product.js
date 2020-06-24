import $axios from "@/axios/$axios";
import { message } from "antd";
export const handleProductInfo = (data) => {
  return {
    type: "HANLDE_PRODUCT_INFO",
    payload: data,
  };
};
export const handleAllProducts = (data) => {
  return {
    type: "HANLDE_ALL_PRODUCTS",
    payload: data,
  };
};
export const handleSetting = (data) => {
  return {
    type: "HANLDE_SETTING",
    payload: data,
  };
};
export const handleFetchProductInfo = (productId) => {
  return async (dispatch) => {
    $axios
      .get(`/product/${productId}`)
      .then((res) => {
        let productInfo = res.data;
        dispatch(handleProductInfo(productInfo));
      })
      .catch(() => {
        dispatch(handleProductInfo(404));
        message.error("商品信息不存在");
      });
  };
};
export const handleFetchAllProduct = () => {
  return async (dispatch) => {
    $axios
      .get(`/product/all`)
      .then((res) => {
        console.log(res.data, "metadata");
        let allProducts = res.data || [];
        dispatch(handleAllProducts(allProducts));
      })
      .catch(() => {
        message.error("获取商品信息失败");
      });
  };
};
export const handleFetchSetting = () => {
  return async (dispatch) => {
    let metadata = await $axios.get(`/setting/`);
    let setting = metadata.data || null;
    dispatch(handleSetting(setting));
  };
};
