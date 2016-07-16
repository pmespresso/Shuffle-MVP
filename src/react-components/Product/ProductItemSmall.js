import React from 'react';

class ProductItemSmall extends React.Component {

	renderUpvoteButton() {
		return (
			<a className="upvote-button upvote-button-small" href="#">
				<span>
					<i className="fa fa-heart-o"></i>
				</span>

				{this.props.upvote}
			</a>
		);
	}

	renderHeadingSection() {

		return (
			<header className="tags">
				<a href="#"> {this.props.tags[0]} </a>
				<a href="#"> {this.props.tags[1]} </a>
				<a href="#"> {this.props.tags[2]} </a>
			</header>
		);
	}

	renderInfoSection() {

		return (
			<section className="product-item-small-info">
				<a href="#">
					<h2 className="product-item-name">{this.props.name}</h2>
				</a>
				<p>{this.props.description}</p>

				<div className="avatar-info">
					<a href="#">
						<p className="small-avatar-name"> {this.props.maker.name} </p>
						<img className="small-avatar" src={this.props.maker.avatar} />
					</a>
				</div>

			</section>
		);

	}

	render() {

		return (


					<div className="product-item-small-content">
						<img className="product-item-media-small" src={this.props.media[0]} />

						{this.renderInfoSection()}
					</div>

		);
	}
}

export default ProductItemSmall;
