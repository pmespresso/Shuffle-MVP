import React from 'react';
import ProductItemSmall from './ProductItemSmall';
import _ from 'lodash';
import connectToStores from 'alt-utils/lib/connectToStores';
import ProductStore from '../../stores/ProductStore';
import Actions from '../../actions';

var masonryOptions = {
	transitionDuration: '0.2s',
	columnWidth: 20,
	fitWidth: true,
};

@connectToStores
class ProductList extends React.Component {

	constructor(props) {
		super(props);

		// this.state = {
		// 	gems: []
		// }
	}

	static getStores() {
		return [ProductStore];
	}

	static getPropsFromStores() {
		return ProductStore.getState();
	}

	render() {
		console.log(this.state.gems);
		let posts = this.props.productList;
		//bottle neck, dramatic performance improvment with lodash.
		var gems = _(posts).take(10).map(function(item, idx) {
				// take(10) is a temporary hack. this should be done with firebase query in Actions.
				return <ProductItemSmall sizeIDX={idx} key={idx} pid={item.key} {...item} />
		}).value();

		return (
			<div className="product-list">
				{
					gems.length > 0 ?
					gems :
					<img src="img/loading.gif" />
				}
			</div>
		);

	}
}

export default ProductList;
