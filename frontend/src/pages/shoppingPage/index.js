import React, { useState, useEffect } from "react";
import "./index.css";
import Contact from "../../components/contact";
import Query from "../../components/queryDialog";
import ProductInfo from "../../components/productInfo";
import { CloseOutlined } from "@ant-design/icons";

const ShoppingPage = (props) => {
  const [showContact, setShowContact] = useState(false);
  const [showQuery, setShowQuery] = useState(false);
  useEffect(() => {
    const cssUrl = `/assets/css/${props.theme}.css`;
    addStyle(cssUrl);
    document.title = productInfo.productName + "   " + productInfo.productInfo;
    var link = document.querySelector("link[rel~='icon']");
    if (productInfo.logo) link.href = productInfo.logo;
  }, []);

  const addStyle = (url) => {
    const style = document.createElement("link");
    style.href = url;
    style.rel = "stylesheet";
    // style.async = true;
    document.head.appendChild(style);
  };
  const handleContact = (bool) => {
    setShowContact(bool);
  };
  const handleQuery = (bool) => {
    setShowQuery(bool);
  };
  const date = new Date();
  const { productInfo } = props;

  return (
    <div className="default-theme-container">
      {showContact || showQuery ? (
        <CloseOutlined
          className="contact-close"
          onClick={() => {
            handleContact(false);
            handleQuery(false);
          }}
        />
      ) : null}

      {showContact ? <Contact productInfo={productInfo} /> : null}
      {showQuery ? <Query /> : null}
      <div
        style={
          showContact
            ? {
                position: "fixed",
                width: "calc(100% - 17px)",
              }
            : {}
        }
      >
        <div
          className="contact-container-mask"
          style={
            showContact || showQuery || props.showDialog
              ? {}
              : { display: "none" }
          }
        ></div>
        {(props.theme === "default" ||
          props.theme === "tech" ||
          props.theme === "nostagic" ||
          props.theme === "blur" ||
          props.theme === "blue_white") && (
          <img
            src={`/assets/theme/${props.theme}.svg`}
            alt=""
            className="default-bg"
          />
        )}

        <div className="default-header">
          {productInfo.logo ? (
            <img
              src={productInfo.logo}
              alt=""
              className="default-header-logo"
            />
          ) : null}
          <span className="default-header-name">{productInfo.productName}</span>
          <span className="default-header-info">{productInfo.productInfo}</span>

          <span
            className="default-header-contact"
            onClick={() => {
              handleContact(true);
            }}
          >
            联系我们
          </span>

          <span
            className="default-header-query"
            onClick={() => {
              handleQuery(true);
            }}
          >
            查询订单
          </span>
        </div>
        <p className="default-choose-title">选择您需要的会员方案</p>
        <div className="default-body">
          <ProductInfo
            handleDialog={props.handleDialog}
            productInfo={productInfo}
          />
        </div>
        <div className="default-footer">
          Supported by
          <a
            href="https://github.com/troyeguo/coodo-pay"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Coodo Pay
          </a>
          , Copyright © {date.getFullYear()}
          <a
            href="https://github.com/troyeguo"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            App by Troye
          </a>
        </div>
      </div>
    </div>
  );
};

export default ShoppingPage;
