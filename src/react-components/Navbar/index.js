import React from 'react';
import LoginPopup from './LoginPopup';
import PostPopup from './PostPopup';
import ProfileMenu from './ProfileMenu';

class Navbar extends React.Component {
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

  renderProductSearch() {
    return (
      <section className="right-side">
        <input className="product-search" placeholder="SEARCH" />
      </section>
    );
  }

  renderLogo() {
    return (
      <a href="#"><img className="logo" src="/img/logo-alt.jpg"/></a>
    );
  }

  renderUser() {
    return (
      <section className="left-side">
        {
          this.props.user
          ?
          // Display Profile Menu
          <section>
            <ProfileMenu/>
          </section>
          :null
        }
      </section>
    );
  }

  render() {
    return (
      <section>
        <section className="navbar">
          {this.renderProductSearch()}
          {this.renderLogo()}

        </section>
      </section>
    );
  }
}

export default Navbar;
