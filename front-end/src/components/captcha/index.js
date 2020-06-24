import React, { useEffect } from "react";
import "./index.css";
const Captcha = (props) => {
  useEffect(() => {
    window
      .vaptcha({
        vid: "5eac198c33cb1801abf079ab", // 验证单元id
        type: "click", // 显示类型 点击式
        scene: 0, // 场景值 默认0
        container: "#vaptchaContainer", // 容器，可为Element 或者 selector
        offline_server: "", //离线模式服务端地址，若尚未配置离线模式，请填写任意地址即可。
        //可选参数
        // lang: 'zh-CN', // 语言 默认zh-CN,可选值zh-CN,en,zh-TW,jp
        // https: true, // 使用https 默认 true
        //style: 'dark' //按钮样式 默认dark，可选值 dark,light
        //color: '#57ABFF' //按钮颜色 默认值#57ABFF
      })
      .then((vaptchaObj) => {
        vaptchaObj.render(); // 调用验证实例 vpObj 的 render 方法加载验证按钮
        //获取token的方式一：
        //vaptchaObj.renderTokenInput('.login-form')//以form的方式提交数据时，使用此函数向表单添加token值
        //获取token的方式二：
        vaptchaObj.listen("pass", () => {
          // 验证成功进行后续操作
          props.handleQuery();
        });
        //关闭验证弹窗时触发
        vaptchaObj.listen("close", function () {
          //验证弹窗关闭触发
        });
      });
  });
  return (
    <div
      id="vaptchaContainer"
      style={{ width: 200, height: 36, marginLeft: 150 }}
    >
      <div className="vaptcha-init-main">
        <div className="vaptcha-init-loading">
          <a href="/" target="_blank">
            <img
              src="https://r.vaptcha.net/public/img/vaptcha-loading.gif"
              alt="loading"
            />
          </a>
          <span className="vaptcha-text">Vaptcha启动中...</span>
        </div>
      </div>
    </div>
  );
};

export default Captcha;
