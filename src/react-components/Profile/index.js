import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import ProductStore from '../../stores/ProductStore';
import Actions from '../../actions';

@connectToStores
class Profile extends React.Component {

  renderUserInfo() {
    <section className="profile-user-info">
      <header>
        <h2>Welcome To Your Safe Space, {this.props.user}</h2>
        <img src={this.props.user} />
      </header>
    </section>
  }

  static getStores() {
    return [ProductStore];
  }

  static getPropsFromStores() {
    return ProductStore.getState();
  }


  render() {
    return (
      <section className="profile-section">
        {this.renderUserInfo()}
      </section>
    );
  }
}

export default Profile;
