import React, { useState, useEffect } from "react";
import { Table, Button, Input, DatePicker } from "antd";
import moment from "moment";
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";
import "./index.css";
const dateFormat = "YYYY-MM-DD";
const { Search } = Input;
const CustomerPage = (props) => {
  const [data, setData] = useState(props.customer);
  const [loading, setLoading] = useState(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  useEffect(() => {
    if (props.customer) {
      setLoading(false);
      setData(props.customer);
    }
  }, [props.customer]);
  const filterData = (date = {}) => {
    let filteredData = [];
    props.customer.forEach((item) => {
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
    props.customer.forEach((item) => {
      if (item.email === value || item.nickname === value) {
        searchResults.push(item);
      }
    });
    setData(searchResults);
  };
  const handleReset = () => {
    setData(props.customer);
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
  const columns = [
    {
      title: "用户ID",
      key: "_id",
      dataIndex: "_id",
      width: 250,
    },
    {
      title: "用户昵称",
      key: "nickname",
      dataIndex: "nickname",
      width: 150,
    },
    {
      title: "邮箱",
      key: "email",
      dataIndex: "email",
      width: 200,
    },
    {
      title: "创建日期",
      dataIndex: "date",
      key: "date",
      width: 140,
    },
    {
      title: "用户余额",
      dataIndex: "balance",
      key: "balance",
      width: 100,
      render: (price) => <span>{price || 0}元</span>,
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
          placeholder="搜索昵称、邮箱"
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
          rowKey={(record) => record}
          rowSelection={rowSelection}
          style={{ userSelect: "text" }}
          scroll={{ x: 800 }}
          loading={loading}
          expandable={{
            expandedRowRender: (record) =>
              record.orders.map((item) => {
                return (
                  <p style={{ textAlign: "center" }}>
                    购买日期：{item.date}&nbsp; 商品名称：{item.productName}
                    &nbsp; 商品等级：{item.levelName}&nbsp; 价格：{item.price}元
                    &nbsp; 订单编号：{item.orderId}
                    &nbsp;
                  </p>
                );
              }),
          }}
        />
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    customer: state.form.customer,
  };
};
const actionCreator = {};
export default connect(mapStateToProps, actionCreator)(CustomerPage);
