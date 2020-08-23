import React, { useEffect, useState } from "react";
import "./index.css";
import ProductInfo from "../../components/productInfo";
import Contact from "../../components/contact";
import Query from "../../components/queryDialog";
import { CloseOutlined } from "@ant-design/icons";
const MobilePage = (props) => {
  const [showContact, setShowContact] = useState(false);
  const [showQuery, setShowQuery] = useState(false);
  const addStyle = (url) => {
    const style = document.createElement("link");
    style.href = url;
    style.rel = "stylesheet";
    document.head.appendChild(style);
  };
  const handleContact = (bool) => {
    setShowContact(bool);
  };
  const handleQuery = (bool) => {
    setShowQuery(bool);
  };
  const { productInfo } = props;
  const date = new Date();
  useEffect(() => {
    const cssUrl = `/assets/css/${props.theme}.css`;
    addStyle(cssUrl);
  }, []);
  console.log(productInfo, "info");
  return (
    <div className="mobile-page-container">
      {showContact || showQuery ? (
        <CloseOutlined
          className="contact-close"
          onClick={() => {
            handleContact(false);
            handleQuery(false);
          }}
        />
      ) : null}

      <img src={`/assets/${props.theme}.svg`} alt="" className="mobile-bg" />
      <div
        className="contact-container-mask"
        style={showContact || showQuery ? {} : { display: "none" }}
      ></div>
      {showContact ? <Contact productInfo={productInfo} /> : null}
      {showQuery ? <Query /> : null}
      <div className="mobile-page-header">
        <h1 className="mobile-header-name">{productInfo.productName}</h1>
        <p className="mobile-header-info">{productInfo.productInfo}</p>
      </div>
      <div className="mobile-page-body-container">
        <div
          className="mobile-page-body"
          style={{ width: `${productInfo.memberLevel * 280}px` }}
        >
          <ProductInfo
            handleDialog={props.handleDialog}
            productInfo={productInfo}
          />
        </div>
      </div>

      <div className="mobile-page-footer">
        <div className="mobile-page-contact">
          <span
            className="mobile-footer-contact"
            onClick={() => {
              handleContact(true);
            }}
          >
            联系我们
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span
            className="mobile-footer-query"
            onClick={() => {
              handleQuery(true);
            }}
          >
            查询订单
          </span>
        </div>
        <div className="mobile-page-copyright">
          <p>
            <span>Supported by</span>
            <a
              href="https://github.com/troyeguo/coodo-pay"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Coodo Pay
            </a>
          </p>
          <p>
            Copyright © {date.getFullYear()}
            <a
              href="https://github.com/troyeguo"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              App by Troye
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobilePage;
