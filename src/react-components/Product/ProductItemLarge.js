import React from 'react';

class ProductItemLarge extends React.Component {

	renderUpvoteButton() {
		return (
			<a className="upvote-button upvote-button-large" href="#">
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
					<img className="large-avatar" src={this.props.maker.avatar} />

					<p className="large-avatar-name"> {this.props.maker.name.split(" ")[0]} </p>
				</a>
					{this.renderUpvoteButton()}
			</section>
		);
	}

	renderInfoSection() {

		return (
			<section className="product-item-large-info">
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
				<section className="product-item-media-large">
			     	<img src={this.props.media[0]} />
						<img src={this.props.media[1]} />
            <img src={this.props.media[1]} />
		    </section>
		);
	}

	render() {

		return (

			<div className="product-item-large-content">
				{this.renderTags()}
				{this.renderMediaSection()}
				{this.renderInfoSection()}
			</div>

		);
	}
}

export default ProductItemLarge;
