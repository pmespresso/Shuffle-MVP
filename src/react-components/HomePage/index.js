import React from 'react';
import ProductList from '../Product/ProductList';
var _ = require('lodash');
import connectToStores from 'alt-utils/lib/connectToStores';
import ProductStore from '../../stores/ProductStore';
import Actions from '../../actions';
import ImageUpload from '../ImageUpload';

@connectToStores
class HomePage extends React.Component {

  constructor() {
    super();

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
    return (
      <section className="main-content">
					<section className="container-fluid">
						{
							this.props.products
							?
							<ProductList productList={this.props.products} category={this.props.category} />
							:
							null
						}
					</section>
				</section>

    );
  }

}

export default HomePage;
