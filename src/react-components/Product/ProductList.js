import React from 'react';

import ProductItemSmall from './ProductItemSmall';

class ProductList extends React.Component {

	render() {

		return(
				<ul className="product-list">
					{
						this.props.productList.map(function(item, idx) {
							return <ProductItemSmall key={idx} {...item} />
						})
					}
				</ul>
		);
	}
}

export default ProductList;
