import alt from '../alt';
import Actions from '../actions';
import {decorate, bind} from 'alt-utils/lib/decorators';

@decorate(alt)
class ProductStore {
  constructor() {
    this.state = {
      user: null,
      products: [],
      myProducts: []
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

  @bind(Actions.getUserActiveProducts)
  getUserActiveProducts(myProducts) {
    this.setState({myProducts: myProducts})
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

// @bind(Actions.getCategories)
// getCategories(cats) {
//   let _this = this;
//   cats.forEach(function(cat) {
//     switch (cat.key) {
//       case "textbooks":
//         _this.setState({textbooks: cat});
//         break;
//       case "emergencies":
//         _this.setState({emergencies: cat});
//         break;
//       case "tutoring":
//         _this.setState({tutoring: cat});
//         break;
//       case "clothing":
//         _this.setState({clothing: cat});
//         break;
//       case "food":
//         _this.setState({food: cat});
//         break;
//       case "furniture":
//         _this.setState({furniture: cat});
//         break;
//       case "lostFound":
//         _this.setState({lostFound: cat});
//         break;
//       default:
//         _this.setState({other: cat});
//         break;
//     }
//   })
// }
