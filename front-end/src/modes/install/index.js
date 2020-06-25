import React, { useState, useEffect } from "react";
import WelcomePage from "./components/wecomePage";
import CollectInfo from "./components/collectInfo";
import "./index.css";
import { handleFetchSetting } from "@/redux/actions/product";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
const Install = (props) => {
  const [currentStep, setCurrentStep] = useState("welcome");
  useEffect(() => {
    props.handleFetchSetting();
  });
  const handleCurrent = (currentStep) => {
    setCurrentStep(currentStep);
  };
  const { setting } = props;
  return (
    <div>
      {setting &&
        (setting.isFirst === "yes" ? (
          currentStep === "welcome" ? (
            <WelcomePage handleCurrent={handleCurrent} />
          ) : (
            <CollectInfo handleCurrent={handleCurrent} />
          )
        ) : (
          <Redirect to="/login" />
        ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    setting: state.product.setting,
  };
};
const actionCreator = {
  handleFetchSetting,
};

export default connect(mapStateToProps, actionCreator)(Install);
