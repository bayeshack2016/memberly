import React, { useState, useEffect } from "react";
import { Table, Button, Input, DatePicker, Badge, message } from "antd";
import moment from "moment";
import { connect } from "react-redux";
import $axios from "../../axios/$axios";
import { handleFetchDiscount } from "../../redux/actions/form";
import { isMobile } from "react-device-detect";
import CreateDiscount from "../../components/createDiscount";

const dateFormat = "YYYY-MM-DD";
const { Search } = Input;

const DiscountPage = (props) => {
  const [data, setData] = useState(props.discount);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(-1);
  const [title, setTile] = useState("创建");
  const [editDiscount, setEditDiscount] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isShowCreate, setShowCreate] = useState(false);
  useEffect(() => {
    if (props.discount) {
      setLoading(false);
      setData(props.discount);
    }
  }, [props.discount]);
  const filterData = (date = {}) => {
    let filteredData = [];
    props.discount.forEach((item) => {
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
    props.discount.forEach((item) => {
      if (item.code === value) {
        searchResults.push(item);
      }
    });
    setData(searchResults);
  };
  const handleReset = () => {
    setData(props.discount);
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

  const handleDelete = async (code, index, discount) => {
    setDeleteLoading(true);
    setDeleteIndex(index);
    $axios
      .post(`/discount/delete/${discount._id}`, { uid: props.setting.uid })
      .then((res) => {
        setDeleteLoading(false);
        message.success("删除成功");
        props.handleFetchDiscount(props.setting.uid);
        setDeleteIndex(-1);
      })
      .catch((err) => {
        setDeleteLoading(false);
        setDeleteIndex(-1);
        message.error("删除失败");
      });
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectedRowKeysChange,
  };
  const columns = [
    {
      title: "编辑操作",
      dataIndex: "code",
      key: "code",
      width: 100,
      render: (text, record, index) => (
        <Button
          onClick={() => {
            setTile("编辑");
            setEditDiscount(record);
            setShowCreate(true);
          }}
          size="small"
        >
          编辑
        </Button>
      ),
    },
    {
      title: "删除操作",
      dataIndex: "code",
      key: "code",
      width: 100,
      render: (text, record, index) => (
        <Button
          type="primary"
          onClick={() => {
            handleDelete(record.code, index, record);
          }}
          size="small"
          loading={deleteIndex === index && deleteLoading}
        >
          删除
        </Button>
      ),
    },
    {
      title: "折扣码",
      key: "code",
      dataIndex: "code",
      width: 200,
    },
    {
      title: "商品名称",
      key: "productName",
      dataIndex: "productName",
      width: 120,
      render: (productName) => (
        <p>{productName === "all" ? "全部商品" : productName}</p>
      ),
    },
    {
      title: "等级名称",
      key: "levelName",
      dataIndex: "levelName",
      width: 100,
      render: (levelName) => (
        <p>{levelName === "all" ? "全部等级" : levelName}</p>
      ),
    },
    {
      title: "使用状态",
      key: "activation",
      dataIndex: "activation",
      width: 100,
      render: (activation) =>
        activation.length > 0 ? (
          <Badge status="success" text={"已激活"} />
        ) : (
          <Badge status="warning" text={"未激活"} />
        ),
    },
    {
      title: "已用次数",
      key: "activation",
      dataIndex: "activation",
      width: 100,
      render: (activation) => (
        <p style={{ textAlign: "center" }}>{activation.length}</p>
      ),
    },
    {
      title: "可用次数",
      key: "number",
      dataIndex: "number",
      width: 100,
      render: (number) => <p style={{ textAlign: "center" }}>{number}</p>,
    },
    {
      title: "创建日期",
      dataIndex: "time",
      key: "time",
      width: 140,
      render: (time) => new Date(parseInt(time)).toLocaleDateString(),
    },
    {
      title: "失效日期",
      dataIndex: "validUntil",
      key: "validUntil",
      width: 140,
      render: (validUntil) => new Date(validUntil).toLocaleDateString(),
    },
    {
      title: "折扣",
      dataIndex: "amount",
      key: "amount",
      width: 100,
      render: (text, record, index) => (
        <span>
          {record.amount}
          {record.amountType === "price" ? "元" : "%"}
        </span>
      ),
    },
    {
      title: "折扣类型",
      dataIndex: "discountType",
      key: "discountType",
      width: 100,
      render: (discountType) =>
        discountType === "one_time" ? <span>一次性</span> : <span>可重复</span>,
    },
  ];
  const date = new Date();
  return (
    <div className="shadow-radius">
      {isShowCreate && (
        <CreateDiscount
          isShowCreate={isShowCreate}
          setShowCreate={setShowCreate}
          title={title}
          discountInfo={editDiscount}
          setEditDiscount={setEditDiscount}
        />
      )}

      <div
        style={
          isMobile
            ? {
                backgroundColor: "white",
                height: "170px",
                margin: "5px",
                zIndex: 10,
              }
            : {
                backgroundColor: "white",
                margin: "20px 20px 0 20px",
              }
        }
      >
        <Search
          placeholder="搜索折扣码"
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
        <Button
          onClick={() => {
            setShowCreate(true);
            setTile("创建");
          }}
          type="primary"
          style={
            isMobile
              ? {
                  margin: "5px 10px",
                }
              : {
                  margin: "25px 20px",
                }
          }
        >
          创建折扣
        </Button>
      </div>
      <div
        className="discount-page-body"
        style={
          isMobile
            ? { backgroundColor: "white", margin: "5px" }
            : { backgroundColor: "white", margin: "0px 20px" }
        }
      >
        <Table
          columns={columns}
          dataSource={data && [...data].reverse()}
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
    discount: state.form.discount,
    setting: state.product.setting,
  };
};
const actionCreator = { handleFetchDiscount };
export default connect(mapStateToProps, actionCreator)(DiscountPage);
