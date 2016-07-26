import alt from '../alt';
import Actions from '../actions';
import {decorate, bind} from 'alt-utils/lib/decorators';

@decorate(alt)
class ProductStore {
  constructor() {
    this.state = {
      user: null,
      products: []
    };
  }

  @bind(Actions.login, Actions.initSession, Actions.logout)
  setUser(user) {
    this.setState({user: user});
  }

  @bind(Actions.getProducts)
  getProducts(products) {
    this.setState({products: products});
  }

  @bind(Actions.shuffleProducts)
  shuffleProducts(products) {
    var shuffled = this.state.products;
    var currentIndex = shuffled.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = shuffled[currentIndex];
      shuffled[currentIndex] = shuffled[randomIndex];
      shuffled[randomIndex] = temporaryValue;
    }

    this.setState({products: shuffled});

  }
}

export default alt.createStore(ProductStore);
