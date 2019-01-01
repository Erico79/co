import React from 'react';
import {
    FormGroup,
    Label,
    Input,
} from 'reactstrap';

const renderFormGroup = props => {
    const { label, input, type, meta: { touched, warning, error } } = props;
    console.log(input);
    return ( 
        <FormGroup>
            <Label for="chamaName">{label}</Label>
            <Input {...input} />
        </FormGroup>
    );
}
 
export default renderFormGroup;