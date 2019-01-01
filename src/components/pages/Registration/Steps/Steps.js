import React from "react";
import "./Steps.sass";

const steps = [
  {
    id: 1,
    name: "Chama Details",
    stepName: "Step 1",
  },
  {
    id: 2,
    name: "Chama Admin",
    stepName: "Step 2",
  },
  {
    id: 3,
    name: "Chama Accounts",
    stepName: "Step 3",
  },
  {
    id: 4,
    name: "Review Details",
    stepName: "Step 4",
  }
];

const Steps = props => {
  return (
    <ul className="progressbar">
      {steps.map(step => (
        <li key={step.id} className={`${step.id <= props.currentStep && "active"}`}>
          {step.name}
        </li>
      ))}
    </ul>
  );
};

export default Steps;
