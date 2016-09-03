import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Actions from '../../actions';
import connectToStores from 'alt-utils/lib/connectToStores';
import ProductStore from '../../stores/ProductStore';

var smallSizes = ['480px', '520px', '500px', '540px', '560px'];

@connectToStores
class ProductItemSmall extends React.Component {

	constructor() {
		super();
		this.state = {hovering: false}
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

	renderMediaSection() {
		return (
			<section className="product-item-media-small" >
				<img src={this.props.media[0]} />
			</section>
		);
	}

	isHovering = () => {
		this.setState({hovering: true});
	}

	notHovering = () => {
		this.setState({hovering: false});
	}

	cardHover() {
		return (
			this.state.hovering ?
			<CardTitle
				title={this.props.name}
				subtitle={this.props.description.slice(0, 100)}
				/> :
			null
		);
	}

	render() {

		return (
				<div className="product-item-small">
						<MuiThemeProvider>
							<Card
								onMouseEnter={this.isHovering}
								onMouseLeave={this.notHovering}
							>

								<CardHeader
									title={this.props.maker.name}
									avatar={this.props.maker.avatar}
									actAsExpander={true}
						      showExpandableButton={true}
								/>

								<CardMedia overlay={this.cardHover()} >
									<div className="product-item-media-small">
										<img src={this.props.media[0]} />
									</div>
								</CardMedia>

								<CardText expandable={true}>
									{this.renderTags()}
									<h2>TODO: Put a map here, countdown timer, and price/size/condition</h2>
				        </CardText>
							</Card>
						</MuiThemeProvider>
					</div>
		);
	}
}

export default ProductItemSmall;
