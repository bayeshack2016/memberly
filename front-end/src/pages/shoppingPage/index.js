import React, { useState, useEffect } from "react";
import "./index.css";
import { CheckOutlined } from "@ant-design/icons";
import Contact from "../../components/contact";
import Query from "../../components/queryDialog";
import { message } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const ShoppingPage = (props) => {
  const [showContact, setShowContact] = useState(false);
  const [showQuery, setShowQuery] = useState(false);
  useEffect(() => {
    const cssUrl =
      props.theme === "default"
        ? "/assets/css/default.css"
        : "/assets/css/tech.css";
    addStyle(cssUrl);
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
  const renderLevelDesc = (desc) => {
    return desc.map((item, index) => {
      return (
        <li key={index}>
          <span>{item}</span>
          <CheckOutlined style={{ float: "right", lineHeight: "30px" }} />
        </li>
      );
    });
  };
  const renderProductInfo = (product) => {
    let arr = [];
    for (let i = 0; i < product.memberLevel; i++) {
      arr.push({
        levelName: product.levelName[i],
        levelPrice: product.levelPrice[i],
        levelDesc: product.levelDesc[i],
        levelLimit: product.levelLimit[i],
        levelNote: product.levelNote[i],
      });
    }
    return arr.map((item, index) => {
      return (
        <div
          className={`default-level-container level-theme${index}`}
          key={index}
        >
          {item.levelLimit ? (
            <div className="default-remain">
              <span className="default-remain-amount">{item.levelLimit}</span>
              <span className="default-remain-text">
                剩余
                <br />
                名额
              </span>
              <img
                className="default-remain-bg"
                src="/assets/remain.svg"
                alt=""
              />
            </div>
          ) : null}
          {item.note ? (
            <div className="default-remain">
              <span>{item.note}</span>
            </div>
          ) : null}
          <ul>
            <li className="default-theme-level-name">{item.levelName}</li>
            <li className="default-theme-level-price">
              <span style={{ fontSize: "25px", opacity: "0.6" }}>￥</span>
              <span style={{ fontSize: "50px" }}>{item.levelPrice.price}</span>
              <span style={{ fontSize: "20px" }}>/{item.levelPrice.unit}</span>
            </li>
            <li className="default-theme-level-note">{item.levelNote}</li>
            <li className="default-theme-level-desc">
              <ul>{renderLevelDesc(item.levelDesc)}</ul>
            </li>
            <li
              className="default-theme-level-payment"
              onClick={() => {
                if ((item.levelLimit = 0)) {
                  message.warning("该商品已售罄");
                  return;
                }
                props.handleDialog(true, item);
              }}
            >
              选择方案
            </li>
          </ul>
        </div>
      );
    });
  };
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
          style={showContact || showQuery ? {} : { display: "none" }}
        ></div>
        <img
          src={`/assets/${props.theme === "default" ? "default" : "tech"}.svg`}
          alt=""
          className="default-bg"
        />
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
        <div className="default-body">{renderProductInfo(productInfo)}</div>
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
