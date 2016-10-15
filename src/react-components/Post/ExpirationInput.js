import React from 'react';
import {HOC} from 'formsy-react';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Form from 'react-bootstrap/lib/Form';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import DatePicker from 'react-bootstrap-date-picker';

class ExpirationInput extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let value = new Date().toISOString();
    this.props.setValue(value);
  }

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
    console.log(this.props);
    return(
      <FormGroup controlId="formHorizontalDesc"
        validationState={this.getValidationState()}>
        <Col componentClass={ControlLabel} sm={2}>
          What is Your Time Frame?
        </Col>
        <Col sm={10}>
          {/*here we need to implement a datepicker */}
          <DatePicker onChange={this.changeValue} value={this.props.getValue() || ''}  />
        </Col>
        <FormControl.Feedback />
        <HelpBlock>Until when is your offer valid?</HelpBlock>
      </FormGroup>
    );
  }

}

export default HOC(ExpirationInput);
