import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
class Popup extends React.Component {

  onPopupClose = () => {
    this.props.hidePopup();
    if ("post-popup" === this.props.style) {
      this.props.resetSteps();
    }
  }

  renderPopupContent() {
    return (
          <section className="popup">
            <section className={"popup-content " + this.props.style}>
              <div className="popup-close" onClick={this.onPopupClose}>x</div>
              <div className={"popup-inner " + this.props.style}>
                {this.props.children}
              </div>
            </section>
          </section>
        );
  }

  render() {
    return (
      <section>
        <ReactCSSTransitionGroup transitionName = "fade"
          transitionEnterTimeout={500} transitionLeaveTimeout={500}>
        {
          this.props.status ?
            this.renderPopupContent()
           :
            null
        }
        </ReactCSSTransitionGroup>
      </section>
    );
  }
}

export default Popup;
