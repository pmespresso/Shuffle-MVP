import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import ProductStore from '../../stores/ProductStore';
import Actions from '../../actions';

@connectToStores
class Search extends React.Component {

  constructor() {
    super();

    this.state = {

    }
  }

  static getStores() {
    return [ProductStore];
  }

  static getPropsFromStores() {
    return ProductStore.getState();
  }

  handleChange = (e) => {
    e.preventDefault();
    var term = this.refs.search.value;

    Actions.doSearch("products", term);
  }

  render() {
    return (
      <div>
        <input ref="search" className="product-search" placeholder="Let's See What We Can Find..." onChange={this.handleChange}/>
      </div>
    );
  }

}

export default Search;
