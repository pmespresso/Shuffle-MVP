import React from 'react';
import {HOC} from 'formsy-react';
import Col from 'react-bootstrap/lib/Col';
import Radio from 'react-bootstrap/lib/Radio';


class CategoryInput extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        category: 'none'
      }
    }

  changeValue = (event) => {
      this.setState({category:event.target.value});
      this.props.setValue(event.target.value);
    }

  getValidationState = () => {
    if (this.props.isPristine()) {
      return undefined;
    }
    if (this.props.isValid()) {
      return "success";
    } else {
      return "error";
    }
  }

  render() {
    var className = this.props.showRequired() ? 'required' : this.props.showError() ? 'error' : '';
    const errorMessage = this.props.getErrorMessage();

    return(
      <div>
        <Col className="cat-select">
          <label className="radio">
            <input type="radio" name="category" value="textbooks" checked={this.state.category === 'textbooks'}
              onChange={this.changeValue}/> Textbooks
          </label>
          <label className="radio">
            <input type="radio" name="category" value="emergencies" checked={this.state.category === 'emergencies'}
              onChange={this.changeValue} /> Emergencies
          </label>
          <label className="radio">
            <input type="radio" name="category" value="tutoring" checked={this.state.category === 'tutoring'}
              onChange={this.changeValue} /> Tutoring
          </label>
          <label className="radio">
            <input type="radio" name="category" value="clothing" checked={this.state.category === 'clothing'}
              onChange={this.changeValue} /> Clothing
          </label>
          <label className="radio">
            <input type="radio" name="category" value="food" checked={this.state.category === 'food'}
              onChange={this.changeValue}/> Food
          </label>
          <label className="radio">
            <input type="radio" name="category" value="furniture" checked={this.state.category === 'furniture'}
              onChange={this.changeValue} /> Furniture
          </label>
          <label className="radio">
            <input type="radio" name="category" value="lostFound" checked={this.state.category === 'lostFound'}
              onChange={this.changeValue} /> Lost and Found
          </label>
          <label className="radio">
            <input type="radio" name="category" value="other" checked={this.state.category === 'other'}
              onChange={this.changeValue}/> Other
          </label>
        </Col>
        <span className="post-error-msg transition-fast">{errorMessage}</span>
        <span>{this.props.isPristine() ? 'Please choose one.' : ''}</span>
      </div>
    );
  }

}

export default HOC(CategoryInput);
