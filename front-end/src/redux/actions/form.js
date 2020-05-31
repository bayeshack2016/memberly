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
export const handleFetchForm = () => {
  return (dispatch) => {
    axios
      .all([
        $axios(`/alipay`),
        $axios(`/wechatPay`),
        $axios(`/paypal`),
        $axios(`/email`),
        $axios(`/user`),
      ])
      .then((responseArr) => {
        //this will be executed only when all requests are complete
        // console.log(responseArr);
        dispatch(handleAlipay(responseArr[0].data));
        dispatch(handleWechatPay(responseArr[1].data));
        dispatch(handlePaypal(responseArr[2].data));
        dispatch(handleEmail(responseArr[3].data));
        dispatch(handleUser(responseArr[4].data));
      })
      .catch(() => {
        message.error("获取数据失败");
      });
  };
};
