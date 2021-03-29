import $axios from "../../axios/$axios";
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
export const handleDiscount = (data) => {
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
export const handleFetchOrder = (uid) => {
  return async (dispatch) => {
    const metadata = await $axios.get(
      `/order/all?year=${new Date().getFullYear()}&uid=${uid}`
    );
    dispatch(handleOrder(metadata.data));
  };
};
export const handleFetchDiscount = (uid) => {
  return async (dispatch) => {
    const metadata = await $axios.post(`/discount/fetch`, { uid });
    dispatch(handleDiscount(metadata.data));
  };
};
export const handleFetchForm = (uid) => {
  return (dispatch) => {
    axios
      .all([
        $axios.post(`/alipay/fetch`, { uid }),
        $axios.post(`/paypal/fetch`, { uid }),
        $axios.post(`/email/fetch`, { uid }),
        $axios.post(`/user/fetch`, { uid }),
        $axios.post(`/customer/fetch`, { uid }),
      ])
      .then((responseArr) => {
        dispatch(handleAlipay(responseArr[0].data));
        dispatch(handlePaypal(responseArr[1].data));
        dispatch(handleEmail(responseArr[2].data));
        dispatch(handleUser(responseArr[3].data));
        dispatch(handleCustomer(responseArr[4].data));
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
