import React from 'react';
import Actions from '../../actions';
import connectToStores from 'alt-utils/lib/connectToStores';
import ProductStore from '../../stores/ProductStore';

var smallSizes = ['480px', '520px', '500px', '540px', '560px'];

@connectToStores
class ProductItemSmall extends React.Component {

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

	toggleHover = () => {
		this.classList.toggle('hover');
	}

	renderUpvoteButton() {
		return (
			<a className="upvote-button upvote-button-small">
				<span onClick={this.handleVote}>
					<i className="fa fa-heart-o"><span> {this.props.upvote} </span></i>
				</span>
			</a>
		);
	}

	renderTags() {
		return (
			<div className="tags">
	  		<a href="#"> {this.props.tags[0]} </a>
				<a href="#"> {this.props.tags[1]} </a>
				<a href="#"> {this.props.tags[2]} </a>
		  </div>
		)
	}

	renderAvatarInfo() {
		return (
			<section className="bottom-stick avatar-info">
				<a href="#" className="avatar-link">
					<img className="small-avatar" src={this.props.maker.avatar} />

					<p className="small-avatar-name"> {this.props.maker.name.split(" ")[0]} </p>
				</a>
					{this.renderUpvoteButton()}
			</section>
		);
	}

	renderInfoSection() {

		return (
			<section className="product-item-small-info">
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
			<section className="product-item-media-small" >
				<img src={this.props.media[0]} />
			</section>
		);
	}

	render() {

		return (
			<div className="flip-container-small flip-container" onTouchStart={this.toggleHover}>
					<div style={{height: smallSizes[this.props.sizeIDX % 3]}} className="product-item-small flip-product">
						<div className="front-small front">
							<div className="product-item-small-content">
								{this.renderMediaSection()}
								{this.renderInfoSection()}
							</div>
						</div>
						<div className="back-small back">
							{this.renderTags()}
						</div>
					</div>
			</div>
		);
	}
}

export default ProductItemSmall;
