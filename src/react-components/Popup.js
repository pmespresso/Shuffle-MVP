import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
class Popup extends React.Component {

  onPopupClose = () => {
    console.log('ass');
    this.props.hidePopup();
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
        {
          this.props.status ?
            this.renderPopupContent()
           :
            null
        }
      </section>
    );
  }
}

export default Popup;
