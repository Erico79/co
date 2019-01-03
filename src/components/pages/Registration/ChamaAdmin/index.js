import React from "react";
import { Row, Col, FormText, Form, Button } from "reactstrap";
import { Field, reduxForm } from "redux-form";

import renderInputGroup from "../../../ui/FormControls/renderInputGroup";
import validate from "./validate";

let ChamaAdmin = props => {
  const { handleSubmit, handleBack, handleNext } = props;

  const submit = values => {
    // open OTP modal to verify the mobile phone number and the email address
    handleNext();
  };

  return (
    <div className="ChamaAdmin">
      <h3 className="text-center">Chama Administrator</h3>
      <h5 className="step-heading text-center mb-4">
        <span className="step-number">
          Step <strong>2</strong> / 4
        </span>
      </h5>
      <Form onSubmit={handleSubmit(submit)}>
        <Row>
          <Col md="6">
            <Field
              label="First Name"
              name="firstName"
              id="firstName"
              component={renderInputGroup}
              icon="fa fa-user-circle"
              type="text"
            />
          </Col>
          <Col md="6">
            <Field
              label="Other Names"
              name="otherNames"
              id="otherNames"
              component={renderInputGroup}
              icon="fa fa-user-circle"
              type="text"
            />
          </Col>
        </Row>

        <Row>
          <Col md="6">
            <Field
              label="Email Address"
              name="email"
              id="email"
              component={renderInputGroup}
              icon="fa fa-envelope"
              type="email"
            />
          </Col>
          <Col md="6">
            <Field
              label="Mobile Phone"
              name="mobilePhone"
              id="mobilePhone"
              component={renderInputGroup}
              icon="fa fa-mobile"
              type="text"
            />
          </Col>
        </Row>

        <Row>
          <Col md="6">
            <Field
              label="Password"
              name="password"
              id="password"
              component={renderInputGroup}
              icon="fa fa-lock"
              type="password"
            >
              <FormText color="muted">
                The password must be at least <strong>6 characters</strong> long. 
                It should have at least a <b>Capital Letter</b> & a <b>Number</b>.
              </FormText>
            </Field>
          </Col>
          <Col md="6">
            <Field
              label="Confirm Password"
              name="confirmPassword"
              id="confirmPassword"
              component={renderInputGroup}
              icon="fa fa-lock"
              type="password"
            />
          </Col>
        </Row>

        <Row className="mt-3 mb-3">
          <Col md={{ size: 6 }} xs="6">
            <Button color="dark" block outline size="lg" onClick={handleBack}>
              <i className="fa fa-arrow-left" /> Back
            </Button>
          </Col>
          <Col md={{ size: 6 }} xs="6">
            <Button color="dark" block size="lg" disabled={props.isLoading}>
              Next{" "}
              {!props.isLoading ? (
                <i className="fa fa-arrow-right" />
              ) : (
                <i className="fa fa-circle-o-notch fa-spin" />
              )}
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

ChamaAdmin = reduxForm({
  form: "chamaAdmin",
  validate
})(ChamaAdmin);

export default ChamaAdmin;
