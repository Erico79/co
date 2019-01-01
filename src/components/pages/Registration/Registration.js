import React, { Component } from "react";
import { Form, Col, Button, Row } from "reactstrap";

import Steps from "./Steps/Steps";
import ChamaDetails from "./ChamaDetails";

import "./Registration.sass";

export default class Registration extends Component {
  state = {
    currentStep: 1
  };

  render() {
    let nextOptions = { size: 6 };
    let xs = 6;
    const { currentStep } = this.state;

    if (currentStep === 1) {
      nextOptions.offset = 3;
      xs = 12;
    }

    return (
      <div className="RegistrationWizard">
        <h2 className="text-center font-weight-bold">Register your Chama</h2>
        <Form method="POST" id="signup-form" className="signup-form">
          <Steps />
          <h3 className="text-center">Chama Details</h3>
          <h5 className="step-heading text-center mb-4">
            <span className="step-number">Step 1 / 4</span>
          </h5>

          <ChamaDetails />

          <Row className="mt-3 mb-3">
            {currentStep > 1 && (
              <Col md={{ size: 6 }} xs="6" className="mb-3">
                <Button type="button" color="dark" outline block size="lg">
                <i className="fa fa-arrow-left"></i> Back
                </Button>
              </Col>
            )}
            <Col md={nextOptions} xs={xs}>
              <Button type="button" color="dark" block size="lg">
                Next <i className="fa fa-arrow-right"></i>
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
