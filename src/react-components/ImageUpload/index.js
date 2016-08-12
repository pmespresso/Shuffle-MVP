import React from 'react';
import {HOC} from 'formsy-react';

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {files: [],imagePreviewUrl: []};
    this.readAndPreview = this.readAndPreview.bind(this);
  }

  callback() {
    this.props.uploadMedia(this.state.imagePreviewUrl);
  }

  _handleImageChange(e) {
    e.preventDefault();
    let files = e.target.files;
    [].forEach.call(files, this.readAndPreview);
  }

  readAndPreview(file) {
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: this.state.imagePreviewUrl.concat(reader.result)
      }, function() {
        this.callback();
      })
    }
    reader.readAsDataURL(file);
  }

  render() {
    return (
      <div className="previewComponent">
          <input className="fileInput" type="file" onChange={(e)=>this._handleImageChange(e)} multiple />
        <div className="imgPreview">
        {
          this.state.imagePreviewUrl
          ?
          this.state.imagePreviewUrl.map(function(url, key) {
            return (
              <img src={url} key={key} />
            )
          })
          :
          null
        }
        </div>
      </div>
    )
  }
}

export default ImageUpload;
