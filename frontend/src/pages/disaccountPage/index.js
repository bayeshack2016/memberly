import React, { useState, useEffect } from "react";
import { Table, Button, Input, DatePicker, Badge, message } from "antd";
import moment from "moment";
import { connect } from "react-redux";
import $axios from "../../axios/$axios";
import { handleFetchDisaccount } from "@/redux/actions/form";
import PageHeader from "../../components/pageHeader";
import { isMobile } from "react-device-detect";
import CreateDisaccount from "../../components/createDisaccount";

const dateFormat = "YYYY-MM-DD";
const { Search } = Input;
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
const tailLayout = {
  wrapperCol: {
    xs: { span: 16, offset: 0 },
    sm: { span: 16, offset: 10 },
  },
};
const DisaccountPage = (props) => {
  const [data, setData] = useState(props.disaccount);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(-1);
  const [title, setTile] = useState("创建");
  const [editDisaccount, setEditDisaccount] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isShowCreate, setShowCreate] = useState(false);
  useEffect(() => {
    if (props.disaccount) {
      setLoading(false);
      setData(props.disaccount);
    }
  }, [props.disaccount]);
  const filterData = (date = {}) => {
    let filteredData = [];
    props.disaccount.forEach((item) => {
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
    props.disaccount.forEach((item) => {
      if (item.code === value) {
        searchResults.push(item);
      }
    });
    setData(searchResults);
  };
  const handleReset = () => {
    setData(props.disaccount);
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

  const handleDelete = async (code, index, disaccount) => {
    setDeleteLoading(true);
    setDeleteIndex(index);
    $axios
      .post(`/disaccount/delete/${disaccount._id}`)
      .then((res) => {
        setDeleteLoading(false);
        message.success("删除成功");
        props.handleFetchDisaccount();
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
      dataIndex: "code",
      key: "code",
      width: 80,
      render: (text, record, index) => (
        <Button
          onClick={() => {
            setTile("编辑");
            setEditDisaccount(record);
            setShowCreate(true);
          }}
          size="small"
        >
          编辑
        </Button>
      ),
    },
    {
      dataIndex: "code",
      key: "code",
      width: 80,
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
      dataIndex: "disaccountType",
      key: "disaccountType",
      width: 100,
      render: (disaccountType) =>
        disaccountType === "one_time" ? (
          <span>一次性</span>
        ) : (
          <span>可重复</span>
        ),
    },
  ];
  const date = new Date();
  return (
    <div className="shadow-radius">
      {isShowCreate && (
        <CreateDisaccount
          isShowCreate={isShowCreate}
          setShowCreate={setShowCreate}
          title={title}
          disaccountInfo={editDisaccount}
          setEditDisaccount={setEditDisaccount}
        />
      )}

      <PageHeader title="折扣管理" desc="管理以往所有的折扣码" />
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
        className="disaccount-page-body"
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
        />
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    disaccount: state.form.disaccount,
  };
};
const actionCreator = { handleFetchDisaccount };
export default connect(mapStateToProps, actionCreator)(DisaccountPage);
