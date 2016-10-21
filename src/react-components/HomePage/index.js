import React from 'react';
import ProductList from '../Product/ProductList';
var _ = require('lodash');
import connectToStores from 'alt-utils/lib/connectToStores';
import ProductStore from '../../stores/ProductStore';
import Actions from '../../actions';
import Post from '../Post';
import Shuffle from '../Shuffle';

@connectToStores
class HomePage extends React.Component {

  constructor() {
    super();

    this.state = {
      loading: false
    }
  }

  componentWillMount() {
    console.log("homepage did mount, loading state is: " + this.state.loading);
    Actions.getProducts();
  }

  componentDidMount() {
    Actions.shuffleProducts();
  }

  static getStores() {
    return [ProductStore];
  }

  static getPropsFromStores() {
    return ProductStore.getState();
  }

  onLoad() {
    console.log('asshole');
    if (this.state.loading) {
      this.setState({loading: false});
    }
  }

  render() {

    return (
      <section className="main-content">
					<section className="container">
          <Post user={this.props.user}/>
          {/*<Shuffle user={this.props.user} shuffle={this.shuffle}/>*/}
          <ProductList productList={this.props.products} category={this.props.category} onLoad={this.onLoad()} />

					</section>
				</section>

    );
  }

}

export default HomePage;
