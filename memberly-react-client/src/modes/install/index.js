import React, { useState } from "react";
import WelcomePage from "./components/wecomePage";
import CollectInfo from "./components/collectInfo";
import "./index.css";
import { connect } from "react-redux";

const Install = (props) => {
  const [currentStep, setCurrentStep] = useState("welcome");
  const handleCurrent = (step) => {
    setCurrentStep(step);
  };

  return (
    <div>
      {currentStep === "welcome" ? (
        <WelcomePage handleCurrent={handleCurrent} />
      ) : (
        <CollectInfo handleCurrent={handleCurrent} />
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
