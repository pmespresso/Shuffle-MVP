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
  }

  componentDidMount() {
    Actions.getProducts();
    Actions.shuffleProducts();
  }

  static getStores() {
    return [ProductStore];
  }

  static getPropsFromStores() {
    return ProductStore.getState();
  }

  render() {
    let loadingStyle = {
      position: 'absolute',
      width: '100%',
      height: '100%',
      background: 'url(img/loading.gif)'
    }

    return (
      <section className="main-content">
					<section className="container">
          <Post user={this.props.user}/>
          <Shuffle user={this.props.user} shuffle={this.shuffle}/>
						{
							this.props.products
							?
							<ProductList productList={this.props.products} category={this.props.category}  />
							:
              <div className="loading" ref="loading" style={loadingStyle}></div>
						}
					</section>
				</section>

    );
  }

}

export default HomePage;
