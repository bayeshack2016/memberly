import React, { useState, useEffect } from "react";
import { Table, Button, Input, DatePicker, Badge, message } from "antd";
import moment from "moment";
import { connect } from "react-redux";
import $axios from "../../axios/$axios";
import { handleFetchOrder } from "../../redux/actions/form";
import { isMobile } from "react-device-detect";
const dateFormat = "YYYY-MM-DD";
const { Search } = Input;

const OrderPage = (props) => {
  const [data, setData] = useState(props.order);
  const [loading, setLoading] = useState(true);
  const [refundLoading, setRefundLoading] = useState(false);
  const [refundIndex, setRefundIndex] = useState(-1);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  useEffect(() => {
    if (props.order) {
      setLoading(false);
      setData(props.order);
    }
  }, [props.order]);
  const filterData = (date = {}) => {
    let filteredData = [];
    props.order.forEach((item) => {
      if (
        item.year === date.year &&
        item.month === date.month &&
        item.day === date.day
      ) {
        filteredData.push(item);
      }
    });
    setData(filteredData);
  };

  const onSelectedRowKeysChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };
  const handleSearch = (value) => {
    let searchResults = [];
    props.order.forEach((item) => {
      if (
        item.email === value ||
        item.orderId === value ||
        item.code === value
      ) {
        searchResults.push(item);
      }
    });
    setData(searchResults);
  };
  const handleReset = () => {
    setData(props.order);
    let inputBox = document.querySelector(".ant-input");
    inputBox.value = "";
  };
  const onDateChange = (date) => {
    date &&
      filterData({
        year: date._d.getFullYear(),
        month: date._d.getMonth() + 1,
        day: date._d.getDate(),
      });
  };
  const handleRefund = async (orderId, index, order) => {
    setRefundLoading(true);
    setRefundIndex(index);
    $axios
      .post(`/refund/${order.payment}`, {
        orderId,
        uid: order.uid,
        email: order.email,
      })
      .then((res) => {
        setRefundLoading(false);
        message.success("退款成功");
        props.handleFetchOrder(props.setting.uid);
        setRefundIndex(-1);
      })
      .catch((err) => {
        setRefundLoading(false);
        setRefundIndex(-1);
        console.log(err);
        message.error("退款失败");
      });
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectedRowKeysChange,
  };
  const columns = [
    {
      title: "退款操作",
      dataIndex: "orderId",
      key: "orderId",
      width: 100,
      render: (text, record, index) => (
        <Button
          type="primary"
          onClick={() => {
            handleRefund(record.orderId, index, record);
          }}
          size="small"
          loading={refundIndex === index && refundLoading}
          disabled={record.paymentStatus !== "已支付"}
        >
          退款
        </Button>
      ),
    },
    {
      title: "订单号",
      dataIndex: "orderId",
      key: "orderId",
      width: 180,
    },

    {
      title: "商品名称",
      key: "productName",
      dataIndex: "productName",
      width: 150,
    },
    {
      title: "商品等级",
      key: "levelName",
      dataIndex: "levelName",
      width: 100,
    },
    {
      title: "支付状态",
      key: "paymentStatus",
      dataIndex: "paymentStatus",
      width: 120,
      render: (paymentStatus) =>
        paymentStatus === "已支付" ? (
          <Badge status="success" text={paymentStatus} />
        ) : paymentStatus === "已退款" ? (
          <Badge status="error" text={paymentStatus} />
        ) : (
          <Badge status="warning" text={paymentStatus} />
        ),
    },
    {
      title: "兑换码",
      key: "code",
      dataIndex: "code",
      width: 220,
    },

    {
      title: "激活状态",
      key: "activation",
      dataIndex: "activation",
      width: 140,
      render: (activation) =>
        activation.length > 0 ? (
          <Badge status="success" text={"已激活"} />
        ) : (
          <Badge status="warning" text={"未激活"} />
        ),
    },
    {
      title: "激活次数",
      key: "activation",
      dataIndex: "activation",
      width: 100,
      render: (text, record, index) => (
        <p style={{ textAlign: "center" }}>
          {record.productType === 1 ? record.activation.length : "1"}
        </p>
      ),
    },
    {
      title: "创建日期",
      dataIndex: "date",
      key: "date",
      width: 140,
    },

    {
      title: "价格",
      dataIndex: "price",
      key: "price",
      width: 100,
      render: (price) => <span>{price}元</span>,
    },
    {
      title: "支付方式",
      dataIndex: "payment",
      key: "payment",
      width: 100,
      render: (payment) =>
        payment === "alipay" ? (
          <span>支付宝</span>
        ) : payment === "paypal" ? (
          <span>PayPal</span>
        ) : (
          <span>余额</span>
        ),
    },
    {
      title: "折扣码",
      key: "discount",
      dataIndex: "discount",
      width: 200,
      render: (discount) =>
        discount ? <span>{discount}</span> : <span>未使用</span>,
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
      width: 250,
    },
  ];
  const date = new Date();
  return (
    <div className="shadow-radius">
      <div
        style={
          isMobile
            ? {
                backgroundColor: "white",
                zIndex: 10,
              }
            : {
                backgroundColor: "white",
                margin: "20px 20px 0 20px",
              }
        }
      >
        <Search
          placeholder="搜索订单号、Email、兑换码"
          enterButton="搜索"
          style={
            isMobile
              ? {
                  width: 240,
                  margin: "25px 10px 5px 10px",
                  height: "20px",
                  fontSize: "25px",
                }
              : {
                  width: 300,
                  margin: "25px 10px 5px 10px",
                  height: "20px",
                  fontSize: "25px",
                }
          }
          onSearch={(value) => {
            handleSearch(value);
          }}
        />
        <DatePicker
          defaultValue={moment(`${date.toLocaleDateString()}`, dateFormat)}
          format={dateFormat}
          onChange={onDateChange}
          style={{
            width: 240,
            margin: "25px 10px 5px",
          }}
        />
        <Button
          onClick={handleReset}
          style={
            isMobile
              ? {
                  margin: "5px 10px",
                  color: "#40A9FF !important",
                }
              : {
                  margin: "25px 10px",
                  color: "#40A9FF !important",
                }
          }
        >
          重置
        </Button>
      </div>
      <div
        className="order-page-body"
        style={
          isMobile
            ? { backgroundColor: "white", margin: "5px" }
            : { backgroundColor: "white", margin: "0px 20px" }
        }
      >
        <Table
          columns={columns}
          dataSource={data}
          rowKey={(record) => record.title}
          rowSelection={rowSelection}
          style={{ userSelect: "text" }}
          scroll={{ x: 800 }}
          loading={loading}
        />
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    order: state.form.order,
    setting: state.product.setting,
  };
};
const actionCreator = { handleFetchOrder };
export default connect(mapStateToProps, actionCreator)(OrderPage);
