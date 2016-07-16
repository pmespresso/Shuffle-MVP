import React from 'react';
import Masonry from 'react-masonry-component';
import ProductItemSmall from './ProductItemSmall';
import ProductItemMedium from './ProductItemMedium';

var masonryOptions = {
	transitionDuration: '0.2s',
	columnWidth: 20,
	fitWidth: true,
};

class ProductList extends React.Component {
	render() {

		var childElements = this.props.productList.map(function(item, idx) {
			if (item.size == "small") {
				return <div className="product-item-small">
					<ProductItemSmall key={idx} {...item} />
					</div>
			} else if (item.size == "medium") {
				return <div className="product-item-medium">
					<ProductItemMedium key={idx} {...item} />
				</div>
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
