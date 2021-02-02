import React, { useState, useEffect } from "react";
import { Button, Result, Descriptions, message } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { handleFetchAllProduct } from "@/redux/actions/product.js";
const copy = require("copy-text-to-clipboard");

const AddStepThree = (props) => {
  const [mode, setMode] = useState("add");
  const [id, setId] = useState(null);
  useEffect(() => {
    let url = document.location.toString();
    let idArr = url.split("/");
    let id = idArr[idArr.length - 1];
    if (!isNaN(parseInt(id))) {
      setMode("edit");
      setId(props.allProducts[id - 1]._id);
    }
  }, []);

  const handleCopy = (link) => {
    copy(link);
    message.success("复制链接到剪切板");
  };
  const getProductId = (id) => {
    const product = props.allProducts.filter((item) => {
      return item._id === id;
    });
    return product[0].productId;
  };
  const productLink = `${window.location.protocol}//${
    window.location.host
  }#/product/${
    mode === "edit"
      ? getProductId(id)
      : (props.allProducts[props.allProducts.length - 1]
          ? props.allProducts[props.allProducts.length - 1].productId
          : 0) + 1
  }`;
  const information = (
    <div className="information">
      <Descriptions column={1}>
        <Descriptions.Item label="商品名称">
          {props.formData.productName}
        </Descriptions.Item>
        <Descriptions.Item label="商品描述">
          {props.formData.productInfo}
        </Descriptions.Item>
        <Descriptions.Item label="商品链接">
          <a href={productLink} target="_blank" rel="noopener noreferrer">
            {productLink}
          </a>
          <Button
            onClick={() => {
              handleCopy(productLink);
            }}
            style={{ marginLeft: "20px" }}
          >
            点击复制
          </Button>
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
  const extra = (
    <div>
      <Link to="/productList">
        <Button
          type="primary"
          onClick={() => {
            props.handleFetchAllProduct();
          }}
        >
          返回商品列表
        </Button>
      </Link>
    </div>
  );
  return (
    <Result
      status="success"
      title="添加成功"
      subTitle=""
      extra={extra}
      className="result"
      style={{ marginTop: "20px", userSelect: "text" }}
    >
      {information}
    </Result>
  );
};

const mapStateToProps = (state) => {
  return {
    formData: state.form.formData,
    allProducts: state.product.allProducts,
  };
};
const actionCreator = {
  handleFetchAllProduct,
};

export default connect(mapStateToProps, actionCreator)(AddStepThree);
