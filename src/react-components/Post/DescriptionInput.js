import React from 'react';
import {HOC} from 'formsy-react';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Form from 'react-bootstrap/lib/Form';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';


class DescriptionInput extends React.Component {

  changeValue = (event) => {
    this.props.setValue(event.currentTarget.value);
  }

  getValidationState = () => {
    if (this.props.isPristine()) {
      return undefined;
    }
    if (this.props.isValid()) {
      return "success";
    } else {
      return "error";
    }
  }

  render() {
    var className = this.props.showRequired() ? 'required' : this.props.showError() ? 'error' : '';
    const errorMessage = this.props.getErrorMessage();

    return(
      <FormGroup controlId="formHorizontalDesc"
        validationState={this.getValidationState()}>
        <Col componentClass={ControlLabel} sm={2}>
          Description
        </Col>
        <Col sm={10}>
          <FormControl type="text" placeholder="Enter text" onChange={this.changeValue} value={this.props.getValue() || ''}/>
        </Col>
        <FormControl.Feedback />
        <HelpBlock>Enter a description in under 200 characters...</HelpBlock>
      </FormGroup>
    );
  }

}

export default HOC(DescriptionInput);
