import React from 'react';
import ProductStore from '../../stores/ProductStore';
import Actions from '../../actions';
import connectToStores from 'alt-utils/lib/connectToStores';

import { Link } from 'react-router';


@connectToStores
class CategoriesMenu extends React.Component {

  constructor() {
    super();
    this.state = {
      showCategoriesNav: false
    }
  }

  static getStores() {
    return [ProductStore];
  }

  static getPropsFromStores() {
    return ProductStore.getState();
  }

  handleClick = () => {
    if (this.state.showCategoriesNav) {
      this.setState({showCategoriesNav: false});
    } else {
      this.setState({showCategoriesNav: true});
    }
  };

  handleClickOutside = (e) => {
    if (e.target != this.refs.categoriesBtn) {
      this.setState({showCategoriesNav: false});
    }
  };

  componentWillMount() {
    window.addEventListener("click", this.handleClickOutside, false);
  }

  componentDidMount() {
    Actions.getClothing();
  }

  componentWillUnMount() {
    window.removeEventListener("click", this.handleClickOutside, false);
  }

  handleCategorySelect(category) {
    console.log(this.props.clothing);
    // switch (category) {
    //   case "textbooks":
    //     Actions.getTextbooks();
    //     break;
    //   case "emergencies":
    //     Actions.getEmergencies();
    //     break;
      // case "clothing":
      //   console.log('ass');
      //
      //   break;
      // default:
      //   console.log("Handle Category Select Defaulted Here");
    // }
  }

  //HACK: Since we have limited categories for now, statically defined categories is fine.
  //TODO: Be able to query the categories endpoint and map the names dynamically.
  //TODO: This breaks. Figure out how to pass information from this component
          // to HomePage component to ProductList, so you map over different
          // endpoints of the store on click.
  renderProfileNav() {
    return (
      <nav className="categories-nav" ref="categoriesNav">
        <a>Textbooks</a>
        <a>Emergencies</a>
        <a>Tutoring</a>
        <a onClick={this.handleCategorySelect("clothing")}>Clothing</a>
        <a>Food</a>
        <a>Furniture</a>
        <a>Other</a>
      </nav>
    );
  }
  render() {
    return (
      <section className="categories-menu">
        <i className="fa fa-bars categories-btn" ref="categoriesBtn" onClick={this.handleClick}></i>
        {
          this.state.showCategoriesNav ? this.renderProfileNav() : null
        }
      </section>
    );
  }
}

export default CategoriesMenu;
