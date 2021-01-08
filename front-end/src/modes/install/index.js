import React, { useState, useEffect } from "react";
import WelcomePage from "./components/wecomePage";
import CollectInfo from "./components/collectInfo";
import { message } from "antd";
import "./index.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Result, Button } from "antd";
const Install = (props) => {
  const [currentStep, setCurrentStep] = useState("welcome");
  const handleCurrent = (currentStep) => {
    setCurrentStep(currentStep);
  };
  const { setting } = props;
  return (
    <div>
      {setting ? (
        setting.isFirst === "yes" ? (
          currentStep === "welcome" ? (
            <WelcomePage handleCurrent={handleCurrent} />
          ) : (
            <CollectInfo handleCurrent={handleCurrent} />
          )
        ) : (
          <Redirect to="/login" />
        )
      ) : (
        <Result
          status="warning"
          title="数据库配置出错"
          extra={
            <Button type="primary" key="console">
              <a
                href="https://www.yuque.com/docs/share/5d0fd4df-7de6-424c-a389-6e187e764966?#%20《Coodo%20Pay%20搭建教程（宝塔面板篇）》"
                target="_blank"
                rel="noopener noreferrer"
              >
                我需要帮助
              </a>
            </Button>
          }
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    setting: state.product.setting,
  };
};
const actionCreator = {};

export default connect(mapStateToProps, actionCreator)(Install);
