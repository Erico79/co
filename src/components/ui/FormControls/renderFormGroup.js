import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

import './FormControls.sass';

const renderFormGroup = props => {
  const {
    label,
    input,
    type,
    id,
    meta: { touched, warning, error }
  } = props;

  const validity = touched ? (error ? "is-invalid" : "is-valid") : ""
  return (
    <FormGroup>
      <Label for={id}>{label}</Label>
      <Input
        {...input}
        type={type}
        id={id}
        className={validity}
        autoComplete="off"
      />
      {(touched &&
        (error && (
          <div className="invalid-feedback">{error}</div>
        ))) ||
        (warning && <div className="text-danger">{warning}</div>)}
    </FormGroup>
  );
};

export default renderFormGroup;
