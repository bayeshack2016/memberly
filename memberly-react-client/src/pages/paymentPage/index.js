import React from "react";
import { Tabs } from "antd";
import { connect } from "react-redux";
import PaymentMethod from "../../components/paymentMethod";
import "./index.css";
const { TabPane } = Tabs;

const PaymentPage = (props) => {
  return (
    <div className="product-page-container">
      <div style={{ width: "100%" }}>
        <Tabs defaultActiveKey="1" centered={true} onChange={() => {}}>
          <TabPane tab="支付宝设置" key="1">
            <PaymentMethod
              formData={props.alipay}
              mode="alipay"
              name="支付宝"
              title="添加支付宝当面付"
            />
          </TabPane>
          <TabPane tab="Paypal设置" key="2">
            <PaymentMethod
              formData={props.paypal}
              mode="paypal"
              name="PayPal"
              title="添加PayPal"
            />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    alipay: state.form.alipay,
    paypal: state.form.paypal,
  };
};
const actionCreator = {
  // handleFetchForm
};
export default connect(mapStateToProps, actionCreator)(PaymentPage);
