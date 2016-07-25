import React from 'react';

class Popup extends React.Component {
  renderPopupContent() {
    return (
          <section className="popup">
            <section className={"popup-content " + this.props.style}>
              <a className="popup-close" onClick={this.props.hidePopup} href="#">x</a>
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
          this.props.status? this.renderPopupContent() : null
        }
      </section>
    );
  }
}

export default Popup;
