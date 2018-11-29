import React from "react";
import "./Steps.sass";

const steps = [
  {
    stepId: 1,
    name: "Chama Details",
    stepName: "Step 1",
    icon: "fa fa-file-text",
    active: true
  },
  {
    stepId: 2,
    name: "Chama Admin",
    stepName: "Step 2",
    icon: "fa fa-user"
  },
  {
    stepId: 3,
    name: "Chama Accounts",
    stepName: "Step 3",
    icon: "fa fa-money"
  },
  {
    stepId: 4,
    name: "Review Details",
    stepName: "Step 4",
    icon: "fa fa-list"
  }
];

const Steps = props => {
  return (
    <div className="Steps text-center">
      {steps.map(step => (
        <React.Fragment key={step.stepId}>
          <div className={`step ${step.active && "active"}`}>
            <i className={step.icon} />
            <h6 className="font-weight-bold">{step.name}</h6>
            {step.stepName}
          </div>
          {step.stepId !== 4 ? (
            <i className="fa spacer fa-arrow-right ml-2 mr-2" />
          ) : null}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Steps;
