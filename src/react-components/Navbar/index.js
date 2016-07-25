import React from 'react';

import { StickyContainer, Sticky } from 'react-sticky';

import LoginPopup from './LoginPopup';
import ProfileMenu from './ProfileMenu';
import Actions from '../../actions';


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

  renderLogo() {
    return (
      <a href="#" className="shuffle-btn"><img className="logo" src="/img/logo-alt.jpg"/></a>
    );
  }

  handleLogin = () => {
    Actions.login();
    this.props.hidePopup();
  };

  handleLogout = () => {
    Actions.logout();
    this.props.showConfirmation();
  }


  handlePost = () => {




    Actions.addProduct(product);
  }

  renderProductSearch() {
    return (
      <section className="search-section">
        <input className="product-search" placeholder="Let's See What We Can Find..." />
      </section>
    );
  }

  renderUser() {
    return (
      <section className="right-side">
        {
          this.props.user
          ?
          // Display Profile Menu
          <section>
            <ProfileMenu handleLogout={this.handleLogout}/>
          </section>
          :
          <section>
            <a href="#" onClick={this.handleLogin} className="login-btn">LOGIN</a>
          </section>
        }
      </section>
    );
  }

  render() {
    return (

      <section className="container-fluid">
        <section className="navbar">
          {this.renderUser()}
          {this.renderLogo()}
          {this.renderProductSearch()}
        </section>
      </section>

    );
  }
}

export default Navbar;
