import React, { Component } from "react";
import { connect } from 'react-redux';
import "./Steps.sass";

const steps = [
  {
    id: 1,
    name: "Chama Details",
    stepName: "Step 1",
  },
  {
    id: 2,
    name: "Administrator",
    stepName: "Step 2",
  },
  {
    id: 3,
    name: "Accounts",
    stepName: "Step 3",
  },
  {
    id: 4,
    name: "Summary",
    stepName: "Step 4",
  }
];

class Steps extends Component {
  state = {
    completedSteps: [],
  };

  switchToStep = step => {
    const { stepOneComplete, stepTwoComplete, stepThreeComplete } = this.props;

    if (step === 1 && stepOneComplete)
      return this.props.switchToStep(step);

    if (step === 2 && stepTwoComplete)
      return this.props.switchToStep(step);

    if (step === 3 && stepThreeComplete)
      return this.props.switchToStep(step);

    if (stepOneComplete && stepTwoComplete && stepThreeComplete)
      this.props.switchToStep(4);
  };

  componentDidUpdate(prevProps) {
    const { currentStep, stepOneComplete, stepTwoComplete, stepThreeComplete } = this.props;

    if (prevProps.currentStep !== currentStep) {
      const completedSteps = [...this.state.completedSteps];

      if (completedSteps.indexOf(currentStep) === -1){
        if (currentStep === 1 && stepOneComplete)
          completedSteps.push(currentStep);

        if (currentStep === 2 && stepTwoComplete)
          completedSteps.push(currentStep);

        if (currentStep === 3 && stepThreeComplete)
          completedSteps.push(currentStep);

        if (stepOneComplete && stepTwoComplete && stepThreeComplete)
          completedSteps.push(4);

        this.setState({ completedSteps });
      }
    }
  }

  render() {
    const { completedSteps } = this.state;

    return (
      <ul className="progressbar">
        {steps.map(step => {
          return (
            <li
            key={step.id}
            className={`${step.id <= this.props.currentStep || (completedSteps.indexOf(step.id) > -1) ? "active" : "disabled"}`}
            onClick={() => this.switchToStep(step.id)}
          >
            {step.name}
          </li>)
        })}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  stepOneComplete: state.chamaDetails.stepSuccess,
  stepTwoComplete: state.chamaAdmin.stepSuccess,
  stepThreeComplete: state.chamaAccounts.stepSuccess,
});

export default connect(mapStateToProps, null)(Steps);
