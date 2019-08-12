import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {
  Form,
  FormGroup,
  Col,
  Button,
  Row,
} from 'reactstrap';

import './ChamaAccounts.sass';
import renderFormGroup from '../../../ui/FormControls/renderFormGroup';
import { required } from './validate';
import { submitChamaAccounts } from '../../../../store/modules/chamaAccounts';

class ChamaAccounts extends Component {
  state = {
    accounts: this.props.initialValues.accounts,
    maxNoOfAccounts: 5,
  }

  addAccountHandler = async () => {
    const accounts = [...this.state.accounts];
    accounts.push({});

    if (accounts.length <= this.state.maxNoOfAccounts)
      await this.setState({ accounts });
  }

  removeAccountHandler = async (accIndex) => {
    const accounts = [...this.state.accounts];
    const leftAccounts = accounts.filter((acc, i) => i !== accIndex);

    await this.setState({ accounts: leftAccounts });
  }

  submit = async values => {
    await this.props.submitAccounts(values, this.props.groupId);

    if (this.props.stepSuccess)
      this.props.handleNext();
  }

  render() {
    const { accounts } = this.state;
    const { handleBack } = this.props;

    return (
      <div className="ChamaAccounts">
        <h3 className="text-center">Chama Accounts</h3>
        <h5 className="step-heading text-center mb-4">
          <span className="step-number">
            Step <strong>3</strong> / 4
          </span>
        </h5>

      <div className="accounts-section">
        <Form className="accounts-form" onSubmit={this.props.handleSubmit(this.submit)}>
          {accounts.map((acc, i) => (
            <React.Fragment>
              <FormGroup row key={i}>
                <Col md={4}>
                  <Field
                    label={<React.Fragment><b>{i + 1}</b>. Name of Account</React.Fragment>}
                    name={`accounts[${i}].name`}
                    id="account-name"
                    component={renderFormGroup}
                    type="text"
                    validate={required}
                  />
                </Col>

                <Col md={4}>
                <Field
                  label="Contribution Amount"
                  name={`accounts[${i}].contributionAmount`}
                  id="contribution-amount"
                  component={renderFormGroup}
                  type="text"
                  validate={required}
                  />
                </Col>

                <Col md={4} className="add-account-section">
                  {i === 0 ? 
                  <Button color="primary" outline block onClick={this.addAccountHandler}>
                    <i className="fas fa-plus"></i> Add Account
                  </Button> :
                  <Button color="danger" outline block onClick={() => this.removeAccountHandler(i)}>
                    <i className="fas fa-minus"></i> Remove Account
                  </Button>}
                </Col>
              </FormGroup>
              {accounts.length === i + 1 ? null : <hr />}
            </React.Fragment>
            ))
          }

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
                  <i className="fas fa-arrow-right" />
                ) : (
                  <i className="fal fa-circle-o-notch fa-spin" />
                )}
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
      </div>
    )
  }
}

ChamaAccounts = reduxForm({
  form: "chamaAccounts"
})(ChamaAccounts);

const mapStateToProps = state => ({
  initialValues: state.chamaAccounts.info,
  token: state.auth.accessToken,
  stepSuccess: state.chamaAccounts.stepSuccess,
  groupId: state.chamaDetails.groupId,
});

const mapDispatchToProps = dispatch => ({
  submitAccounts: (values, groupId) => 
    dispatch(submitChamaAccounts(values, groupId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChamaAccounts);