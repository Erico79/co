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
    validateOTP: PropTypes.func.isRequired,
  }

  state = {
    otp: null,
  }

  handleOTPChange = async event => {
    if (!Number(event.target.value) || event.target.value.length > 4)
      return event.preventDefault();

    await this.setState({ otp: event.target.value });

    const { otp } = this.state;
    if (otp && otp.length === 4) {
      await this.props.validateOTP(otp, this.props.accessToken);

      if (this.props.validOTP) {
        this.props.closeModal();
        this.props.handleNext();        
      }
    }
  }

  resendOTP = async () => {
    await this.props.resendOTP(this.props.phoneNo, this.props.accessToken);
  }

  render() {
    const { closeModal, isModalOpen, phoneNo, error, otp: { resending } } = this.props;

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
              onChange={this.handleOTPChange}
              value={this.state.otp}
            />
            <div className="invalid-feedback">{error}</div>
          </ModalBody>
          <ModalFooter>
            <Button 
              outline 
              className="send-otp-btn pull-left btn-outline-primary"
              onClick={this.resendOTP}
              disabled={resending}
              >Resend Code</Button>
            <div className="pull-right">
                <Button color="secondary" className="cancel-otp-btn" onClick={closeModal}>Close</Button>
            </div>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
};

export default OTPModal;