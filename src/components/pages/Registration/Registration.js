import React, { Component } from "react";
import { Form, Col, Button, Row } from "reactstrap";

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
        return <ChamaDetails />;

      case 2:
        return <ChamaAdmin />;

      default:
        return null;
    }
  }

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
          <Steps currentStep={currentStep} />

          {this.switchComponents()}

          <Row className="mt-3 mb-3">
            {currentStep > 1 && (
              <Col md={{ size: 6 }} xs="6" className="mb-3">
                <Button type="button" color="dark" outline block size="lg" onClick={this.handleBack}>
                  <i className="fa fa-arrow-left"></i> Back
                </Button>
              </Col>
            )}
            <Col md={nextOptions} xs={xs}>
              <Button type="button" color="dark" block size="lg" onClick={this.handleNext}>
                Next <i className="fa fa-arrow-right"></i>
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
