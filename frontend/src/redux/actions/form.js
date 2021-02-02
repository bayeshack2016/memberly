import $axios from "@/axios/$axios";
import axios from "axios";
import { message } from "antd";

export const handleForm = (data) => {
  return {
    type: "HANDLE_FORM_DATA",
    payload: data,
  };
};
export const handleAlipay = (data) => {
  return {
    type: "HANDLE_ALIPAY",
    payload: data,
  };
};
export const handleWechatPay = (data) => {
  return {
    type: "HANDLE_WECHAT_PAY",
    payload: data,
  };
};
export const handlePaypal = (data) => {
  return {
    type: "HANDLE_PAYPAL",
    payload: data,
  };
};
export const handleEmail = (data) => {
  return {
    type: "HANDLE_EMAIL",
    payload: data,
  };
};
export const handleUser = (data) => {
  return {
    type: "HANDLE_USER",
    payload: data,
  };
};
export const handleCustomer = (data) => {
  return {
    type: "HANDLE_CUSTOMER",
    payload: data,
  };
};
export const handleOrder = (data) => {
  return {
    type: "HANDLE_ORDER",
    payload: data,
  };
};
export const handleDisaccount = (data) => {
  return {
    type: "HANDLE_DISACCOUNT",
    payload: data,
  };
};
export const handleVerify = (data) => {
  return {
    type: "HANDLE_VERIFY",
    payload: data,
  };
};
export const handleVerifyDialog = (data) => {
  return {
    type: "HANDLE_VERIFY_DIALOG",
    payload: data,
  };
};
export const handleFetchOrder = () => {
  return async (dispatch) => {
    const metadata = await $axios.get(
      `/order/all?year=${new Date().getFullYear()}`
    );
    dispatch(handleOrder(metadata.data));
  };
};
export const handleFetchDisaccount = () => {
  return async (dispatch) => {
    const metadata = await $axios.get("/disaccount/all");
    dispatch(handleDisaccount(metadata.data));
  };
};
export const handleFetchForm = () => {
  return (dispatch) => {
    axios
      .all([
        $axios(`/alipay`),
        $axios(`/wechatPay`),
        $axios(`/paypal`),
        $axios(`/email`),
        $axios(`/user`),
        $axios(`/customer`),
      ])
      .then((responseArr) => {
        dispatch(handleAlipay(responseArr[0].data));
        dispatch(handleWechatPay(responseArr[1].data));
        dispatch(handlePaypal(responseArr[2].data));
        dispatch(handleEmail(responseArr[3].data));
        dispatch(handleUser(responseArr[4].data));
        dispatch(handleCustomer(responseArr[5].data));
      })
      .catch((error) => {
        if (error.response) {
          const status = error.response.status;
          if (!status) {
            message.error("获取数据出错");
            return;
          }
          if (status === 403) {
            message.warning("身份凭证失效");
          } else {
            message.error("获取数据失败");
          }
        } else {
          message.error("获取数据超时");
        }
      });
  };
};
