import React from 'react';
import Popup from '../Popup';
import Actions from '../../actions';
import Formsy from 'formsy-react';
import NameInput from './NameInput'
import ImageUpload from '../ImageUpload';
import LoginPopup from '../Navbar';
import MediaInput from './MediaInput';
import DescriptionInput from './DescriptionInput';


Formsy.addValidationRule('isValidName', function (values, value) {
  return value != undefined && value.trim().length > 0 && value.length <= 50;
});

Formsy.addValidationRule('isValidDesc', function (values, value) {
  return value != undefined && value.trim().length > 0 && value.length <= 200;
});

class PostPopup extends React.Component {

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
    console.log(model.name);
    console.log(model.media);
    console.log(model.description);
    var newProduct = {
      name: model.name,
      media: model.media,
      maker: {
        name: this.props.user.name,
        avatar: this.props.user.avatar
      },
      description: model.description,
      price: "$",
      size: "small",
      tags: ["temp"],
      location: "",
      expires: "",
      upvote: 0
    }
    Actions.addProduct(newProduct);
    this.props.hidePopup();
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

  uploadMedia = (files) => {
    //Todo: just emptying array like this will likely cause problems later.
    this.newProduct.media = [];
    this.newProduct.media = this.newProduct.media.concat(files);
  }
  renderLogin = () => {
    return (
      <LoginPopup />
    );
  }

  render() {
    return (
      <Formsy.Form onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
      <Popup {...this.props} style="post-popup">
          <header className="post-popup-header">Add Something to Sell</header>

          <section>
            <table>
              <tbody>
                <tr>
                  <td>Name *</td>
                  <td>
                      <NameInput name="name" validations="isValidName" validationError="This is not a valid name." required/>
                  </td>
                </tr>
                <tr>
                  <td>Description *</td>
                  <td>
                    <DescriptionInput name="description" validations="isValidDesc" validationError="This is not a valid description." required/>
                  </td>
                </tr>
                <tr className="media-upload">
                  <td>Media *</td>
                  <td>
                    <MediaInput name="media" validations="isLength:3" validationError="Please upload three images." required/>
                  </td>
                </tr>

              </tbody>
            </table>
          </section>
          <footer className="post-footer">
            <button type="submit" disabled={!this.state.canSubmit} className="post-product-btn transition-fast">Create Post!</button>
          </footer>
      </Popup>
      </Formsy.Form>
    );
  }
}

export default PostPopup;
