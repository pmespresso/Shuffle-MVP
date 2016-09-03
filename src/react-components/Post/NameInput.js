import React from 'react';
import {HOC} from 'formsy-react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Form from 'react-bootstrap/lib/Form';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

class NameInput extends React.Component {

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
    const errorMessage = this.props.showError() ? this.props.getErrorMessage() : 'Give your product a name!';

    return(
      <div>
        <FormGroup controlId="formHorizontalName"
          validationState={this.getValidationState()}>
          <Col componentClass={ControlLabel} sm={2}>
            Name
          </Col>
          <Col sm={10}>
            <FormControl type="text" placeholder="Give your product a name" onChange={this.changeValue} value={this.props.getValue() || ''}/>
          </Col>
          <FormControl.Feedback />
        </FormGroup>
        <HelpBlock>What are you selling? Maximum 50 characters...</HelpBlock>
        </div>
    );
  }

}

export default HOC(NameInput);
