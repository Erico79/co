import React from 'react';
import {
    Row,
    Col,
    Label,
    Input,
    InputGroup
} from 'reactstrap';

const ChamaAdmin = () => {
    return (
        <div className="ChamaAdmin">
            <h3 className="text-center">Chama Administrator</h3>
            <h5 className="step-heading text-center mb-4">
                <span className="step-number">Step <strong>2</strong> / 4</span>
            </h5>

            <Row>
                <Col md="6">
                    <Label for="firstName">First Name</Label>
                    <InputGroup className="mb-3">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <i className="fa fa-user-circle"></i>
                            </div>
                        </div>
                        <Input type="text" id="firstName" />
                    </InputGroup>
                </Col>
                <Col md="6">
                    <Label for="otherNames">Other Names</Label>
                    <InputGroup className="mb-3">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <i className="fa fa-user-circle"></i>
                            </div>
                        </div>
                        <Input type="text" id="otherNames" />
                    </InputGroup>
                </Col>
            </Row>

            <Row>
                <Col md="6">
                    <Label for="email">Email Address</Label>
                    <InputGroup className="mb-3">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <i className="fa fa-envelope"></i>
                            </div>
                        </div>
                        <Input type="email" id="email" />
                    </InputGroup>
                </Col>
                <Col md="6">
                    <Label for="mobilePhone">Mobile Phone</Label>
                    <InputGroup className="mb-3">
                        <div className="input-group-prepend">
                            <div class="input-group-text">
                                <i className="fa fa-phone"></i>
                            </div>
                        </div>
                        <Input type="text" id="mobilePhone" />
                    </InputGroup>
                </Col>
            </Row>

            <Row>
                <Col md="6">
                    <Label for="password">Password</Label>
                    <InputGroup className="mb-3">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <i className="fa fa-lock"></i>
                            </div>
                        </div>  
                        <Input type="password" id="password" />
                    </InputGroup>
                </Col>
                <Col md="6">
                    <Label for="confirmPassword">Confirm Password</Label>
                    <InputGroup className="mb-3">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <i className="fa fa-lock"></i>
                            </div>
                        </div>
                        <Input type="password" id="confirmPassword" />
                    </InputGroup>
                </Col>
            </Row>
        </div>
    );
}
 
export default ChamaAdmin;