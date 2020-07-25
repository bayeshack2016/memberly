import React, { useState, useEffect } from "react";
import { Table, Button, Input, DatePicker, Badge } from "antd";
import moment from "moment";
import { connect } from "react-redux";
const dateFormat = "YYYY-MM-DD";
const { Search } = Input;
const columns = [
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
    width: 100,
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
    width: 100,
    render: (paymentStatus) =>
      paymentStatus === "已支付" ? (
        <Badge status="success" text={paymentStatus} />
      ) : (
        <Badge status="warning" text={paymentStatus} />
      ),
  },
  {
    title: "会员码",
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
      activation === "已激活" ? (
        <Badge status="success" text={activation} />
      ) : (
        <Badge status="warning" text={activation} />
      ),
  },
  {
    title: "创建日期",
    dataIndex: "date",
    key: "date",
    width: 100,
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
      payment === "alipay" ? <span>支付宝</span> : <span>其他</span>,
  },
  {
    title: "邮箱",
    dataIndex: "email",
    key: "email",
    width: 200,
  },
];
const OrderPage = (props) => {
  const [data, setData] = useState(props.order);
  const [loading, setLoading] = useState(true);
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
      if (item.email === value || item.orderId === value) {
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
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectedRowKeysChange,
  };
  const date = new Date();
  return (
    <div className="shadow-radius">
      <div
        className="order-page-header"
        style={{
          backgroundColor: "white",
          height: "100px",
          padding: "30px 20px",
        }}
      >
        <div style={{ fontSize: "20px", fontWeight: "500" }}>订单管理</div>
        <p style={{ lineHeight: "35px", fontSize: "15px", opacity: "0.8" }}>
          在这里查找，管理以往所有的订单和会员码
        </p>
      </div>
      <div
        style={{
          backgroundColor: "white",
          height: "80px",
          margin: "20px 20px 0 20px",
        }}
      >
        <div
          style={{
            marginLeft: "20px",
            float: "left",
            lineHeight: "80px",
            fontSize: "18px",
          }}
        >
          搜索订单
        </div>
        <Search
          placeholder="搜索订单号、Email"
          enterButton="搜索"
          style={{
            width: 300,
            margin: "25px 10px 25px 10px",
            float: "left",
            height: "20px",
            fontSize: "25px",
          }}
          onSearch={(value) => {
            handleSearch(value);
          }}
        />
        <DatePicker
          defaultValue={moment(`${date.toLocaleDateString()}`, dateFormat)}
          format={dateFormat}
          onChange={onDateChange}
          style={{
            width: 200,
            margin: "25px 20px",
            float: "left",
          }}
        />
        <Button
          onClick={handleReset}
          style={{
            margin: "25px 10px",
            float: "left",
            color: "#40A9FF !important",
          }}
        >
          重置
        </Button>
      </div>
      <div
        className="order-page-body"
        style={{ backgroundColor: "white", margin: "0px 20px" }}
      >
        <Table
          columns={columns}
          dataSource={data}
          rowKey={(record) => record}
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
  };
};
const actionCreator = {};
export default connect(mapStateToProps, actionCreator)(OrderPage);
