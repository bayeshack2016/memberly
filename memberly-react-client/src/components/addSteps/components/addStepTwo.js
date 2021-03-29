import React from "react";
import { Descriptions, Row, Button } from "antd";
import { parseFormData } from "../../../utils/productUtil";
import { isMobile } from "react-device-detect";

const AddStepTwo = (props) => {
  const { formData } = props;
  const renderContact = (contact) => {
    return contact.split("\n").map((item, index) => {
      return <div key={index}>{item}</div>;
    });
  };
  const renderLevelTable = (levels, data) => {
    const {
      levelName,
      levelPrice,
      levelDesc,
      levelLimit,
      levelNote,
    } = parseFormData(data, null);
    let arr = [];
    for (let i = 1; i <= levels; i++) {
      arr.push(i);
    }
    const renderLevelDesc = (descArr) => {
      return descArr.map((item, index) => {
        return <div key={index}>{item}</div>;
      });
    };
    return arr.map((item) => {
      return (
        <Descriptions.Item label={`等级${item}方案`} span={3} key={item}>
          等级{item}名称: {levelName[item - 1]}
          <br />
          等级{item}价格:{" "}
          {`${levelPrice[item - 1].price}元/${levelPrice[item - 1].unit}`}
          <br />
          等级{item}特权描述:
          <br />
          {renderLevelDesc(levelDesc[item - 1])}
          <br />
          等级{item}限购数量: {levelLimit[item - 1]}
          <br />
          等级{item}备注: {levelNote[item - 1]}
          <br />
        </Descriptions.Item>
      );
    });
  };
  return (
    <div
      className="add-step-two"
      style={isMobile ? { padding: "5px" } : { padding: "50px 150px" }}
    >
      <Descriptions
        bordered
        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
      >
        <Descriptions.Item label="商品名称">
          {formData.productName}
        </Descriptions.Item>
        <Descriptions.Item label="商品介绍" span={2}>
          {formData.productInfo}
        </Descriptions.Item>
        {renderLevelTable(formData.memberLevel, formData)}
        {formData.productType === 2 ? (
          <Descriptions.Item label="支付回调地址" span={4}>
            {formData.callbackUrl}
          </Descriptions.Item>
        ) : null}
        {formData.productType === 3 ? (
          <Descriptions.Item label="支持余额支付" span={4}>
            {formData.allowBalance === "yes" ? "允许" : "不允许"}
          </Descriptions.Item>
        ) : null}
        <Descriptions.Item label="是否在售">在售</Descriptions.Item>
        <Descriptions.Item label={`联系方式`}>
          {renderContact(formData.contact)}
        </Descriptions.Item>
      </Descriptions>
      <Row justify="center" style={{ marginTop: "40px" }}>
        <Button onClick={props.handlePrev} style={{ marginRight: "30px" }}>
          上一步
        </Button>
        <Button type="primary" onClick={props.handleNext}>
          提交
        </Button>
      </Row>
    </div>
  );
};

export default AddStepTwo;
