import React from 'react';
import { 
    FormGroup, 
    Label,
    Input,
    Col,
    InputGroup,
    Row,
} from "reactstrap";

const ChamaDetails = () => {
    return ( 
        <Row>
            <Col md={{ size: 6, offset: 3 }}>
                <FormGroup>
                    <Label for="chamaName">Chama Name</Label>
                    <Input type="text" id="chamaName" className="font-weight-bold" />
                </FormGroup>
                <FormGroup>
                    <Label for="regNo">Registration Number</Label>
                    <Input type="text" id="regNo" className="font-weight-bold" />
                </FormGroup>

                <Label for="noOfMembers">Number of Members</Label>
                <InputGroup className="mb-3">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                        <i className="fa fa-group"></i>
                        </div>
                    </div>
                    <Input type="number" id="noOfMembers" min="2" className="font-weight-bold" />
                </InputGroup>
            </Col>
        </Row>
    );
}
 
export default ChamaDetails;