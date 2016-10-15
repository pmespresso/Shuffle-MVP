import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Navbar/';
import HomePage from './HomePage/';
import Profile from './Profile/';
import Post from './Post';
import connectToStores from 'alt-utils/lib/connectToStores';
import ProductStore from '../stores/ProductStore';
import Actions from '../actions';
import { StickyContainer, Sticky } from 'react-sticky';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {Router, Route, IndexRoute, hashHistory} from 'react-router';

@connectToStores
class App extends React.Component {

	constructor(props) {
	  super();

    this.state = {
      category: "",
			stickyStyle: {
					zIndex: 100,
					padding: 0,
					margin: 0,
					height: 50
			}
    }

		Actions.initSession();
	}

	static getStores() {
		return [ProductStore];
	}

	static getPropsFromStores() {
		return ProductStore.getState();
	}

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnMount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll = (event) => {
		event.preventDefault();
		let scrollTop = event.srcElement.body.scrollTop
		let itemTranslate = Math.min(0, scrollTop/3 - 60);
	}

	shuffle() {
		Actions.shuffleProducts();
	}

	category = () => {
		return this.state.category || null;
	}

	setCategory = (category) => {
		this.setState({category: category})
	}

	render() {
		let stickyStyle = this.state.stickyStyle;

		return(
			<StickyContainer>
			<section className="page-content">
				<Sticky stickyStyle={stickyStyle}>
					<Navbar user={this.props.user} />
				</Sticky>
				{this.props.children}
			</section>
			</StickyContainer>
			);
	}
}

ReactDOM.render(
	<Router history={hashHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={HomePage}/>
				<Route path="/user(/:userId)" name="user" component={Profile}></Route>
				<Route path="/post" component={Post}></Route>
		  </Route>
	</Router>,
	document.getElementById('root'));
