import React from 'react';
import ReactDOM from 'react-dom';

import HomePage from './HomePage/'

class App extends React.Component {

	constructor(props) {
	  super();
	}

	render() {

		return(
			<section>
        <HomePage />
			</section>
			);
	}
}

ReactDOM.render(<App/>, document.getElementById('root'));
