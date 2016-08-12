import React from 'react';
import {HOC} from 'formsy-react';

class DescriptionInput extends React.Component {

  changeValue = (event) => {
    this.props.setValue(event.currentTarget.value);
  }

  render() {
    var className = this.props.showRequired() ? 'required' : this.props.showError() ? 'error' : '';
    const errorMessage = this.props.getErrorMessage();

    return(
        <div className={className}>
          <input type="text" placeholder="Enter a description in under 200 characters..." onChange={this.changeValue} value={this.props.getValue() || ''}/>
          <span className="post-error-msg transition-fast">{errorMessage}</span>
        </div>
    );
  }

}

export default HOC(DescriptionInput);
