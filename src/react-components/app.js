import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Navbar';
import HomePage from './HomePage/';
import Post from './Post';
import Shuffle from './Shuffle';
import connectToStores from 'alt-utils/lib/connectToStores';
import ProductStore from '../stores/ProductStore';
import Actions from '../actions';
import { StickyContainer, Sticky } from 'react-sticky';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

@connectToStores
class App extends React.Component {

	constructor(props) {
	  super();

    this.state = {
      category: ""
    }

		Actions.initSession();
	}

	static getStores() {
		return [ProductStore];
	}

	static getPropsFromStores() {
		return ProductStore.getState();
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
		return(
			<StickyContainer>
			<section className="page-content">
				<Sticky className="sticky">
					<Navbar user={this.props.user} setCategory={this.setCategory.bind(this)}/>
					<Post user={this.props.user}/>
					<Shuffle user={this.props.user} shuffle={this.shuffle}/>
				</Sticky>
        <HomePage category={this.category} />
			</section>
			</StickyContainer>
			);
	}
}

ReactDOM.render(<App/>, document.getElementById('root'));
