import React, { Fragment } from "react";
import { Label, Input, InputGroup } from "reactstrap";

import './FormControls.sass';
import './renderInputGroup.sass';

const renderInputGroup = props => {
  const {
    label,
    input,
    type,
    id,
    icon,
    meta: { touched, warning, error },
    children,
  } = props;

  const validity = touched ? (error ? "is-invalid" : "is-valid") : "";
  return (
    <Fragment>
      <Label for={id}>{label}</Label>
      <InputGroup className="mb-3">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className={icon} />
          </div>
        </div>
        <Input
          {...input}
          type={type}
          id={id}
          className={validity}
          autoComplete="off"
        />
        {(touched &&
          (error && <div className="invalid-feedback">{error}</div>)) ||
          (warning && <div className="text-danger">{warning}</div>)}
        {children}
      </InputGroup>
    </Fragment>
  );
};

export default renderInputGroup;
