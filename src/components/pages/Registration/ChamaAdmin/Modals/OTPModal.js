import React, { Component } from "react";
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
      render() {
        const { closeModal, isModalOpen, email } = this.props;

        return (
          <div>
            <Modal centered isOpen={isModalOpen} toggle={closeModal} className={this.props.className}>
              <ModalHeader toggle={this.toggle}>
                <div className="mb-4"><i className="fa fa-envelope-o fa-4x"></i></div>
                Please verify your email address to continue with the registration
                </ModalHeader>
              <ModalBody>
                <p>An email with a verification code has been sent to <b>{email}</b>.</p>
                <Input
                    name="otp"
                    placeholder="Enter the Code here"
                    className="otp-input"
                    type="number"
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