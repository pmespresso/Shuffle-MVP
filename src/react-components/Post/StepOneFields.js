import React from 'react';
import Popup from '../Popup';
import Formsy from 'formsy-react';
import LoginPopup from '../Navbar';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import CategoryInput from './CategoryInput';

Formsy.addValidationRule('isValidCat', function (values, value) {
  return value != 'none';
});

class StepOneFields extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false
    }
  }

  enableButton = () => {
    this.setState({canSubmit:true});
  }

  disableButton = () => {
    this.setState({canSubmit:false});
  }

  submit = (model) => {
    var data = {
      category : model.category
    }
    this.props.saveValues(data);
    this.props.nextStep();
  }

  renderLogin = () => {
    return (
      <LoginPopup />
    );
  }

  render() {
    return (
      <Popup {...this.props} style="post-popup">
      <Formsy.Form onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
          <PageHeader>How would you describe your posting?</PageHeader>
          <section>
              <CategoryInput name="category" validations="isValidCat" value='none' errorMessage="Please choose one." required/>
          </section>

          <footer className="post-footer">
            <button type="submit" disabled={!this.state.canSubmit} className="post-product-btn transition-fast">Save and Continue</button>
          </footer>
      </Formsy.Form>
      </Popup>
    );
  }
}

export default StepOneFields;
