import React, { Component } from "react";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { connect } from "react-redux";
import { Col, Row, Form, Button } from "reactstrap";
import NotificationAlert from 'react-notification-alert';

import renderFormGroup from "../../../ui/FormControls/renderFormGroup";
import { submitChamaDetails } from "../../../../store/modules/chamaDetails";
import "./ChamaDetails.sass";
import renderInputGroup from "../../../ui/FormControls/renderInputGroup";
import validate from "./validate";

class ChamaDetails extends Component {
  submit = async values => {
    const { submitChamaDetails, handleNext } = this.props;

    if (this.props.initialValues !== values) {
      if (this.props.group == null) {
        await submitChamaDetails(values);
      } else {
        await submitChamaDetails(values, this.props.group.id);
      }
    }

    if (Object.keys(this.props.errors).length) {
      const { name, no_of_members } = this.props.errors;

      if (name) {
        throw new SubmissionError({
          chamaName: name,
        });
      }

      if (no_of_members) {
        throw new SubmissionError({
          noOfMembers: no_of_members,
        })
      }
    }
    
    if (this.props.stepSuccess) {
      handleNext();
    }

    if (this.props.errorMessage) {
      this.refs.notify.notificationAlert({
        place: 'tr',
        type: 'danger',
        icon: 'fa fa-bell',
        autoDismiss: 7,
        message: <div>
          <div>
            <b>Error!</b> - {this.props.errorMessage}
            </div>
          </div>,
        closeButton: true,
      })
    }
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="ChamaDetails">
        <NotificationAlert ref="notify" />
        <h3 className="text-center">Chama Details</h3>
        <h5 className="step-heading text-center mb-4">
          <span className="step-number">
            Step <strong>1</strong> / 4
          </span>
        </h5>

        <Form onSubmit={handleSubmit(this.submit)}>
          <Row>
            <Col md={{ size: 6, offset: 3 }}>
              <Field
                name="chamaName"
                label="Chama Name"
                component={renderFormGroup}
                type="text"
                id="firstName"
              />

              <Field
                name="noOfMembers"
                label="Number of Members"
                component={renderInputGroup}
                type="number"
                id="noOfMembers"
                icon="fas fa-users"
              />
            </Col>
          </Row>

          <Row className="mt-3 mb-3">
            <Col md={{ size: 6, offset: 3 }} xs="12">
              <Button
                color="dark"
                block
                size="lg"
                className="submit-btn btn-primary"
                disabled={this.props.isLoading}
              >
                Next{" "}
                {this.props.isLoading && (
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

ChamaDetails = reduxForm({
  form: "chamaDetails",
  validate
})(ChamaDetails);

const mapStateToProps = state => ({
  initialValues: state.chamaDetails.info,
  isLoading: state.chamaDetails.isLoading,
  stepSuccess: state.chamaDetails.stepSuccess,
  group: state.chamaDetails.group,
  errors: state.chamaDetails.errors,
  errorMessage: state.chamaDetails.errorMessage,
});

const mapDispatchToProps = dispatch => ({
  submitChamaDetails: (values, groupId) => dispatch(submitChamaDetails(values, groupId)),
});

ChamaDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChamaDetails);

export default ChamaDetails;
