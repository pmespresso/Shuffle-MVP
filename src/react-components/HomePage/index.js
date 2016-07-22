import React from 'react';
import ProductList from '../Product/ProductList';
var _ = require('lodash');
import connectToStores from 'alt-utils/lib/connectToStores';
import ProductStore from '../../stores/ProductStore';
import Actions from '../../actions';

@connectToStores
class HomePage extends React.Component {

  constructor() {
    super();
    console.log("homepage constructor called");
    Actions.getProducts();

  }

  static getStores() {
    return [ProductStore];
  }

  static getPropsFromStores() {
    return ProductStore.getState();
  }

  render() {
    return (
      <section>
					<section className="container-fluid">
            <div className="post-btn">POST</div>
            <div className="shuffle-btn">SHUFFLE</div>
						{
							this.props.products
							?
							<ProductList productList={this.props.products}/>
							:
							null
						}

					</section>
				</section>

    );
  }

}

export default HomePage;
