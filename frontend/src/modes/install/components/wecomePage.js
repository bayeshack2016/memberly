import React, { useState } from "react";
import { Row, Button, Modal } from "antd";
const WelcomePage = (props) => {
  const [visible, setVisible] = useState(false);
  const showModal = () => {
    setVisible(true);
  };
  const handleOk = () => {
    props.handleCurrent("collectInfo");
  };

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <div>
      <img src="/assets/theme/tech.svg" alt="" className="welcome-bg" />
      <Row justify="center" className="welcome-title">
        欢迎使用 Coodo Pay
      </Row>
      <Row justify="center" className="welcome-subtitle">
        一个基于 React 和 Koa2 开发的在线支付系统
      </Row>
      <Row justify="center" className="welcome-info">
        因为这是您第一次使用 Coodo Pay，
        <br />
        我们需要向您收集和确认一些信息，这只需要花费几分钟
      </Row>
      <Row justify="center" className="welcome-button">
        <Button type="primary" onClick={showModal} size="large">
          好的，开始吧
        </Button>
      </Row>

      <Modal
        visible={visible}
        title="开始之前"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            算了吧
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            继续
          </Button>,
        ]}
      >
        <p>
          Coodo Pay
          是一个免费开源的个人项目，初衷是为独立开发者提供一套会员支付的解决方案，本项目严禁一切淫秽、涉赌、政治、钓鱼、诈骗、理财、借贷、封建迷信等非法网站使用，点击继续表明您同意以上条款
        </p>
      </Modal>
    </div>
  );
};

export default WelcomePage;
