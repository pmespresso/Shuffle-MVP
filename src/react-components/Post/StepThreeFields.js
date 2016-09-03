import React from 'react';
import Popup from '../Popup';
import Actions from '../../actions';
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


  handlePost = () => {

    //Todo: Clean this up if possible...
    // var spacelessTags = this.refs.tags.value.replace(/\s+/g, '');
    // var tagsArray = spacelessTags.split(',')

    if (this.refs.name.value == "") {
      console.error("name is empty!");
    } else if (this.refs.description.value == "") {
      console.error("description is empty!");
    } else if (this.newProduct.media == []) {
      console.error("media is empty!");
    } else {
      this.newProduct.name = this.refs.name.value;
      this.newProduct.maker = {
        name: this.props.user.name,
        avatar: this.props.user.avatar
      }
      this.newProduct.description = this.refs.description.value;
      // this.newProduct.price = this.refs.price.value;
      this.newProduct.size = "small";
      // this.newProduct.tags = tagsArray;
      // this.newProduct.location = this.refs.location.value;
      // this.newProduct.expires = this.refs.expires.value;
      this.newProduct.upvote = 0;
      Actions.addProduct(this.newProduct);
      this.props.hidePopup();
    }
  };

  renderLogin = () => {
    return (
      <LoginPopup />
    );
  }

  render() {
    return (
      <Popup {...this.props} style="post-popup">
      <Formsy.Form onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
          <PageHeader>Add Something to Sell</PageHeader>
          <section>
            <NameInput name="name" validations="isValidName" validationError="This is not a valid name." required/>
            <DescriptionInput name="description" validations="isValidDesc" validationError="This is not a valid description." required/>
            <div className="media-upload">
                <MediaInput name="media" validations="isLength:3" validationError="Please upload three images." required/>
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

{/*<tr>
  <td>Price</td>
  <td><input placeholder="How much are you looking to sell for?" ref="price"/></td>
</tr>
<tr>
  <td>Location</td>
  <td><input placeholder="Where can this item be picked up?" ref="location"/></td>
</tr>
<tr>
  <td>Expiration Date</td>
  <td><input placeholder="When will you no longer be offering this item?" ref="expires"/></td>
</tr>
<tr>
  <td>Tags</td>
  <td>
    <div className="tag-upload-txt">Separate your tags with commas!</div>
    <input placeholder="Enter some tags for your item!" ref="tags"/>
  </td>
</tr>*/}
