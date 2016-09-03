import React from 'react';
import Popup from '../Popup';
import Actions from '../../actions';
import Formsy from 'formsy-react';
import NameInput from './NameInput'
import ImageUpload from '../ImageUpload';
import LoginPopup from '../Navbar';
import MediaInput from './MediaInput';
import DescriptionInput from './DescriptionInput';
import StepOneFields from './StepOneFields';
import StepTwoFields from './StepTwoFields';
import StepThreeFields from './StepThreeFields';

 var fieldValues = {
  name: "",
  media: [],
  maker: {
    name: "",
    avatar: ""
  },
  description: "",
  price: "$",
  size: "small",
  tags: ["temp"],
  location: "",
  expires: "",
  upvote: 0
}

class PostPopup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      step: 1
    }

    this.resetSteps = this.resetSteps.bind(this);

  }

  saveValues = (fields) => {
    return function() {
    fieldValues = Object.assign({}, fieldValues, fields)
    console.log(fieldValues);
    console.log(fieldValues.name);
    }()
  }

  submitProduct = () => {
    Actions.addProduct(fieldValues);
    this.props.hidePopup();
  }

  resetSteps = () => {
    this.setState({step: 1});
  }

  nextStep = () => {
    this.setState({step: this.state.step + 1})
  }


  previousStep = () => {
    this.setState({step: this.state.step - 1})
  }

  render() {
    switch (this.state.step) {
      case 1:
        return <Popup {...this.props} style="post-popup" resetSteps={this.resetSteps}>
            <StepOneFields {...this.props} fieldValues={fieldValues}
              nextStep={this.nextStep} saveValues={this.saveValues}/>
          </Popup>
      case 2:
        return <Popup {...this.props} style="post-popup" resetSteps={this.resetSteps}>
          <StepTwoFields {...this.props} fieldValues={fieldValues}
            nextStep={this.nextStep} previousStep={this.previousStep}
            saveValues={this.saveValues}/>
        </Popup>
      case 3:
        return <Popup {...this.props} style="post-popup" resetSteps={this.resetSteps}>
          <StepThreeFields {...this.props} fieldValues={fieldValues}
            nextStep={this.nextStep} previousStep={this.previousStep}
            saveValues={this.saveValues} submitProduct={this.submitProduct}/>
        </Popup>
    }
  }
}

export default PostPopup;
