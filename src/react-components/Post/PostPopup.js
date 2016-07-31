import React from 'react';
import ImageUpload from '../ImageUpload';
import Popup from '../Popup';
import Actions from '../../actions';
import LoginPopup from '../Navbar';

class PostPopup extends React.Component {

  constructor(props) {
    super(props);

    this.newProduct = {
      name: "",
      media: [],
      maker: {
        name: "",
        avatar: ""
      },
      description: "",
      price: "",
      size: "small",
      tags: [],
      location: "",
      expires: "",
      upvote: 0
    }

    this.uploadMedia = this.uploadMedia.bind(this);
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
      <Popup {...this.props} style="post-popup">
          <header className="post-popup-header">Add Something to Sell</header>
          <section>
            <table>
              <tbody>
                <tr>
                  <td>Name *</td>
                  <td><input placeholder="What are you selling? Maximum 50 characters..." ref="name" maxLength="50"/></td>
                </tr>
                <tr>
                  <td>Description *</td>
                  <td><input placeholder="Enter a description in under 200 characters..." ref="description" maxLength="200"/></td>
                </tr>
                <tr className="media-upload">
                  <td>Media * <br/> Please upload three images.</td>
                  <td>
                    <ImageUpload uploadMedia={this.uploadMedia}/>
                  </td>
                </tr>

              </tbody>
            </table>
          </section>
          <footer className="post-footer">
            <button onClick={this.handlePost} className="post-product-btn transition-fast">Create Post!</button>
          </footer>
      </Popup>
    );
  }
}

export default PostPopup;

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
