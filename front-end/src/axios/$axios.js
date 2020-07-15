import axios from "axios";
import { message } from "antd";
import { devHost, prodHost } from "../config";
let number = 0;
const $axios = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? `${devHost}/api`
      : `${prodHost}/api`,
  timeout: 15000,
  retry: 4,
  retryDelay: 1000,
});

//请求拦截
$axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // 通过reudx的store拿到拿到全局状态树的token ，添加到请求报文，后台会根据该报文返回status
    // 此处应根据具体业务写token
    // const token = store.getState().user.token || localStorage.getItem('token');
    const token = localStorage.getItem("jwt");
    config.headers = { Authorization: `Bearer ${token}` };

    return config;
  },
  function (error) {
    // 对请求错误做些什么
    message.error(error.response.data.message);
    return Promise.reject(error);
  }
);

// 添加响应拦截器
$axios.interceptors.response.use(
  function (response) {
    //获取更新的token
    const { authorization } = response.headers;
    //如果token存在则存在localStorage
    authorization && localStorage.setItem("tokenName", authorization);
    return response;
  },
  function (error) {
    if (error.response) {
      const { status } = error.response;
      //如果401或405则到登录页
      if (status === 401 || status === 405) {
        // history.push("/login");
        //解决多次提示重新登陆的问题
        if (number === 1) {
          return;
        }
        localStorage.removeItem("jwt");
        message.warning("请重新登陆");
        number++;
        window.location.reload();
      }
    }
    return Promise.reject(error);
  }
);

export default $axios;
