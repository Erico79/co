import React, { Fragment } from "react";
import { Label, Input, InputGroup } from "reactstrap";

const renderInputGroup = props => {
  const {
    label,
    input,
    type,
    id,
    icon,
    meta: { touched, warning, error }
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
          id={type}
          className={validity}
          autoComplete="off"
        />
        {(touched &&
          (error && <div className="invalid-feedback">{error}</div>)) ||
          (warning && <div className="text-danger">{warning}</div>)}
      </InputGroup>
    </Fragment>
  );
};

export default renderInputGroup;
