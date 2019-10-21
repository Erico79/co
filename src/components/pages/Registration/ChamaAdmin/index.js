import React, { Component } from "react";
import PropTypes from 'prop-types'
import { Row, Col, FormText, Form, Button, Alert } from "reactstrap";
import { 
  Field, 
  reduxForm,
  formValueSelector, 
  getFormValues, 
  stopSubmit 
} from "redux-form";
import { connect } from "react-redux";

import renderInputGroup from "../../../ui/FormControls/renderInputGroup";
import validate from "./validate";
import { alreadySubmitted } from '../../../../store/modules/chamaDetails';
import { submitChamaAdminDetails } from "../../../../store/modules/chamaAdmin";
import OTPModal from './Modals/OTPModal';
import {
  validateOTP,
  sendOTP
} from "../../../../store/modules/auth";
import "./ChamaAdmin.sass";

class ChamaAdmin extends Component {
  static propTypes = {
    history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  };

  state = {
    otpModalIsOpen: false,
    successAlertVisible: false,
    errorAlertVisible: false,
  };

  componentDidMount() {
    if (this.props.chamaDetailsSuccess && !this.props.stepSuccess)
      this.setState({ successAlertVisible: !this.state.successAlertVisible });
  }

  sendOTP = async values => {
    if (values.mobilePhone !== this.props.initialValues.mobilePhone) {
      await this.props.sendOTP(values.mobilePhone);
    
      if (this.props.otp.errorMessage)
        return this.setState({ successAlertVisible: false, errorAlertVisible: true });

      this.openOTPModal();
    } else {
      this.submitAdminInfo();
    }
  };

  openOTPModal = () => {
    this.setState({ otpModalIsOpen: true });
  };

  closeOtpModal = () => {
    this.setState({ otpModalIsOpen: false });
  };

  onDismissSuccessAlert = () => {
    this.setState({ successAlertVisible: false });
  };

  onDismissErrorAlert = () => {
    this.setState({ errorAlertVisible: false });
  };

  validateOTPAndSaveAdmin = async (otp, mobilePhone) => {
    await this.props.validateOTP(otp, mobilePhone);

    if (this.props.otp.valid) 
      this.submitAdminInfo();
  };

  submitAdminInfo = async () => {
    const values = this.props.adminDetails;
    const oldValues = this.props.initialValues;

    if (values.firstName !== oldValues.firstName ||
      values.lastName !== oldValues.lastName ||
      values.email !== oldValues.email ||
      values.mobilePhone !== oldValues.mobilePhone ||
      values.password !== oldValues.password ||
      values.confirmPassword !== oldValues.confirmPassword
      )
      await this.props.submitAdminDetails(values, this.props.chamaDetails);
    else 
      return this.props.handleNext();

    this.closeOtpModal();
    this.onDismissErrorAlert();
    this.onDismissSuccessAlert();

    if (this.props.stepSuccess)
      return this.props.handleNext();

    if (this.props.errors) {
      const { email, mobilePhone } = this.props.errors;

      if (email && email[0])
        this.props.throwFormError('email', email[0]);

      if (mobilePhone && mobilePhone[0])
        this.props.throwFormError('mobilePhone', mobilePhone[0]);
    }

    if (this.props.errorMessage)
      this.setState({ errorAlertVisible: true });
  };

  render() {
    const { handleSubmit, handleBack, chamaDetails: { chamaName } } = this.props;

    return (
      <div className="ChamaAdmin">
        <Alert 
          className="success-alert" 
          color="info" 
          isOpen={this.state.successAlertVisible} 
          toggle={this.onDismissSuccessAlert}>
          <h4 className="alert-heading">Well done!</h4>
          <p>
            The Chama name <strong>{chamaName}</strong> is available.
          </p>
          <hr />
          <p className="mb-0">
            Now fill in the <strong>Group Admin's</strong> information below.
          </p>
        </Alert>

        <Alert 
          className="success-alert" 
          color="danger" 
          isOpen={this.state.errorAlertVisible} 
          toggle={this.onDismissErrorAlert}>
          <h4 className="alert-heading">Uh oh!</h4>
          <p>
            Encountered an error while processing the information.
          </p>
          <hr />
          <p className="mb-0">
            Please try again later.
          </p>
        </Alert>

        {this.props.mobilePhone ? <OTPModal 
          closeModal={this.closeOtpModal} 
          sendOTP={this.props.sendOTP}
          isModalOpen={this.state.otpModalIsOpen}
          className="otp-modal"
          phoneNo={this.props.mobilePhone}
          validateOTP={this.validateOTPAndSaveAdmin}
          error={this.props.otp.errorMessage}
          validOTP={this.props.otp.valid}
          handleNext={this.props.handleNext}
          otp={this.props.otp}
        /> : null}
        <h3 className="text-center">Chama Administrator</h3>
        <h5 className="step-heading text-center mb-4">
          <span className="step-number">
            Step <strong>2</strong> / 4
          </span>
        </h5>
        <Form onSubmit={handleSubmit(this.sendOTP)}>
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
                {!this.props.isLoading || !this.props.otp.sending ? (
                  <i className="fas fa-arrow-right" />
                ) : (
                  <i className="fal fa-circle-o-notch fa-spin" />
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
  chamaDetailsAlreadySubmitted: state.chamaDetails.alreadySubmitted,
  chamaDetails: state.chamaDetails.info,
  stepSuccess: state.chamaAdmin.stepSuccess,
  otpIsValid: state.chamaAdmin.otpIsValid,
  accessToken: state.auth.accessToken,
  errors: state.chamaAdmin.errors,
  errorMessage: state.chamaAdmin.errorMessage,
  adminExists: state.chamaAdmin.adminExists,
  otp: state.auth.otp,
  groupId: state.chamaDetails.groupId,
  mobilePhone: formValueSelector('chamaAdmin')(state, 'mobilePhone'),
  adminDetails: getFormValues('chamaAdmin')(state),
});

const mapDispatchToProps = dispatch => ({
  submitAdminDetails: (values, chamaDetails) => dispatch(submitChamaAdminDetails(values, chamaDetails)),
  alreadySubmitted: () => dispatch(alreadySubmitted()),
  validateOTP: (otp, phoneNo) => dispatch(validateOTP(otp, phoneNo)),
  sendOTP: phoneNo => dispatch(sendOTP(phoneNo)),
  throwFormError: (fieldName, errorMessage) =>
    dispatch(stopSubmit('chamaAdmin', { [fieldName]: errorMessage })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChamaAdmin);
