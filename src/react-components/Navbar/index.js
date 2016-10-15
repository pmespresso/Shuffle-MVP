import React from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import LoginPopup from './LoginPopup';
import CategoriesMenu from './CategoriesMenu';
import ProfileMenu from './ProfileMenu';
import connectToStores from 'alt-utils/lib/connectToStores';
import ProductStore from '../../stores/ProductStore';
import Actions from '../../actions';

import { Link } from 'react-router';

@connectToStores
class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      popupStatus: false
    }
  }

  static getStores() {
    return [ProductStore];
  }

  static getPropsFromStores() {
    return ProductStore.getState();
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
  };

  handleLogin = () => {
    Actions.login();
    this.props.hidePopup();
  };

  handleLogout = () => {
    Actions.logout();
    this.props.showConfirmation();
  };

  renderSearchBar() {
    return (
      <form className="search-section">
        <input ref="search" className="product-search" placeholder="Let's See What We Can Find..." />
      </form>
    );
  };

  renderPost() {
    return (
      <section className="right-side">
        <Link to="/post" > Post </Link>
      </section>
    );
  };

  renderUser() {
    return (
      <div className="right-side">
        {
          this.props.user
          ?
          // Display Profile Menu
          <span>
            <ProfileMenu handleLogout={this.handleLogout}/>
          </span>
          :
          <span>
            <a href="#" onClick={this.handleSignup} className="lead signup-btn">Signup</a>
            <a href="#" onClick={this.handleLogin} className="lead login-btn">Login</a>
          </span>
        }
        <CategoriesMenu />
      </div>
    );
  }

  render() {
    return (
      // <Sticky>
          <header className="navbar">
            {this.renderLogo()}
            {this.renderSearchBar()}
            {this.renderUser()}
          </header>
      // </Sticky>

    );
  }
}

export default Navbar;
