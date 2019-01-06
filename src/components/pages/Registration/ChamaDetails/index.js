import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Col, Row, Form, Button } from "reactstrap";

import renderFormGroup from "../../../ui/FormControls/renderFormGroup";
import { submitChamaDetails } from "../../../../store/modules/chamaDetails";
import "./ChamaDetails.sass";
import renderInputGroup from "../../../ui/FormControls/renderInputGroup";
import validate from "./validate";

class ChamaDetails extends Component {
  submit = async values => {
    const { submitChamaDetails, handleNext } = this.props;

    if (this.props.initialValues !== values)
      await submitChamaDetails(values);
    
    if (this.props.stepSuccess) {
      handleNext();
    }
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="ChamaDetails">
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
                type="text"
                id="noOfMembers"
                icon="fa fa-group"
              />
            </Col>
          </Row>

          <Row className="mt-3 mb-3">
            <Col md={{ size: 6, offset: 3 }} xs="12">
              <Button
                color="dark"
                block
                size="lg"
                className="submit-btn"
                disabled={this.props.isLoading}
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

ChamaDetails = reduxForm({
  form: "chamaDetails",
  validate
})(ChamaDetails);

const mapStateToProps = state => ({
  initialValues: state.chamaDetails.info,
  isLoading: state.chamaDetails.isLoading,
  stepSuccess: state.chamaDetails.stepSuccess,
});

const mapDispatchToProps = dispatch => ({
  submitChamaDetails: values => dispatch(submitChamaDetails(values)),
});

ChamaDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChamaDetails);

export default ChamaDetails;
