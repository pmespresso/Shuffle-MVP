import React from 'react';
import Actions from '../../actions';
import connectToStores from 'alt-utils/lib/connectToStores';
import ProductStore from '../../stores/ProductStore';

@connectToStores
class ProductItemMedium extends React.Component {

	static getStores() {
		return [ProductStore];
	}

	static getPropsFromStores() {
		return ProductStore.getState();
	}

	handleVote = (e) => {
		e.preventDefault();
		Actions.upvote(this.props.pid, this.props.user.id);
	};

	renderUpvoteButton() {
		return (
			<a className="upvote-button upvote-button-medium" href="#">
				<span onClick={this.handleVote}>
					<i className="fa fa-heart-o"><span> {this.props.upvote ? this.props.upvote : 0} </span></i>
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

			<div className="flip-container-medium flip-container" onTouchStart={this.toggleHover}>
					<div className="product-item-medium flip-product">
						<div className="front-medium front">
							<div className="product-item-medium-content">
								{this.renderTags()}
								{this.renderMediaSection()}
								{this.renderInfoSection()}
							</div>
						</div>
						<div className="back-medium back">
							{this.renderTags()}
						</div>
					</div>
			</div>
		);
	}
}

export default ProductItemMedium;
