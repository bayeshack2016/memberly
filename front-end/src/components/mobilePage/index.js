import React, { useEffect } from "react";
import "./index.css";

const MobilePage = (props) => {
  const addStyle = (url) => {
    const style = document.createElement("link");
    style.href = url;
    style.rel = "stylesheet";
    style.async = true;
    document.head.appendChild(style);
  };
  const { productInfo } = props;
  useEffect(() => {
    console.log(props.theme, " props.theme");
    const cssUrl =
      props.theme === "default"
        ? "/assets/css/default.css"
        : "/assets/css/tech.css";
    addStyle(cssUrl);
  }, []);
  return (
    <div
      className="mobile-page-container"
      style={{ height: window.screen.height }}
    >
      <img
        src={`/assets/${props.theme === "default" ? "default" : "tech"}.svg`}
        alt=""
        className="mobile-bg"
      />

      <div className="mobile-warning">
        <div
          style={
            props.theme === "default"
              ? { color: "rgba(72, 72, 72, 1)" }
              : { color: "white" }
          }
        >
          <div style={{ fontSize: 30, margin: 20, fontWeight: 500 }}>
            {productInfo.productName}
          </div>
          <div
            style={{
              fontSize: "calc(0.2rem + 1em)",
              margin: 20,
              fontWeight: 500,
            }}
          >
            移动端暂未开发
          </div>
          <div style={{ width: "70vw" }}>
            <div style={{ opacity: 0.8 }}>
              为了更好的用户体验，请使用电脑端访问，给您带来的不便敬请谅解
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePage;
