import React from 'react';

import { StickyContainer, Sticky } from 'react-sticky';

import LoginPopup from './LoginPopup';
import ProfileMenu from './ProfileMenu';
import Actions from '../../actions';
import Search from '../Search';

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

  renderProductSearch() {
    return (
      <section className="search-section">
        <Search />
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
