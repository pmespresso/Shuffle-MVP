import React from 'react';
import ProductStore from '../../stores/ProductStore';
import Actions from '../../actions';
import connectToStores from 'alt-utils/lib/connectToStores';


@connectToStores
class ProfileMenu extends React.Component {

  constructor() {
    super();
    this.state = {
      showProfileNav: false
    }
  }

  static getStores() {
    return [ProductStore];
  }

  static getPropsFromStores() {
    return ProductStore.getState();
  }

  handleClick = () => {
    if (this.state.showProfileNav) {
      this.setState({showProfileNav: false});
    } else {
      this.setState({showProfileNav: true});
    }
  };

  handleClickOutside = (e) => {
    if (e.target != this.refs.profileBtn) {
      this.setState({showProfileNav: false});
    }
  };

  componentWillMount() {
    window.addEventListener("click", this.handleClickOutside, false);
  }

  componentWillUnMount() {
    window.removeEventListener("click", this.handleClickOutside, false);
  }

  renderProfileNav() {
    return (
      <nav className="profile-nav" ref="profileNav">
        <a href="#">My Profile</a>
        <a href="#" onClick={this.props.handleLogout}>Logout</a>
      </nav>
    );
  }
  render() {
    return (
      <section className="profile-menu">
        <img src={this.props.user.avatar} onClick={this.handleClick} className="profile-btn medium-avatar" ref="profileBtn"/>
        {
          this.state.showProfileNav? this.renderProfileNav() : null
        }
      </section>
    );
  }
}

export default ProfileMenu;
