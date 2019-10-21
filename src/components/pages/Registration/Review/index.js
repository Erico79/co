import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Button
} from 'reactstrap';

import './Review.sass';
import Account from "./Account/";

class Review extends Component {
  redirectToLogin() {
    this.history.push('/login');
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
        <h6 className="text-center headline">Take some time and verify that all the information provided is correct before submitting it.</h6>

        <div className="review-section">
          <h3 className="text-left">Group & Admin Details</h3>
          <div className="section">
            <Row>
              <Col sm="6" xs="12" className="details">
                <div className="text-muted">Chama Name</div>
                <div className="font-weight-bold">{chamaName}</div>
              </Col>
              <Col sm="6" xs="12" className="text-right details">
                <div className="text-muted">Number of Members</div>
                <div className="font-weight-bold">{noOfMembers}</div>
              </Col>
            </Row>
          </div>

          <div className="section">
            <Row>
              <Col sm="6" xs="12" className="details">
                <div className="text-muted">First Name</div>
                <div className="font-weight-bold">{firstName}</div>
              </Col>
              <Col sm="6" xs="12" className="text-right details">
                <div className="text-muted">Last Name</div>
                <div className="font-weight-bold">{lastName}</div>
              </Col>
            </Row>

            <Row>
              <Col sm="6" xs="12" className="details">
                <div className="text-muted">Email Address</div>
                <div className="font-weight-bold">{email}</div>
              </Col>
              <Col sm="6" xs="12" className="text-right details">
                <div className="text-muted">Mobile Phone</div>
                <div className="font-weight-bold">{mobilePhone}</div>
              </Col>
            </Row>
        </div>
        </div>

        <div className="review-section">
          <div className="section">
            <h3>Chama Accounts</h3>
            <Row>
              {accounts.map((acc, i) => (
                <Col md="6" key={acc.name}>
                  <Account acc={acc} i={i} />
                </Col>
              ))}
            </Row>
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
            onClick={this.redirectToLogin}
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
  accountsInfo: state.chamaAccounts.info.accounts,
});

export default connect(mapStateToProps)(Review);
