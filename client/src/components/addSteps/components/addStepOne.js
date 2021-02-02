import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, Radio, InputNumber, Tooltip } from "antd";
import { handleForm } from "@/redux/actions/form";
import { connect } from "react-redux";
import { restoreFormData } from "../../../utils/productUtil";
import { isMobile } from "react-device-detect";
const { Option } = Select;
const AddStepOne = (props) => {
  const [levels, setLevels] = useState(
    props.formData ? props.formData.memberLevel : 0
  );
  const [onSale, setOnSale] = useState("yes");
  const [allowBalance, setAllowBalance] = useState("yes");
  const [formData, setFormData] = useState(
    props.formData ? props.formData : null
  );
  const [productType, setProductType] = useState(
    props.formData ? props.formData.productType : 1
  );
  let formRef = React.createRef();
  useEffect(() => {
    let url = document.location.toString();
    let idArr = url.split("/");
    let id = idArr[idArr.length - 1];
    if (!isNaN(parseInt(id))) {
      //解决被调用两次的问题，导致productUitl报错
      formRef.current.setFieldsValue(
        restoreFormData(props.allProducts[id - 1])
      );
      setFormData(restoreFormData(props.allProducts[id - 1]));
      setLevels(props.allProducts[id - 1].memberLevel);
      setProductType(props.allProducts[id - 1].productType);
    }
  }, []);
  const onLevelChange = (value) => {
    setLevels(parseInt(value));
  };

  const onSaleChange = (e) => {
    setOnSale(e.target.value);
  };
  const onAllowBalanceChange = (e) => {
    setAllowBalance(e.target.value);
  };

  const onFinish = (values) => {
    props.handleFormData(values);
    props.handleForm(values);
    props.handleNext();
    setFormData(values);
  };

  const renderLevelDesc = () => {
    let arr = [];
    for (let i = 1; i <= levels; i++) {
      arr.push(i);
    }
    return arr.map((item) => {
      return (
        <div key={item}>
          <Form.Item
            name={`levelName${item}`}
            label={`等级${item}名称`}
            rules={[
              {
                required: true,
                message: `请输入等级${item}名称`,
              },
            ]}
          >
            <Input placeholder={"示例：高级版，年费会员，企业版"} />
          </Form.Item>
          <Form.Item label={`等级${item}定价`}>
            <Input.Group compact>
              <Form.Item
                name={[`levelPrice${item}`, `price${item}`]}
                noStyle
                rules={[
                  { type: "number", message: "请输入数字" },
                  { required: true, message: `请输入等级${item}定价` },
                ]}
              >
                <InputNumber
                  min={0}
                  step={1}
                  style={{
                    width: "calc(100% - 100px)",
                  }}
                  placeholder={`请输入等级${item}定价`}
                />
              </Form.Item>
              <Form.Item
                name={[`levelPrice${item}`, `unit${item}`]}
                noStyle
                rules={[
                  { required: true, message: `请输入等级${item}定价单位` },
                ]}
              >
                <Select
                  style={{
                    width: 100,
                  }}
                  placeholder="选择单位"
                >
                  <Option value="每月">每月</Option>
                  <Option value="每3个月">每3个月</Option>
                  <Option value="每6个月">每6个月</Option>
                  <Option value="每年">每年</Option>
                  <Option value="终身">终身</Option>
                </Select>
              </Form.Item>
            </Input.Group>
          </Form.Item>
          <Form.Item
            name={`levelDesc${item}`}
            label={`等级${item}特权描述`}
            rules={[
              {
                required: true,
                message: "请输入会员特权描述",
              },
            ]}
          >
            <Input.TextArea
              id="desc"
              placeholder="写完一条之后请换行"
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </Form.Item>
          <Form.Item label={`等级${item}限购数量`} name={`levelLimit${item}`}>
            <InputNumber
              style={{ width: "100%" }}
              min={0}
              step={1}
              placeholder="不限购请留空"
            />
          </Form.Item>
          <Form.Item name={`levelNote${item}`} label={`等级${item}备注`}>
            <Input.TextArea
              id="note"
              placeholder="没有请留空"
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </Form.Item>
        </div>
      );
    });
  };

  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 11 },
    },
  };
  const formItemLayout = {
    labelCol: {
      sm: { span: 8 },
    },
    wrapperCol: {
      sm: { span: 8 },
    },
  };
  return (
    <div className="shadow-radius" style={{ marginTop: "50px" }}>
      <Form
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={formData ? formData : null}
        ref={formRef}
      >
        <Form.Item label="商品类型" name="productType">
          <Radio.Group>
            <Radio.Button
              value={1}
              onClick={() => {
                setProductType(1);
              }}
            >
              1号类型
            </Radio.Button>
            <Radio.Button
              value={2}
              onClick={() => {
                setProductType(2);
              }}
            >
              2号类型
            </Radio.Button>
            <Radio.Button
              value={3}
              onClick={() => {
                setProductType(3);
              }}
            >
              3号类型
            </Radio.Button>
            {!isMobile && (
              <Tooltip title="我要如何选择商品类型？">
                <a
                  href="https://www.yuque.com/docs/share/1f840e93-4ad1-437b-8639-bc480c4ae5aa?#%20《Coodo%20Pay%20开发指南》"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ margin: "0 8px", lineHeight: "20px" }}
                >
                  需要帮助？
                </a>
              </Tooltip>
            )}
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="商品名称"
          name="productName"
          rules={[
            {
              required: true,
              message: "请输入商品名称",
            },
          ]}
        >
          <Input placeholder="请输入商品名称" />
        </Form.Item>
        <Form.Item
          name="productInfo"
          label="商品介绍"
          rules={[
            {
              required: true,
              message: "请输入商品介绍",
            },
          ]}
        >
          <Input.TextArea
            placeholder="请用不超过20个字介绍一下这个商品"
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </Form.Item>

        <Form.Item
          label="会员等级数量"
          name="memberLevel"
          rules={[
            {
              required: true,
              message: "请输入会员等级数量",
            },
          ]}
        >
          <Select placeholder="请选择会员等级数量" onChange={onLevelChange}>
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
            <Option value="4">4</Option>
          </Select>
        </Form.Item>
        {renderLevelDesc()}
        {productType === 2 ? (
          <Form.Item
            label="订单回调地址"
            name="callbackUrl"
            rules={[
              {
                type: "url",
                required: productType === 1 ? false : true,
                message: "请输入订单回调地址",
              },
            ]}
          >
            <Input placeholder="请输入订单回调地址" />
          </Form.Item>
        ) : null}
        {productType === 3 ? (
          <Form.Item
            label="使用余额支付"
            name="allowBalance"
            rules={[
              {
                required: true,
                message: "请选择是否允许使用余额支付",
              },
            ]}
          >
            <Radio.Group onChange={onAllowBalanceChange} value={allowBalance}>
              <Radio value="yes">允许</Radio>
              <Radio value="no">不允许</Radio>
            </Radio.Group>
          </Form.Item>
        ) : null}
        <Form.Item
          label="是否在售"
          name="onSale"
          rules={[
            {
              required: true,
              message: "请选择是否在售",
            },
          ]}
        >
          <Radio.Group onChange={onSaleChange} value={onSale}>
            <Radio value="yes">在售</Radio>
            <Radio value="no">停售</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name={`contact`}
          label={`联系方式`}
          rules={[
            {
              required: true,
              message: "请输入联系方式",
            },
          ]}
        >
          <Input.TextArea
            id="contact"
            placeholder="官方网站、微博、公众号、邮箱等，写完一条之后请换行"
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </Form.Item>
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="primary" htmlType="submit">
            下一步
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    formData: state.form.formData,
    allProducts: state.product.allProducts,
  };
};
const actionCreator = {
  handleForm,
};
export default connect(mapStateToProps, actionCreator)(AddStepOne);
