import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {
    Label,
    Input,
    Col,
    InputGroup,
    Row,
    Form,
    Button,
} from "reactstrap";

import renderFormGroup from '../../../ui/FormControls/renderFormGroup';
import { submitChamaDetails } from '../../../../store/modules/chamaDetails';

let ChamaDetails = props => {
    const { handleSubmit, load, pristine, reset, submitting, formValues, currentStep } = props;
    let nextOptions = { size: 6 };
    let xs = 6;

    return ( 
        <div className="ChamaDetails">
            <h3 className="text-center">Chama Details</h3>
            <h5 className="step-heading text-center mb-4">
                <span className="step-number">Step <strong>1</strong> / 4</span>
            </h5>

            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={{ size: 6, offset: 3 }}>
                        <Field 
                            name="chamaName"
                            label="Chama Name"
                            component={renderFormGroup}
                            type="text"
                            id="firstName"
                        />

                        <Label for="noOfMembers">Number of Members</Label>
                        <InputGroup className="mb-3">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                <i className="fa fa-group"></i>
                                </div>
                            </div>
                            <Input type="number" id="noOfMembers" min="2" />
                        </InputGroup>
                    </Col>
                </Row>

                <Row className="mt-3 mb-3">
                    <Col md={{ size: 6 }} xs="6" className="mb-3">
                        <Button type="button" color="dark" outline block size="lg" onClick={this.handleBack}>
                        <i className="fa fa-arrow-left"></i> Back
                        </Button>
                    </Col>
                    <Col md={{ size: 6, offset: 3 }} xs="12">
                        <Button 
                            type="button" 
                            color="dark"
                            block 
                            size="lg"
                            onClick={this.handleNext}
                        >
                            Save and Continue <i className="fa fa-arrow-right"></i>
                        </Button>
                    </Col>
          </Row>
            </Form>
        </div>
    );
}

ChamaDetails = reduxForm({
    form: 'chamaDetails',
})(ChamaDetails);

const mapStateToProps = state => ({
    initialValues: state.chamaDetails.info
});

const mapDispatchToProps = dispatch => ({
    submitChamaDetails: values => dispatch(submitChamaDetails(values))
})

ChamaDetails = connect(mapStateToProps, mapDispatchToProps)(ChamaDetails)

export default ChamaDetails;