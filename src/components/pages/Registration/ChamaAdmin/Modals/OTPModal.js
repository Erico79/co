import React, { Component } from "react";
import PropTypes from 'prop-types';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
} from 'reactstrap';

import './OTPModal.sass';

class OTPModal extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    isModalOpen: PropTypes.bool.isRequired,
    phoneNo: PropTypes.string.isRequired,
  }

  handleOTPChange = (event) => {
    if (!Number(event.target.value))
      event.preventDefault();
  }

  render() {
    const { closeModal, isModalOpen, phoneNo } = this.props;

    return (
      <div>
        <Modal centered isOpen={isModalOpen} toggle={closeModal} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>
            <div className="mb-4"><i className="fas fa-sms fa-4x" style={{ color: '#9e15ff' }}></i></div>
            Please verify your mobile phone number to continue with the registration
            </ModalHeader>
          <ModalBody>
            <p>An SMS with a verification code has been sent to <b>+{phoneNo}</b>.</p>
            <Input
              name="otp"
              placeholder="Enter the Code here"
              className="otp-input"
              type="text"
              maxLength={4}
              onChange={this.handleOTPChange}
            />
          </ModalBody>
          <ModalFooter>
            <Button outline className="send-otp-btn pull-left btn-outline-primary">Resend Code</Button>
            <div className="pull-right">
                <Button color="secondary" className="cancel-otp-btn" onClick={closeModal}>Cancel</Button>
                <Button color="primary" className="submit-otp-btn">Continue</Button>
            </div>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
};

export default OTPModal;