import React from 'react';

class ProductItemSmall extends React.Component {

	renderUpvoteButton() {
		return (
			<a className="upvote-button upvote-button-medium" href="#">
				<span>
					<i className="fa fa-sort-asc"></i>
				</span>

				{this.props.upvote}
			</a>
		);
	}

	// renderNewWindowIcon() {
	//
	// 	return (
	// 		<a className="product-item-link" href={this.props.link}>
	// 			<span> <i className="fa fa-external-link"></i> </span>
	// 		</a>
	// 	);
	//
	// }

	renderInfoSection() {

		return (
			<div>
			<div className="product-item-medium-info">
				<a href="#">
					<h2 className="product-item-name">{this.props.name}</h2>
				</a>

				<p>{this.props.description}</p>
			</div>

			<div className="bottom-stick">
			<span className="product-item-price-medium"> {this.props.price} </span>

				<a href="#">
					<p className="medium-avatar-name"> {this.props.maker.name} </p>
					<img className="medium-avatar" src={this.props.maker.avatar} />
				</a>
			</div>
			</div>
		);

	}

	render() {

		return (

			<div className="col-md-8">
				{this.renderUpvoteButton()}
					<li className="product-item-medium">
						<img className="product-item-media col-md-4" src={this.props.media[0]} />
						<img className="product-item-media col-md-4" src={this.props.media[1]} />
						{this.renderInfoSection()}
					</li>
			</div>

		);
	}
}

export default ProductItemSmall;
