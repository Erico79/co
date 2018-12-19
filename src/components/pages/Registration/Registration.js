import React, { Component } from "react";
import { 
  Form, 
  FormGroup, 
  Label,
  Input,
  Row,
  Col,
  InputGroup,
  Button,
} from "reactstrap";

import Steps from "./Steps/Steps";
import "./Registration.sass";

export default class Registration extends Component {
  render() {
    return (
      <div className="RegistrationWizard mt-4">
        <h2 className="text-center font-weight-bold">Register your Chama</h2>
        <Form method="POST" id="signup-form" className="signup-form">
          <Steps />
          <h3 className="text-center">Chama Details</h3>
          <h5 className="step-heading text-center mb-4">
            <span className="step-number">Step 1 / 4</span>
          </h5>

          <Row>
            <Col>
              <FormGroup>
                <Label for="chamaName">Chama Name</Label>
                <Input type="text" id="chamaName" className="font-weight-bold" />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="regNo">Registration Number</Label>
                <Input type="text" id="regNo" className="font-weight-bold" />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <Label for="noOfMembers">Number of Members</Label>
              <InputGroup>
                <div class="input-group-prepend">
                  <div class="input-group-text">
                    <i className="fa fa-group"></i>
                  </div>
                </div>
                <Input type="number" id="noOfMembers" min="2" className="font-weight-bold" />
              </InputGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="website">Chama's Website Address</Label>
                <Input type="text" id="website" className="font-weight-bold" />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <Label for="chamaEmail">Chama's Email Address</Label>
              <InputGroup>
                <div class="input-group-prepend">
                  <div class="input-group-text">
                    <i className="fa fa-envelope"></i>
                  </div>
                </div>
                <Input type="email" id="chamaEmail" className="font-weight-bold" />
              </InputGroup>
            </Col>
            <Col>
              <Label for="chamaPhoneNo">Chama's Phone Number</Label>
              <InputGroup>
                <div class="input-group-prepend">
                  <div class="input-group-text">
                    <i className="fa fa-phone"></i>
                  </div>
                </div>
                <Input type="text" id="chamaPhoneNo" className="font-weight-bold" />
              </InputGroup>
            </Col>
          </Row>

          <FormGroup className="mt-4 mb-4" check row>
            <Col sm={{ size: 6 }} className="p-0 ml-0 pull-left">
              <Button color="dark" outline block>Back</Button>
            </Col>
            <Col sm={{ size: 6 }} className="pull-right">
              <Button color="dark" block>Submit</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
