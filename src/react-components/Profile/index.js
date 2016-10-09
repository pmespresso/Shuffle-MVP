import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import ProductStore from '../../stores/ProductStore';
import Actions from '../../actions';
import ProductItemSmall from '../Product/ProductItemSmall';
import { Link } from 'react-router';
import { Tabs, Tab, TabContainer, TabContent, TabPane, Nav, NavItem } from 'react-bootstrap';

@connectToStores
class Profile extends React.Component {

  constructor(props) {
    super(props);

    //TODO: add navigation functionality between different Posts of Interest

    // keys: 1 -> My Active Posts
    //       2 -> Posts I Liked
    //       3 -> My Expired Posts
    this.state = {
      key: 1
    }
  }

  componentDidMount() {
    console.log("from profile: " + this.props.user.id);
    Actions.getUserActiveProducts(this.props.user.id);
  }

  static getStores() {
    return [ProductStore];
  }

  static getPropsFromStores() {
    return ProductStore.getState();
  }

  handleSelect = (key) => {
    this.setState({key});
  }

  render() {
    let myActivePosts = this.props.myProducts.map(function(item, idx) {
        return <ProductItemSmall sizeIDX={idx} key={idx} pid={item.key} {...item} />
    });

    return (
      <section className="container profile-section">
        <section className="top">
          <img className="profile-avatar" src={this.props.user.avatar} alt="profile-avatar" />
          <h2>Looking Good, {this.props.user.name}</h2>
        </section>

        <hr />

        {/*TODO: dynamically change this title with navigation functionality */}
        <h3 className="post-of-interest">My Active Posts</h3>

        <section className="bottom">
            {myActivePosts}
        </section>

      </section>
    );
  }
}

export default Profile;
