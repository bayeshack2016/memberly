//添加产品信息
import React, { Component } from "react";
import AddStepOne from "./components/addStepOne";
import AddStepTwo from "./components/addStepTwo";
import AddStepThree from "./components/addStepThree";
import "./index.css";
class AddSteps extends Component {
  constructor(props) {
    super(props);
    this.state = { formData: null };
  }
  getFormValue(values) {
    this.setState({ formData: values });
  }
  render() {
    return this.props.currentStep === 0 ? (
      <AddStepOne
        handleNext={this.props.next}
        handleFormData={this.getFormValue.bind(this)}
      />
    ) : this.props.currentStep === 1 ? (
      <AddStepTwo
        handleNext={this.props.next}
        handlePrev={this.props.prev}
        formData={this.state.formData}
      />
    ) : (
      <AddStepThree />
    );
  }
}

export default AddSteps;
