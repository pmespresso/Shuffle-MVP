import React from 'react';
import Masonry from 'react-masonry-component';
import ProductItemSmall from './ProductItemSmall';
import ProductItemMedium from './ProductItemMedium';
import ProductItemLarge from './ProductItemLarge';
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

	constructor() {
		super();

		this.state = {
			productList: []
		}
	}

	static getStores() {
		return [ProductStore];
	}

	static getPropsFromStores() {
		return ProductStore.getState();
	}

	render() {
		var childElements = this.props.productList.map(function(item, idx) {
			if (item.size == "small") {
				return <ProductItemSmall sizeIDX={idx} key={idx} pid={item.key} {...item} />
			} else if (item.size == "medium") {
				return <ProductItemMedium key={idx} pid={item.key} {...item} />
			} else if (item.size == "large") {
				return <ProductItemLarge key={idx} pid={item.key} {...item} />
			}
		})

		return (
			<Masonry
				className={'product-list-masonry'}
				elementType={'div'}
				options={masonryOptions}
				disableImagesLoaded={false}
				updateOnEachImageLoad={false}
			>
				{childElements}
			</Masonry>
		);

	}
}

export default ProductList;
