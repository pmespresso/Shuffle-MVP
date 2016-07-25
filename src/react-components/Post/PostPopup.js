import React from 'react';
import Popup from '../Popup';
import Actions from '../../actions';

class PostPopup extends React.Component {

  handlePost = () => {

    var spacelessTags = this.refs.tags.value.replace(/\s+/g, '');
    var tagsArray = spacelessTags.split(',')
    var newProduct = {
      name: this.refs.name.value,
      media: [this.refs.media1.value, this.refs.media2.value, this.refs.media3.value],
      maker: {
        name: this.props.user.name,
        avatar: this.props.user.avatar
      },
      description: this.refs.description.value,
      price: this.refs.price.value,
      size: "small",
      tags: tagsArray,
      location: this.refs.location.value,
      expires: this.refs.expires.value,
      upvote: 0
    }
    Actions.addProduct(newProduct);
    this.props.hidePopup();
  };

  render() {
    return (
      <Popup {...this.props} style="post-popup">
          <header className="post-popup-header">Add Something to Sell</header>
          <section>
            <table>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td><input placeholder="What are you selling?" ref="name"/></td>
                </tr>
                <tr>
                  <td>Description</td>
                  <td><input placeholder="Enter a description" ref="description"/></td>
                </tr>
                <tr>
                  <td>Media</td>
                  <td>
                    <div className="media-upload-txt">Please upload three images.</div>
                    <input placeholder="Media 1" ref="media1"/>
                    <input placeholder="Media 2" ref="media2"/>
                    <input placeholder="Media 3" ref="media3"/>
                  </td>
                </tr>
                <tr>
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
