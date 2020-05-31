import React, { Component } from "react";
import { Card, Steps, Row, message } from "antd";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import AddSteps from "@/components/addSteps";
import $axios from "@/axios/$axios";
import "./index.css";
import { connect } from "react-redux";
import { handleFetchAllProduct } from "@/redux/actions/product";
import { parseFormData } from "../../utils/productUtil";
const { Step } = Steps;

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = { current: 0, mode: "add", id: null };
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
  }
  UNSAFE_componentWillMount() {
    let url = document.location.toString();
    let idArr = url.split("/");
    let id = idArr[idArr.length - 1];
    if (!isNaN(parseInt(id))) {
      this.setState({
        mode: "edit",
      });
      console.log(this.props.allProducts, this.props.allProducts[id - 1]);
      this.setState({ id: this.props.allProducts[id - 1]._id });
    }
  }
  next() {
    if (this.state.mode === "add") {
      //添加商品时走这条分支
      const current = this.state.current + 1;
      if (current === 1) {
        this.setState({ current: current });
      } else {
        $axios
          .post(
            "/product",
            parseFormData(
              this.props.formData,
              this.props.allProducts.length !== 0
                ? this.props.allProducts[this.props.allProducts.length - 1]
                    .productId + 1
                : 1
            )
          )
          .then(async (results) => {
            await this.props.handleFetchAllProduct();
            this.setState({ current: current });
          })
          .catch((err) => {
            message.error("添加失败");
          });
      }
    } else {
      //编辑商品时走这条分支

      const current = this.state.current + 1;
      if (current === 1) {
        this.setState({ current: current });
      } else {
        $axios
          .post(
            `/product/${this.state.id}`,
            parseFormData(this.props.formData, this.getProductId(this.state.id))
          )
          .then(async (results) => {
            await this.props.handleFetchAllProduct();
            this.setState({ current: current });
          })
          .catch((err) => {
            message.error("添加失败");
          });
      }
    }
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  getProductId = (id) => {
    const product = this.props.allProducts.filter((item) => {
      return item._id === id;
    });
    console.log(this.props.allProducts, product);
    return product[0].productId;
  };
  render() {
    const { current } = this.state;
    return (
      <div className="product-add-page">
        <Link to="/productList">
          <span className="product-add-return">
            <ArrowLeftOutlined />
            &nbsp; 返回产品列表
          </span>
        </Link>

        <div className="product-add-header">
          <p style={{ fontSize: "20px", fontWeight: "500", marginTop: "30px" }}>
            {this.state.mode === "add" ? " 添加产品" : "编辑产品"}
          </p>
          <p style={{ lineHeight: "50px", fontSize: "15px" }}>
            将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。
          </p>
          <div className={"extraImg"}>
            <img
              alt="这是一个标题"
              src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
            />
          </div>
        </div>
        <Card bordered={false} style={{ margin: "20px" }}>
          <Row justify="center">
            <Steps current={current}>
              <Step key="1" title="填写产品信息"></Step>
              <Step key="2" title="确认产品信息"></Step>
              <Step key="3" title="完成"></Step>
            </Steps>
          </Row>
          <AddSteps
            currentStep={this.state.current}
            next={this.next}
            prev={this.prev}
          />
        </Card>
      </div>
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
export default connect(mapStateToProps, actionCreator)(AddProduct);
