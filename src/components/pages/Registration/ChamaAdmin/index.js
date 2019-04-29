import React, { Component } from "react";
import PropTypes from 'prop-types'
import { Row, Col, FormText, Form, Button } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import NotificationAlert from "react-notification-alert";

import renderInputGroup from "../../../ui/FormControls/renderInputGroup";
import validate from "./validate";
import { alreadySubmitted } from '../../../../store/modules/chamaDetails';
import { submitChamaAdminDetails } from "../../../../store/modules/chamaAdmin";
import OTPModal from './Modals/OTPModal';
import { generateAccessToken } from "../../../../store/modules/auth";

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

  submit = async values => {
    const { history, group_id, submitAdminDetails, generateToken } = this.props;

    if (group_id) {
      await generateToken(values.email, values.password);
      await submitAdminDetails(values, group_id);
      return this.openOTPModal();
    }
    
    history.push('/');
  };

  validateEmailAndMobileNo = otp => {
    
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
});

const mapDispatchToProps = dispatch => ({
  submitAdminDetails: (values, group_id) => dispatch(submitChamaAdminDetails(values, group_id)),
  generateToken: (email, password) => dispatch(generateAccessToken(email, password)),
  alreadySubmitted: () => dispatch(alreadySubmitted()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChamaAdmin);
