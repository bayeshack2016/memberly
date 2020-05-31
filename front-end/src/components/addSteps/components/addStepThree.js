import React, { Component } from "react";
import { Button, Result, Descriptions } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { handleFetchAllProduct } from "@/redux/actions/product.js";

class AddStepThree extends Component {
  constructor(props) {
    super(props);
    this.state = { mode: "add" };
  }
  UNSAFE_componentWillMount() {
    let url = document.location.toString();
    let idArr = url.split("/");
    let id = idArr[idArr.length - 1];
    this.host = url.split("#")[0];
    console.log(this.host);
    if (!isNaN(parseInt(id))) {
      this.setState({
        mode: "edit",
      });
      console.log(this.props.allProducts, this.props.allProducts[id - 1]);
      this.setState({ id: this.props.allProducts[id - 1]._id });
    }
  }
  getProductId = (id) => {
    const product = this.props.allProducts.filter((item) => {
      return item._id === id;
    });
    console.log(this.props.allProducts, product);
    return product[0].productId;
  };
  render() {
    const information = (
      <div className="information">
        <Descriptions column={1}>
          <Descriptions.Item label="产品名称">
            {this.props.formData.productName}
          </Descriptions.Item>
          <Descriptions.Item label="产品描述">
            {this.props.formData.productInfo}
          </Descriptions.Item>
          <Descriptions.Item label="产品链接">
            {`${this.host}#/product/${
              this.state.mode === "edit"
                ? this.getProductId(this.state.id)
                : this.props.allProducts[this.props.allProducts.length - 1]
                    .productId + 1
            }`}
          </Descriptions.Item>
        </Descriptions>
      </div>
    );
    const extra = (
      <div>
        <Link to="/productList">
          <Button type="primary">返回产品列表</Button>
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
  }
}
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
