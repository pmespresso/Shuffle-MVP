import React from 'react';
import Actions from '../../actions';
import connectToStores from 'alt-utils/lib/connectToStores';
import ProductStore from '../../stores/ProductStore';

import { Link } from 'react-router';

@connectToStores
class ProductItemSmall extends React.Component {

	constructor(props) {
		super(props);
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
							<img className="resource-image img-responsive" src={this.props.media[0]} data-src=""/>
					</a>
			</div>
		);
	}

	renderItemMeta() {
		// let to = "/products" + this.props.pid;
		return (
			<div className="home-page-item-meta">
				<h4 className="item-title lead"><Link to={`/products/${this.props.pid}`}>{this.props.name}</Link></h4>

				<p className="item-description lead"> {this.props.description}</p>
				<small className="user-resource-user-details">
						<a href="#"><img src={this.props.maker.avatar} width="20" className="avatar-image img-responsive" /></a>
							Shuffled by <a href="#">{this.props.maker.name}</a>
						<a className="like" onClick={this.handleVote}><i className='fa fa-heart-o'>{this.props.upvote}</i></a>
				</small>
			</div>
		);
	}

	render() {

		return (
			<div className="home-page-item col-xs-12 col-sm-12 col-md-4 col-lg-4" onClick={this.showProductPage}>
				<div className="home-page-item-wrapper">
					<div className="item">
              {this.renderImageWrapper()}
							{this.renderItemMeta()}
					</div>
				</div>
      </div>
		);
	}
}

export default ProductItemSmall;
