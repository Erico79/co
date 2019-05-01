import React, { Component } from "react";
import PropTypes from 'prop-types'
import { Row, Col, FormText, Form, Button } from "reactstrap";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { connect } from "react-redux";
import NotificationAlert from "react-notification-alert";

import renderInputGroup from "../../../ui/FormControls/renderInputGroup";
import validate from "./validate";
import { alreadySubmitted } from '../../../../store/modules/chamaDetails';
import { submitChamaAdminDetails } from "../../../../store/modules/chamaAdmin";
import OTPModal from './Modals/OTPModal';
import { generateAccessToken, validateOTP } from "../../../../store/modules/auth";

let options = {
  place: "tr",
  type: "success",
  icon: "fa fa-bell",
  autoDismiss: 7,
  closeButton: true
};
class ChamaAdmin extends Component {
  static propTypes = {
    history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  }

  state = {
    otpModalIsOpen: false,
  }

  componentDidMount() {
    if (this.props.chamaDetailsSuccess && !this.props.chamaDetailsAlreadySubmitted) {
      options.message = (
        <div>
          <div>
            <b>Success!</b> - {this.props.chamaDetailsSuccessMessage}
          </div>
        </div>
      );
      this.refs.notify.notificationAlert(options);
      this.props.alreadySubmitted();
    }
  };

  submit = async values => {
    const { group_id, submitAdminDetails, generateToken } = this.props;
    const { email, password } = values;

    if (group_id) {
      await submitAdminDetails(values, group_id);
      
      if (this.props.stepSuccess) {
        await generateToken(email, password);

        if (this.props.accessToken)
          return this.openOTPModal();
      }
    }
    
    if (this.props.errors) {
      const { email, first_name, last_name, mobile_phone, password, password_confirmation } = this.props.errors;

      if (email) 
        throw new SubmissionError({ email: email[0] })

      if (first_name) 
        throw new SubmissionError({ firstName: first_name[0] })

      if (last_name) 
        throw new SubmissionError({ lastName: last_name[0] })

      if (mobile_phone) 
        throw new SubmissionError({ mobilePhone: mobile_phone[0] })

      if (mobile_phone) 
        throw new SubmissionError({ password: password[0] })

      if (password_confirmation) 
        throw new SubmissionError({ confirmPassword: password_confirmation[0] })
    }
  };

  validateEmailAndMobileNo = otp => {
    
  }

  openOTPModal = () => {
    this.setState({ otpModalIsOpen: true });
  }

  closeOtpModal = () => {
    this.setState({ otpModalIsOpen: false });
  }

  render() {
    const { handleSubmit, handleBack } = this.props;

    return (
      <div className="ChamaAdmin">
        <NotificationAlert ref="notify" />
        <OTPModal 
          closeModal={this.closeOtpModal} 
          isModalOpen={this.state.otpModalIsOpen}
          className="otp-modal"
          phoneNo={this.props.initialValues.mobilePhone}
          validateOTP={this.props.validateOTP}
          error={this.props.otp.errorMessage}
          validOTP={this.props.otp.validOTP}
          handleNext={this.props.handleNext}
          accessToken={this.props.accessToken}
        />
        <h3 className="text-center">Chama Administrator</h3>
        <h5 className="step-heading text-center mb-4">
          <span className="step-number">
            Step <strong>2</strong> / 4
          </span>
        </h5>
        <Form onSubmit={handleSubmit(this.submit)}>
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
                label="Last Name"
                name="lastName"
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
                  The password must be at least <strong>6 characters</strong>{" "}
                  long. It should have at least a <b>Capital Letter</b> & a{" "}
                  <b>Number</b>.
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
              <Button block className="btn-outline-primary" size="lg" onClick={handleBack}>
                <i className="fa fa-arrow-left" /> Back
              </Button>
            </Col>
            <Col md={{ size: 6 }} xs="6">
              <Button
                block
                size="lg"
                disabled={this.props.isLoading}
                className="btn-primary"
              >
                Next{" "}
                {!this.props.isLoading ? (
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
  }
}

ChamaAdmin = reduxForm({
  form: "chamaAdmin",
  validate
})(ChamaAdmin);

const mapStateToProps = state => ({
  initialValues: state.chamaAdmin.info,
  isLoading: state.chamaAdmin.isLoading,
  chamaDetailsSuccess: state.chamaDetails.stepSuccess,
  chamaDetailsSuccessMessage: state.chamaDetails.message,
  chamaDetailsAlreadySubmitted: state.chamaDetails.alreadySubmitted,
  group_id: state.chamaDetails.group.id,
  stepSuccess: state.chamaAdmin.stepSuccess,
  otpIsValid: state.chamaAdmin.otpIsValid,
  accessToken: state.auth.accessToken,
  errors: state.chamaAdmin.errors,
  errorMessage: state.chamaAdmin.errorMessage,
  otp: state.auth.otp,
});

const mapDispatchToProps = dispatch => ({
  submitAdminDetails: (values, group_id) => dispatch(submitChamaAdminDetails(values, group_id)),
  generateToken: (email, password) => dispatch(generateAccessToken(email, password)),
  alreadySubmitted: () => dispatch(alreadySubmitted()),
  validateOTP: (otp, token) => dispatch(validateOTP(otp, token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChamaAdmin);
