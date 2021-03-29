import React from "react";
import { message } from "antd";
import { CheckOutlined } from "@ant-design/icons";
const ProductInfo = (props) => {
  let arr = [];
  const renderLevelDesc = (desc) => {
    return desc.map((item, index) => {
      return (
        <li key={index}>
          <span>{item}</span>
          <CheckOutlined
            className="level-desc-check"
            style={{ float: "right", lineHeight: "30px" }}
          />
        </li>
      );
    });
  };
  for (let i = 0; i < props.productInfo.memberLevel; i++) {
    arr.push({
      levelName: props.productInfo.levelName[i],
      levelPrice: props.productInfo.levelPrice[i],
      levelDesc: props.productInfo.levelDesc[i],
      levelLimit: props.productInfo.levelLimit[i],
      levelNote: props.productInfo.levelNote[i],
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
export default ProductInfo;
