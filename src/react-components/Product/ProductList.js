import React from 'react';

import ProductItemSmall from './ProductItemSmall';
import ProductItemMedium from './ProductItemMedium';

class ProductList extends React.Component {

	render() {

		return(
				<ul className="product-list">
					{
						this.props.productList.map(function(item, idx) {
								if (item.size == "small") {
									return <ProductItemSmall key={idx} {...item} />
								} else if (item.size == "medium") {
									return <ProductItemMedium key={idx} {...item} />
								}

						})
					}
				</ul>
		);
	}
}

export default ProductList;
