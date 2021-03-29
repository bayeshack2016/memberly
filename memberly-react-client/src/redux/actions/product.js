import $axios from "../../axios/$axios";
import { message, Modal } from "antd";
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
export const handleFetchProductInfo = (productId, uid) => {
  return async (dispatch) => {
    $axios
      .post(`/product/fetch`, { productId, uid })
      .then((res) => {
        let productInfo = res.data;
        dispatch(handleProductInfo(productInfo));
      })
      .catch(() => {
        dispatch(handleProductInfo(null));
        message.error("商品信息不存在");
      });
  };
};
export const handleFetchAllProduct = (uid) => {
  return async (dispatch) => {
    $axios
      .post(`/product/all`, { uid })
      .then((res) => {
        let allProducts = res.data || [];
        dispatch(handleAllProducts(allProducts));
      })
      .catch((error) => {
        if (error.response) {
          const status = error.response.status;
          if (!status) {
            message.error("获取数据出错");
            return;
          }
          if (status === 403) {
            Modal.warning({
              title: "登录过期",
              content: "请重新登录",
            });
          } else {
            message.error("获取商品信息失败");
          }
        } else {
          message.error("获取数据超时");
        }
      });
  };
};
export const handleFetchSetting = (uid) => {
  return async (dispatch) => {
    let metadata = await $axios.post(`/setting/fetch`, { uid });
    let setting = metadata.data || null;
    dispatch(handleSetting(setting));
  };
};
