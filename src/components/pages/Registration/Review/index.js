import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Button
} from 'reactstrap';

import './Review.sass';

class Review extends Component {
  static defaultProps = {
    chamaInfo: {
      chamaName: 'Test Name',
      noOfMembers: 4
    },
    adminInfo: {
      firstName: "Eric",
      lastName: "Murimi",
      email: "emurinyo@gmail.com",
      mobilePhone: "254712883777",
      password: "pass123",
      confirmPassword: "pass123"
    },
    accountsInfo: [
      {
        name: 'Account 1',
        contribution_amount: 400,
      },
      {
        name: 'Account 2',
        contribution_amount: 1400,
      },
    ]
  }

  render() {
    const { chamaName, noOfMembers } = this.props.chamaInfo;
    const { firstName, lastName, email, mobilePhone } = this.props.adminInfo;
    const accounts = this.props.accountsInfo;

    return (
      <div className="Review">
        <h3 className="text-center">Review Details</h3>
        <h5 className="step-heading text-center mb-4">
          <span className="step-number">
            Step <strong>4</strong> / 4
          </span>
        </h5>
        <h6 className="text-center">Take some time and verify that all the information provided is correct before submitting it.</h6>

        <div className="review-section">
          <h3 className="text-left">Chama Details</h3>
          <div className="section">
            <Row>
              <Col>
                <span className="text-muted">Chama Name</span>
                <span className="font-weight-bold ml-2">{chamaName}</span>
              </Col>
              <Col className="text-right">
                <span className="text-muted">Number of Members</span>
                <span className="font-weight-bold ml-2">{noOfMembers}</span>
              </Col>
            </Row>
          </div>

          <h3 className="text-left">Administrator Details</h3>
          <div className="section">
            <Row>
              <Col>
                <span className="text-muted">First Name</span>
                <span className="font-weight-bold ml-2">{firstName}</span>
              </Col>
              <Col className="text-right">
                <span className="text-muted">Last Name</span>
                <span className="font-weight-bold ml-2">{lastName}</span>
              </Col>
            </Row>

            <Row>
              <Col>
                <span className="text-muted">Email Address</span>
                <span className="font-weight-bold ml-2">{email}</span>
              </Col>
              <Col className="text-right">
                <span className="text-muted">Mobile Phone</span>
                <span className="font-weight-bold ml-2">{mobilePhone}</span>
              </Col>
            </Row>
        </div>

        <div className="section">
          <h3>Chama Accounts</h3>
          {accounts.map((acc, i) => (
            <Row>
              <Col>
                <span className="text-muted">{i+1}. Name of Account</span>
                <span className="font-weight-bold ml-2">{acc.name}</span>
              </Col>
              <Col className="text-right">
                <span className="text-muted">Contribution Amount</span>
                <span className="font-weight-bold ml-2">{acc.contribution_amount}</span>
              </Col>
            </Row>
          ))}
        </div>
      </div>

      <Row className="mt-3 mb-3">
        <Col md={{ size: 6 }} xs="6">
          <Button block className="btn-outline-primary" size="lg" onClick={this.props.handleBack}>
            <i className="fa fa-arrow-left" /> Back
          </Button>
        </Col>
        <Col md={{ size: 6 }} xs="6">
          <Button
            block
            size="lg"
            disabled={this.props.isLoading}
            className="btn-success"
          >
            Finish{" "}
            {!this.props.isLoading ? (
              <i className="fas fa-check" />
            ) : (
              <i className="fal fa-circle-o-notch fa-spin" />
            )}
          </Button>
        </Col>
      </Row>
    </div>
    )
  }
}

const mapStateToProps = state => ({
  chamaInfo: state.chamaDetails.info,
  adminInfo: state.chamaAdmin.info,
  accountsInfo: state.chamaAccounts.info,
})

export default connect(mapStateToProps)(Review);
