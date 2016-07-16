import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Navbar';
import HomePage from './HomePage/';

class App extends React.Component {

	constructor(props) {
	  super();
	}

	render() {

		return(
			<section>
				<Navbar user={true}/>
        <HomePage />
			</section>
			);
	}
}

ReactDOM.render(<App/>, document.getElementById('root'));
