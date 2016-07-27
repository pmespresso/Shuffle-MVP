import React from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Shuffle extends React.Component {

  renderShuffleButton() {
    return (
      <section className="shuffle-btn-container">
        <img className="shuffle-btn transition-medium" onClick={this.props.shuffle} src="/img/logo.jpg"/>
        <div className="shuffle-btn-desc transition-fast">SHUFFLE</div>
      </section>
    );
  }

  render() {
    return (
      <section className="shuffle-section">
        {
          this.props.user?
          <ReactCSSTransitionGroup transitionName = "sticky-btn-fade"
                 transitionAppear = {true} transitionAppearTimeout = {500}
                 transitionEnter = {true} transitionLeave = {true}
                 transitionEnterTimeout={500} transitionLeaveTimeout={500}>
            {this.renderShuffleButton()}
          </ReactCSSTransitionGroup>
          :
          null
      }
      </section>
    );
  }

}

export default Shuffle;
