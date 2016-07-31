import React from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import PostPopup from './PostPopup';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Post extends React.Component {

  constructor() {
    super();
    this.state = {
      popupStatus: false
    }
  }

  showPopup = () => {
    this.setState({popupStatus: true});
  };

  hidePopup = () => {
    this.setState({popupStatus: false});
  };

  renderPostButton() {
    return (
      <section className="post-btn-container">
        <div className="post-btn transition-medium" onClick={this.showPopup} >+</div>
        <div className="post-btn-desc transition-fast">POST</div>
      </section>
    );
  }

  render() {
    return (
      <section className="post-section">
        {
          <ReactCSSTransitionGroup transitionName = "sticky-btn-fade"
                 transitionAppear = {true} transitionAppearTimeout = {500}
                 transitionEnter = {true} transitionLeave = {true}
                 transitionEnterTimeout={500} transitionLeaveTimeout={500}>
            {this.renderPostButton()}
            <PostPopup user={this.props.user} status={this.state.popupStatus} hidePopup={this.hidePopup}/>
          </ReactCSSTransitionGroup>
      }
      </section>
    );
  }

}

export default Post;
