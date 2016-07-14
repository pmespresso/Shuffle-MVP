import React from 'react';

class ProductItemSmall extends React.Component {

	renderUpvoteButton() {
		return (
			<a className="upvote-button" href="#">
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
			<section className="product-item-info">
				<a href="#">
					<h2 className="product-item-name">{this.props.name}</h2>
				</a>

				<p>{this.props.description}</p>
				<a href="#">
					<p className="small-avatar-name"> {this.props.maker.name} </p>
					<img className="small-avatar" src={this.props.maker.avatar} />
				</a>
				{this.renderUpvoteButton()}
			</section>
		);

	}

	render() {

		return (

			<div className="col-md-4">

					<li className="product-item-small">

						<img className="product-item-media" src={this.props.media} />

						{this.renderInfoSection()}

					</li>
			</div>

		);
	}
}

export default ProductItemSmall;
