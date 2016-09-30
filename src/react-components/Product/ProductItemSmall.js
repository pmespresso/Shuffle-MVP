import React from 'react';
import Actions from '../../actions';
import connectToStores from 'alt-utils/lib/connectToStores';
import ProductStore from '../../stores/ProductStore';

@connectToStores
class ProductItemSmall extends React.Component {

	constructor() {
		super();
	}

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

	renderImageWrapper() {
		return (
			<div className="image-wrapper">
					<a href="#">
							<img className="resource-image" src={this.props.media[0]} data-src="" height="253" />
					</a>
			</div>
		);
	}

	renderItemMeta() {
		return (
			<div className="home-page-meta">
				<h4 className="item-title lead"><a href="#">{this.props.name}</a></h4>
				<p className="item-description lead"> {this.props.description}</p>
				<small className="user-resource-user-details">
						<a href="#"><img src={this.props.maker.avatar} width="25" className="avatar-image" /></a>
							Shuffled by <a href="#">{this.props.maker.name}</a>
				</small>
				<a className="like" onClick={this.handleVote}><i className='fa fa-heart-o'>{this.props.upvote}</i></a>
			</div>
		);
	}

	render() {
		return (
			<div className="home-page col-xs-12 col-sm-6 col-md-4 col-lg-4">
				<div className="home-page-wrapper">
					<div className="home-page-product-list">
              {this.renderImageWrapper()}
							{this.renderItemMeta()}
					</div>
				</div>
			</div>
		);
	}
}

export default ProductItemSmall;
