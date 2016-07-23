import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Navbar';
import HomePage from './HomePage/';
import connectToStores from 'alt-utils/lib/connectToStores';
import ProductStore from '../stores/ProductStore';
import Actions from '../actions';
import { StickyContainer, Sticky } from 'react-sticky';

@connectToStores
class App extends React.Component {

	constructor(props) {
	  super();
		Actions.initSession();
	}

	static getStores() {
		return [ProductStore];
	}

	static getPropsFromStores() {
		return ProductStore.getState();
	}



	render() {
		return(
			<StickyContainer>
			<section>
				<Sticky className="sticky">
					<Navbar user={this.props.user}/>
				</Sticky>
        <HomePage />
			</section>
			</StickyContainer>
			);
	}
}

ReactDOM.render(<App/>, document.getElementById('root'));
