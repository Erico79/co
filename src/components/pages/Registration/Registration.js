import React, { Component } from "react";
import { Form } from "reactstrap";

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
          <fieldset>
            <legend>
              <h5 className="step-heading text-center">
                <span className="step-number">Step 1 / 4</span>
              </h5>
            </legend>
            <div className="form-group">
              <label for="first_name" className="form-label required">
                First name
              </label>
              <input type="text" name="first_name" id="first_name" />
            </div>

            <div className="form-group">
              <label for="last_name" className="form-label required">
                Last name
              </label>
              <input type="text" name="last_name" id="last_name" />
            </div>

            <div className="form-group">
              <label for="user_name" className="form-label required">
                User name
              </label>
              <input type="text" name="user_name" id="user_name" />
            </div>

            <div className="form-group">
              <label for="password" className="form-label required">
                Password
              </label>
              <input type="password" name="password" id="password" />
            </div>
          </fieldset>
        </Form>
      </div>
    );
  }
}
