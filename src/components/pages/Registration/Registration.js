import React, { Component } from "react";

import Steps from "./Steps/Steps";
import ChamaDetails from "./ChamaDetails";
import ChamaAdmin from "./ChamaAdmin";

import "./Registration.sass";

export default class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1
    };

    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.switchComponents = this.switchComponents.bind(this);
  }

  handleNext() {
    this.setState({currentStep: this.state.currentStep + 1});
  }

  handleBack() {
    this.setState({currentStep: this.state.currentStep - 1});
  }

  switchComponents() {
    switch(this.state.currentStep) {
      case 1:
        return <ChamaDetails {...this.props} {...this.state} handleBack={this.handleBack} handleNext={this.handleNext} />;

      case 2:
        return <ChamaAdmin {...this.props} {...this.state} handleBack={this.handleBack} handleNext={this.handleNext} />;

      default:
        return null;
    }
  }

  render() {

    return (
      <div className="RegistrationWizard">
        <h2 className="text-center font-weight-bold">Register your Chama</h2>
          <Steps currentStep={this.state.currentStep} />

          {this.switchComponents()}
      </div>
    );
  }
}
