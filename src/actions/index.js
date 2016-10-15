'use strict';

import alt from '../alt';

var _ = require('lodash');
var firebase = require("firebase/app");
  require("firebase/auth");
  require("firebase/database");
var configs = require("./config");

class Actions {

  initSession() {
    return (dispatch) => {
      var config = {
        apiKey: configs.apiKey,
        authDomain: configs.authDomain,
        databaseURL: configs.databaseURL,
        storageBucket: configs.storageBucket,
      };
      firebase.initializeApp(config);
      var authData = firebase.auth().currentUser;
      var user;

      firebase.auth().onAuthStateChanged( (current) => {
        if (current) {
          console.log("user is currently logged in");
          user = {
            id: current.uid,
            name: current.displayName,
            avatar: current.photoURL
          }
        } else {
          user = null;
        }
        setTimeout( () => dispatch(user));
      });

    }
  }

  login() {
    return (dispatch) => {
      var provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
        var user = {
          id: result.user.uid,
          name: result.user.displayName,
          avatar: result.user.photoURL
        }

        firebase.database().ref().child("users").child(result.user.uid).set(user);
        // dispatch user
        dispatch(user);
      }).catch(function(error) {
        console.log("Login failed");
      });
    }
  }

  logout() {
    return(dispatch) => {
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log("Logout successful!");
        setTimeout(() => dispatch(null));
      }, function(error) {
        // An error happened.
        console.log("Logout failed");
      });
    }
  }

  getProducts() {
    return(dispatch) => {
      var db = firebase.database();
      var firebaseRef = db.ref("/products");

      firebaseRef.on('value', (snapshot) => {
          var productsValue = snapshot.val();
          var products = _(productsValue).keys().map((productKey) => {
            var item = _.clone(productsValue[productKey]);
            item.key = productKey;
            return item;
          })
          .value();
          dispatch(products);
        });
    }
  }

  getUserActiveProducts(id) {
    return (dispatch) => {
      var db = firebase.database();

      var userActiveProductsRef = db.ref("/users/"+id+"/activeProducts");
      var productsRef = db.ref("/products");

      userActiveProductsRef.on('value', (snapshot) => {
          var productsValue = snapshot.val();
          var products = _(productsValue).keys().map((productKey) => {
            var item = _.clone(productsValue[productKey]);
            item.key = productKey;
            return item;
          })
          .value();
          dispatch(products);
        });
    }
  }

  shuffleProducts() {
    return null;
  }

 /*
    In the interest of keeping a flat data structure,
    we push entire product objects to /products, and
    a reference to that product's key to /categories
    as well as to users/uid/products.
 */

  addProduct(product, uid) {
    return (dispatch) => {
      var db = firebase.database();
      var productsRef = db.ref("/products");
      var userRef = db.ref("/users");
      var catRef = db.ref("/categories");

      // With Firebase/NoSql, you need to keep the same object
      // accessible from a bunch of different places.
      var productKey = productsRef.push(product).key;
      userRef.child(uid).child("/activeProducts").push(product);
      var cat = product.category;
      catRef.child(cat).push(product);
    }
  }

  upvote(productID, userID) {
    return (dispatch) => {
      var db = firebase.database();
      var ref = db.ref('products');
      var voteRef = db.ref('votes').child(productID).child(userID);
      voteRef.on('value', (snapshot) => {
        if(snapshot.val() == null) {
          voteRef.set(true);
          ref = ref.child(productID).child('upvote');
          var vote = 0;
          ref.on('value', (snapshot)=> {
            vote = snapshot.val();
          });
          ref.set(vote+1);
        }
      });
    }
  }

  // This works! :)
  getClothing() {
    return (dispatch) => {
      var db = firebase.database();
      var firebaseRef = db.ref("/categories/clothing");
      firebaseRef.on('value', (snapshot) => {
        var clothesValues = snapshot.val();
        var clothes = _(clothesValues).keys().map((clothesKeys) => {
          var item = _.clone(clothesValues[clothesKeys]);
          item.key = clothesKeys;
          return item;
        })
        .value();
        dispatch(clothes);
      });
    }
  }




  // getCategories() {
  //   return(dispatch) => {
  //     var db = firebase.database();
  //     var firebaseRef = db.ref("/categories");
  //     firebaseRef.on('value', (snapshot) => {
  //         var catsValue = snapshot.val();
  //         var cats = _(catsValue).keys().map((catsKey) => {
  //           var item = _.clone(catsValue[catsKey]);
  //           item.key = catsKey;
  //           return item;
  //         })
  //         .value();
  //         dispatch(cats);
  //       });
  //   }
  // }

}

export default alt.createActions(Actions);
