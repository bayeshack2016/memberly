import React, { Component } from "react";
import { Form, Input, Select, Button, Radio, InputNumber, Tooltip } from "antd";
import { handleForm } from "@/redux/actions/form";
import { connect } from "react-redux";
import { restoreFormData } from "../../../utils/productUtil";
const { Option } = Select;

class AddStepOne extends Component {
  state = {
    confirmDirty: false,
    loading: false,
    levels: this.props.formData ? this.props.formData.memberLevel : 0,
    onSale: "yes",
    shipping: "auto",
    sendMail: "no",
    formData: null,
    productType: this.props.formData ? this.props.formData.productType : 1, //产品类型，1表示会员码产品，2表示非会员码产品
  };
  UNSAFE_componentWillMount() {
    let url = document.location.toString();
    let idArr = url.split("/");
    let id = idArr[idArr.length - 1];
    console.log(
      this.props.allProducts,
      id,
      this.props.allProducts[id - 1],
      "id"
    );
    if (!isNaN(parseInt(id))) {
      //解决被调用两次的问题，导致productUitl报错
      this.setState({
        formData: restoreFormData(this.props.allProducts[id - 1]),
      });
      this.setState({
        levels: this.props.allProducts[id - 1].memberLevel,
        productType: this.props.allProducts[id - 1].productType,
      });
    }
  }
  onLevelChange = (value) => {
    this.setState({ levels: parseInt(value) });
  };
  onDescChange = ({ target: { value } }) => {
    this.setState({ value });
  };
  onShippingChange = (e) => {
    this.setState({
      shipping: e.target.value,
    });
  };
  onSaleChange = (e) => {
    this.setState({
      onSale: e.target.value,
    });
  };
  onTypeChange = (e) => {
    this.setState(
      {
        productType: e.target.value,
      },
      () => {
        console.log(this.state.productType, "type");
      }
    );
  };
  onSendMail = (e) => {
    this.setState({
      sendMail: e.target.value,
    });
  };
  onFinish = (values) => {
    this.props.handleFormData(values);
    this.props.handleForm(values);
    this.props.handleNext();
    this.setState({ formData: values });
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  render() {
    let formData;
    if (this.props.formData) {
      formData = this.props.formData;
    } else if (this.state.formData) {
      formData = this.state.formData;
    }
    const renderLevelDesc = () => {
      let arr = [];
      for (let i = 1; i <= this.state.levels; i++) {
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
                <Form.Item name={[`levelPrice${item}`, `price${item}`]} noStyle>
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
                onChange={this.onDescChange}
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
                onChange={this.onDescChange}
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
        xs: { span: 24, offset: 12 },
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
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
          initialValues={formData ? formData : null}
        >
          <Form.Item
            label="产品类型"
            name="productType"
            rules={[
              {
                required: true,
                message: "请选择产品类型",
              },
            ]}
          >
            <Radio.Group
              onChange={this.onTypeChange}
              value={this.state.productType}
            >
              <Radio value={1}>会员码产品</Radio>
              <Radio value={2}>非会员码产品</Radio>
            </Radio.Group>
          </Form.Item>
          <a
            href="http://www.baidu.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div
              style={{ textAlign: "center", marginBottom: 20, marginTop: -20 }}
            >
              什么是会员码产品和非会员码产品
            </div>
          </a>
          <Form.Item
            label="产品名称"
            name="productName"
            rules={[
              {
                required: true,
                message: "请输入产品名称",
              },
            ]}
          >
            <Input placeholder="请输入产品名称" />
          </Form.Item>
          <Form.Item
            name="productInfo"
            label="产品介绍"
            rules={[
              {
                required: true,
                message: "请输入产品介绍",
              },
            ]}
          >
            <Input.TextArea
              onChange={this.onDescChange}
              placeholder="请用不超过20个字介绍一下这个产品"
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
            <Select
              placeholder="请选择会员等级数量"
              onChange={this.onLevelChange}
            >
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
            </Select>
          </Form.Item>
          {renderLevelDesc()}
          {this.state.productType === 1 ? null : (
            <Form.Item
              label="支付回调地址"
              name="callbackUrl"
              rules={[
                {
                  required: this.state.productType === 1 ? false : true,
                  message: "请输入支付回调地址",
                },
              ]}
            >
              <Input placeholder="请输入支付回调地址" />
            </Form.Item>
          )}

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
            <Radio.Group onChange={this.onSaleChange} value={this.state.onSale}>
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
              onChange={this.onDescChange}
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
  }
}
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
