//添加商品信息
import React, { useState } from "react";
import AddStepOne from "./components/addStepOne";
import AddStepTwo from "./components/addStepTwo";
import AddStepThree from "./components/addStepThree";
import "./index.css";
const AddSteps = (props) => {
  const [formData, setFormData] = useState(null);
  const getFormValue = (values) => {
    setFormData(values);
  };

  return props.currentStep === 0 ? (
    <AddStepOne
      handleNext={props.next}
      handleFormData={getFormValue.bind(this)}
    />
  ) : props.currentStep === 1 ? (
    <AddStepTwo
      handleNext={props.next}
      handlePrev={props.prev}
      formData={formData}
    />
  ) : (
    <AddStepThree />
  );
};

export default AddSteps;
