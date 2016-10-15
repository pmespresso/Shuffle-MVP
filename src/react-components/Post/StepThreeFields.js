import React from 'react';
import Popup from '../Popup';
import Formsy from 'formsy-react';
import NameInput from './NameInput'
import ImageUpload from '../ImageUpload';
import LoginPopup from '../Navbar';
import MediaInput from './MediaInput';
import DescriptionInput from './DescriptionInput';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PageHeader from 'react-bootstrap/lib/PageHeader';


Formsy.addValidationRule('isValidName', function (values, value) {
  return value != undefined && value.trim().length > 0 && value.length <= 50;
});

Formsy.addValidationRule('isValidDesc', function (values, value) {
  return value != undefined && value.trim().length > 0 && value.length <= 200;
});

class StepThreeFields extends React.Component {

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
    if (!this.props.user) {
      this.renderLogin();
    } else {
      var data = {
        name: model.name,
        media: model.media,
        maker: {
          name: this.props.user.name,
          avatar: this.props.user.avatar
        },
        description: model.description
      }
      this.props.saveValues(data);
      this.props.submitProduct();
    }
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
          <PageHeader>So What's This About Anyway?</PageHeader>
          <section>
            <NameInput name="name" validations="isValidName" validationError="This is not a valid name." required/>
            <DescriptionInput name="description" validations="isValidDesc" validationError="This is not a valid description." required/>
            <div className="media-upload">
              <MediaInput name="media" validations="isLength:1" validationError="Please upload some images." required/>
            </div>
          </section>
          <footer className="post-footer">
            <button type="submit" disabled={!this.state.canSubmit} className="post-product-btn transition-fast">Create Post!</button>
          </footer>
      </Formsy.Form>
      </Popup>
    );
  }
}

export default StepThreeFields;
