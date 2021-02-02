import React, { useEffect } from "react";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  List,
  Typography,
  Modal,
  message,
  notification,
} from "antd";
import "./index.css";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import $axios from "@/axios/$axios";
import { handleFetchAllProduct } from "@/redux/actions/product";
import { handleForm, handleVerifyDialog } from "../../redux/actions/form";
import VerifyId from "../../components/verifyId";
import PageHeader from "../../components/pageHeader";
import Logo from "../../components/logo";
import { isMobile } from "react-device-detect";

const { confirm } = Modal;
const { Paragraph } = Typography;
const ProductPage = (props) => {
  useEffect(() => {
    props.handleForm(null);
  }, []);

  const showConfirm = (index) => {
    if (!props.isVerified) {
      props.handleVerifyDialog(true);
      return;
    }
    let { allProducts } = props;
    let { handleFetchAllProduct } = props;
    confirm({
      title: "是否删除此商品",
      icon: <ExclamationCircleOutlined />,
      content: "删除之后，商品的购买链接将会失效，之前所有的销售数据仍会保留",
      okText: "确认",
      okType: "danger",
      cancelText: "取消",
      onOk() {
        return $axios
          .post(`/product/delete/${allProducts[index - 1]._id}`)
          .then((results) => {
            message.success("删除成功");
            handleFetchAllProduct();
          })
          .catch(() => {
            message.error("删除失败");
          });
      },
      onCancel() {},
    });
  };
  const openNotification = (title,desc) => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button
        type="primary"
        size="small"
        onClick={() => notification.close(key)}
      >
        确认
      </Button>
    );
    notification.open({
      message: title,
      description: desc,
      btn,
      key,
    });
  };
  const handleAddProduct = () => {
    if (
      props.alipay.appId === " " &&
      props.wechatPay.accountID === " " &&
      props.paypal.clientId === " "
    ) {
      openNotification("暂未配置支付信息", "用户将不能购买您的商品");
      props.history.push("/productAdd");
    } else if (props.email.mailPassword === " ") {
      openNotification("暂未配置邮箱信息", "用户将不能收到订单邮件和重置密码邮件");
      props.history.push("/productAdd");
    } else {
      props.history.push("/productAdd");
    }
  };

  return (
    <div className="product-page-container">
      <PageHeader title="商品设置" desc="在这里添加和编辑您的商品" />
      <VerifyId />
      <div
        className={"cardList"}
        style={isMobile ? { margin: "5px" } : { margin: "20px" }}
      >
        <List
          rowKey="id"
          grid={{
            gutter: 24,
            lg: 3,
            md: 2,
            sm: 1,
            xs: 1,
          }}
          dataSource={[{}, ...props.allProducts]}
          renderItem={(item, index) => {
            if (item && item._id) {
              return (
                <List.Item key={item._id}>
                  <Card
                    hoverable
                    className={"card"}
                    actions={[
                      <Link to={`/productAdd/${index}`} key="edit">
                        编辑
                      </Link>,
                      <a
                        key="delete"
                        onClick={() => {
                          showConfirm(index);
                        }}
                      >
                        删除
                      </a>,
                      <Link
                        to={`/product/${
                          props.allProducts[index - 1].productId
                        }`}
                        key="check"
                        target="_blank"
                      >
                        查看
                      </Link>,
                    ]}
                  >
                    <Card.Meta
                      avatar={<Logo productId={item._id} url={item.logo} />}
                      title={<a href="/#">{item.productName}</a>}
                      description={
                        <Paragraph
                          className={"item"}
                          ellipsis={{
                            rows: 3,
                          }}
                        >
                          {item.productInfo}
                        </Paragraph>
                      }
                    />
                  </Card>
                </List.Item>
              );
            }

            return (
              <List.Item>
                <Button
                  type="dashed"
                  className={"newButton"}
                  style={{ fontSize: "15px", height: "200px" }}
                  onClick={handleAddProduct}
                >
                  <PlusOutlined /> 新增商品
                </Button>
              </List.Item>
            );
          }}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    allProducts: state.product.allProducts,
    alipay: state.form.alipay,
    wechatPay: state.form.wechatPay,
    paypal: state.form.paypal,
    email: state.form.email,
    isVerified: state.form.isVerified,
  };
};
const actionCreator = {
  handleFetchAllProduct,
  handleForm,
  handleVerifyDialog,
};
export default connect(mapStateToProps, actionCreator)(withRouter(ProductPage));
