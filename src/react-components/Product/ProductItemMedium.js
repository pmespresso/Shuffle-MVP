import React from 'react';

class ProductItemSmall extends React.Component {

	renderUpvoteButton() {
		return (
			<a className="upvote-button upvote-button-medium" href="#">
				<span>
					<i className="fa fa-heart-o"></i> {this.props.upvotes}
				</span>
			</a>
		);
	}

	renderTags() {
		return (
			<header className="tags">
				<a href="#"> {this.props.tags[0]} </a>
				<a href="#"> {this.props.tags[1]} </a>
				<a href="#"> {this.props.tags[2]} </a>
			</header>
		);
	}

	renderAvatarInfo() {
		return (
			<section className="bottom-stick avatar-info">
				<a href="#" className="avatar-link">
					<img className="medium-avatar" src={this.props.maker.avatar} />

					<p className="medium-avatar-name"> {this.props.maker.name.split(" ")[0]} </p>
				</a>
					{this.renderUpvoteButton()}
			</section>
		);
	}

	renderInfoSection() {

		return (
			<section className="product-item-medium-info">
				<section>
					<h2 className="product-item-name">{this.props.name}</h2>
				<p>
					{
						this.props.description.length > 200 ?
						this.props.description.slice(0, 200) :
						this.props.description
					}
				</p>
				</section>

		{this.renderAvatarInfo()}
			</section>
		);

	}

	renderMediaSection() {
		return (
				<section className="product-item-media-medium">
			     	<img src={this.props.media[0]} />
						<img src={this.props.media[1]} />
		    </section>
		);
	}

	render() {

		return (

			<div className="product-item-medium-content">
				{this.renderTags()}
				{this.renderMediaSection()}
				{this.renderInfoSection()}
			</div>

		);
	}
}

export default ProductItemSmall;
