import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  message,
  Select,
  Form,
  Input,
  Radio,
  Cascader,
  DatePicker,
  InputNumber,
} from "antd";
import { connect } from "react-redux";
import { handleFetchDisaccount } from "@/redux/actions/form";
import $axios from "@/axios/$axios";
import moment from "moment";
const copy = require("copy-text-to-clipboard");
const { Option } = Select;
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
const CreateDisaccount = (props) => {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("one_time");
  const [codes, setCodes] = useState(null);
  useEffect(() => {
    if (!props.title) return;
    setType(
      props.title === "编辑" ? props.disaccountInfo.disaccountType : "one_time"
    );
  }, [props.title]);
  const handleCancel = () => {
    props.setShowCreate(false);
  };
  const onFinish = async (values) => {
    setLoading(true);
    if (props.title === "创建" && values.disaccountType === "reusable") {
      let codeArr = [];
      for (let item in props.allDisaccount) {
        codeArr.push(item.code);
      }
      if (codeArr.indexOf(values.code) > -1) {
        setLoading(false);
        message.warn("该折扣码已存在");
        return;
      }
    }
    // return;

    $axios
      .post(
        props.title === "编辑"
          ? `/disaccount/update/${props.disaccountInfo._id}`
          : values.disaccountType === "one_time"
          ? "/disaccount/one_time"
          : "/disaccount/reusable",
        {
          ...values,
          productName: values.product[0],
          levelName: values.product[0] === "all" ? "all" : values.product[1],
          validUntil: values.validUntil
            ? values.validUntil._d.getTime()
            : 99999999999999,
          code: values.code
            ? values.code
            : Math.random().toString(36).substr(4, 8).toUpperCase() +
              Math.random().toString(36).substr(4, 8).toUpperCase(),
          number: values.number ? values.number : 9999,
        }
      )
      .then((res) => {
        if (values.disaccountType === "one_time" && Array.isArray(res.data)) {
          props.handleFetchDisaccount();
          let codeArray = [];
          for (let i = 0; i < res.data.length; i++) {
            codeArray.push(res.data[i].code + "\n");
          }

          setCodes(codeArray.join(""));
        } else {
          props.handleFetchDisaccount();
          setCodes(res.data.code);
        }
        message.success(props.title + "成功");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error, "error");
        message.error("创建失败");
        setLoading(false);
      });
  };
  if (codes) {
    return (
      <Modal
        visible={props.isShowCreate}
        title="创建折扣"
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
        style={{ width: "200px" }}
        afterClose={() => {
          setCodes(null);
        }}
      >
        <Input.TextArea rows={8} value={codes} />

        <Button
          type="primary"
          onClick={() => {
            copy(codes);
            message.success("已复制到剪切板");
            setCodes(null);
            props.setShowCreate(false);
          }}
          style={{ marginTop: 15 }}
          block
        >
          复制
        </Button>
      </Modal>
    );
  }
  return (
    <Modal
      visible={props.isShowCreate}
      title={props.title + "折扣"}
      // onOk={handleOk}
      onCancel={handleCancel}
      footer={[]}
      afterClose={() => {
        setCodes(null);
      }}
    >
      <Form
        {...layout}
        onFinish={onFinish}
        initialValues={
          props.title === "编辑"
            ? {
                ...props.disaccountInfo,
                validUntil: moment(props.disaccountInfo.validUntil),
                product: [
                  props.disaccountInfo.productName,
                  props.disaccountInfo.levelName,
                ],
              }
            : {}
        }
      >
        <Form.Item
          label="折扣类型"
          name="disaccountType"
          rules={[
            {
              required: true,
              message: "请选择类型",
            },
          ]}
        >
          <Radio.Group disabled={props.title === "编辑"}>
            <Radio.Button
              value="one_time"
              onClick={() => {
                setType("one_time");
              }}
            >
              一次性
            </Radio.Button>
            <Radio.Button
              value="reusable"
              onClick={() => {
                setType("reusable");
              }}
            >
              可重复
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="适用范围"
          name="product"
          rules={[
            {
              required: true,
              message: "请选择适用范围",
            },
          ]}
        >
          <Cascader
            options={[
              { value: "all", label: "全部商品" },
              ...props.allProducts.map((item) => {
                return {
                  value: item.productName,
                  label: item.productName,
                  children: [
                    { value: "all", label: "全部等级" },
                    ...item.levelName.map((item) => {
                      return {
                        value: item,
                        label: item,
                      };
                    }),
                  ],
                };
              }),
            ]}
          />
        </Form.Item>
        <Form.Item label="折扣额度">
          <Input.Group compact>
            <Form.Item
              name="amountType"
              noStyle
              rules={[{ required: true, message: "请选择折扣类型" }]}
            >
              <Select placeholder="折扣类型">
                <Option value="price">价格立减</Option>
                <Option value="percentage">总价百分比</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="amount"
              rules={[
                {
                  required: true,
                  message: "请输入折扣额度",
                },
              ]}
              noStyle
            >
              <InputNumber />
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item
          label={type === "reusable" ? "可用次数" : "折扣码数量"}
          min={1}
          step={1}
          name="number"
          rules={[
            {
              required: type === "reusable" ? false : true,
              message: "请输入折扣数量",
            },
          ]}
        >
          <InputNumber
            placeholder={type === "reusable" ? "不填则无次数限制" : ""}
            style={{ width: "100%" }}
            disabled={
              props.title === "编辑" &&
              props.disaccountInfo.disaccountType === "one_time"
            }
          />
        </Form.Item>
        {type === "reusable" ? (
          <Form.Item label={"自定义折扣码"} name="code">
            <Input placeholder="不填则由系统生成" />
          </Form.Item>
        ) : null}

        <Form.Item label="有效期至" name="validUntil">
          <DatePicker placeholder="不填则无时间限制" />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" loading={loading}>
            提交
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
const mapStateToProps = (state) => {
  return {
    allProducts: state.product.allProducts,
    allDisaccount: state.form.allDisaccount,
  };
};
const actionCreator = { handleFetchDisaccount };
export default connect(mapStateToProps, actionCreator)(CreateDisaccount);
