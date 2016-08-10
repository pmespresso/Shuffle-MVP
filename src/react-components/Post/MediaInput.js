import React from 'react';
import {HOC} from 'formsy-react';
import ImageUpload from '../ImageUpload';

class MediaInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      media: []
    }

  }

// uploads media
  changeValue = (files) => {
    console.log("files", files);
    this.props.setValue(files);
  }

  // uploadMedia = (files) => {
  //   //Todo: just emptying array like this will likely cause problems later.
  //   this.newProduct.media = [];
  //   this.newProduct.media = this.newProduct.media.concat(files);
  // }

  render() {
    const className = this.props.showRequired() ? 'required' : this.props.showError() ? this.props.error : null;
    const errorMessage = this.props.getErrorMessage();
    return(
        <div>
          <ImageUpload uploadMedia={this.changeValue} value={this.props.getValue() || ''}/>
          <span className="post-error-msg transition-fast">{errorMessage}</span>
          <span>{this.props.isPristine() ? 'Please upload three images.' : ''}</span>
        </div>
    );
  }

}

export default HOC(MediaInput);
