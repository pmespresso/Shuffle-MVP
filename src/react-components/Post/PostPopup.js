import React from 'react';
import ImageUpload from '../ImageUpload';
import Popup from '../Popup';
import Actions from '../../actions';
import LoginPopup from '../Navbar';
import PostForm from './PostForm';



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



  render() {
    return (
      <Popup {...this.props} style="post-popup">
          <header className="post-popup-header">Add Something to Sell</header>

          <PostForm />

      </Popup>
    );
  }
}

export default PostPopup;
