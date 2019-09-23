import React from 'react';
import {Col, Row} from "reactstrap";
import PropTypes from 'prop-types';
import accountIcon from '../../../../../assets/images/account-icon.svg';

import './Account.sass';

const Account = ({ acc }) => (
  <Row className="account">
    <div className="account-icon">
      <img src={accountIcon} alt="Account Icon" />
    </div>
    <Col>
      <div className="text-muted">{acc.name}</div>
      <div className="font-weight-bold">{acc.contributionAmount}</div>
    </Col>
  </Row>
);

Account.propTypes = {
  acc: PropTypes.shape({
    name: PropTypes.string,
    contributionAmount: PropTypes.string,
  }).isRequired,
};

export default Account;
