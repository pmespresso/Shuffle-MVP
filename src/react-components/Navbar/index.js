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
    // <div className="search-section">
      // <input ref="search" className="product-search" placeholder="Let's See What We Can Find..." />
    // </div>
  }

  renderCategories() {
    return (
      <section className="right-side">
        <CategoriesMenu />
      </section>
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
      // <Sticky>
        <section className="container-fluid">
          <section className="navbar">
            {this.renderPost()}
            {this.renderCategories()}
            {this.renderUser()}
            {this.renderLogo()}
          </section>
        </section>
      // </Sticky>

    );
  }
}

export default Navbar;
