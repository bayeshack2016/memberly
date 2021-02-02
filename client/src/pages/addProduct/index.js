import React, { useState, useEffect } from "react";
import { Card, Steps, Row, message } from "antd";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import AddSteps from "@/components/addSteps";
import $axios from "@/axios/$axios";
import "./index.css";
import { connect } from "react-redux";
import { handleFetchAllProduct } from "@/redux/actions/product";
import { parseFormData } from "../../utils/productUtil";
import { isMobile } from "react-device-detect";

const { Step } = Steps;
const AddProduct = (props) => {
  const [current, setCurrent] = useState(0);
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
  const next = () => {
    if (mode === "add") {
      //添加商品时走这条分支
      if (current === 0) {
        setCurrent(current + 1);
      } else {
        $axios
          .post(
            "/product",
            parseFormData(
              props.formData,
              props.allProducts.length !== 0
                ? props.allProducts[props.allProducts.length - 1].productId + 1
                : 1
            )
          )
          .then((results) => {
            setCurrent(current + 1);
          })
          .catch((err) => {
            message.error("添加失败");
          });
      }
    } else {
      //编辑商品时走这条分支
      if (current === 0) {
        setCurrent(current + 1);
      } else {
        $axios
          .post(
            `/product/update/${id}`,
            parseFormData(props.formData, getProductId(id))
          )
          .then((results) => {
            setCurrent(current + 1);
          })
          .catch((err) => {
            message.error("添加失败");
          });
      }
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const getProductId = (id) => {
    const product = props.allProducts.filter((item) => {
      return item._id === id;
    });
    return product[0].productId;
  };
  return (
    <div className="product-add-page">
      <Link to="/productList">
        <span
          className="product-add-return"
          onClick={() => {
            props.handleFetchAllProduct();
          }}
        >
          <ArrowLeftOutlined />
          &nbsp; 返回商品列表
        </span>
      </Link>

      <div className="product-add-header">
        <p style={{ fontSize: "20px", fontWeight: "500", marginTop: "30px" }}>
          {mode === "add" ? " 添加商品" : "编辑商品"}
        </p>
        <p style={{ lineHeight: "50px", fontSize: "15px" }}>
          编辑或添加您的商品
        </p>
        <div className={"extraImg"}>
          <img
            alt="这是一个标题"
            src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
          />
        </div>
      </div>
      <Card
        bordered={false}
        style={isMobile ? { margin: "5px" } : { margin: "20px" }}
      >
        <Row justify="center">
          <Steps current={current}>
            <Step key="1" title="填写商品信息"></Step>
            <Step key="2" title="确认商品信息"></Step>
            <Step key="3" title="完成"></Step>
          </Steps>
        </Row>
        <AddSteps currentStep={current} next={next} prev={prev} />
      </Card>
    </div>
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
export default connect(mapStateToProps, actionCreator)(AddProduct);
