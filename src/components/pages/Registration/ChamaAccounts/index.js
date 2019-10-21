import React, { Component } from 'react';
import { connect } from 'react-redux';
import {arrayRemove, Field, reduxForm} from 'redux-form';
import {
  Form,
  FormGroup,
  Col,
  Button,
  Row,
} from 'reactstrap';

import './ChamaAccounts.sass';
import renderFormGroup from '../../../ui/FormControls/renderFormGroup';
import { required, numberGreaterThanZero } from './validate';
import { submitChamaAccounts, addAccount, removeAccount } from '../../../../store/modules/chamaAccounts';
import {numeric} from "../../../../utils/normalization";

class ChamaAccounts extends Component {
  state = {
    maxNoOfAccounts: 5,
  };

  modifyAccounts = (index, action) => {
    const { addAccount, removeAccount, dispatch } = this.props;
    const accounts = [...this.props.accounts];
    const formName = 'chamaAccounts';

    switch(action) {
      case 'add':
        addAccount(accounts);
        break;

      case 'remove':
        dispatch(arrayRemove(formName, `accounts`, index));
        removeAccount(index, accounts);
        break;
    }
  };

  submit = async values => {
    if (JSON.stringify(values) !== JSON.stringify(this.props.initialValues))
      await this.props.submitAccounts(values, this.props.groupId);

    if (this.props.stepSuccess)
      this.props.handleNext();
  };

  render() {
    const { accounts, handleBack } = this.props;

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
                  normalize={numeric}
                  validate={[required, numberGreaterThanZero]}
                  />
                </Col>

                <Col md={4} className="add-account-section">
                  {i === 0 ? 
                  <Button color="primary" outline block onClick={() => this.modifyAccounts(i, 'add')}>
                    <i className="fas fa-plus"></i> Add Account
                  </Button> :
                  <Button color="danger" outline block onClick={() => this.modifyAccounts(i, 'remove')}>
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
  form: "chamaAccounts",
  destroyOnUnmount: true,
})(ChamaAccounts);

const mapStateToProps = state => ({
  initialValues: state.chamaAccounts.info,
  accounts: state.chamaAccounts.info.accounts,
  token: state.auth.accessToken,
  stepSuccess: state.chamaAccounts.stepSuccess,
  groupId: state.chamaDetails.groupId,
});

const mapDispatchToProps = dispatch => ({
  submitAccounts: (values, groupId) =>
    dispatch(submitChamaAccounts(values, groupId)),
  addAccount: accounts => dispatch(addAccount(accounts)),
  removeAccount: (index, accounts) => dispatch(removeAccount(index, accounts)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChamaAccounts);
