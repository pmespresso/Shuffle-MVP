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
        console.log(current);
        if (current) {
          console.log("user is currently logged in");
          user = {
            id: current.uid,
            name: current.displayName,
            avatar: current.photoURL
          }
          console.log(user);
        } else {
          console.log("user is not currently logged in");
          user = null;
        }
        console.log("dispatched user: ", user);
        setTimeout( () => dispatch(user));
        console.log("dispatched user");
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
        console.log("Successfully logged in!", user);
        // dispatch user
        dispatch(user);
        console.log("dispatched user login");
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
    console.log("getting products");
    return(dispatch) => {
      var db = firebase.database();
      var firebaseRef = db.ref("/products");

      firebaseRef.on('value', (snapshot) => {
        console.log("dispatching products");
        console.log("prev products", snapshot.val());
          var productsValue = snapshot.val();

          var products = _(productsValue).keys().map((productKey) => {
            var item = _.clone(productsValue[productKey]);
            item.key = productKey;
            return item;
          })
          .value();
          console.log(products);
          dispatch(products);
        });
    }
  }

  addProduct(product) {
    return (dispatch) => {
      var db = firebase.database();
      var firebaseRef = db.ref("/products");
      firebaseRef.push(product);
    }
  }

  upvote(productID, userID) {
    return (dispatch) => {
      var db = firebase.database();
      var ref = db.ref('products');
      console.log(productID);
      // ref = ref.child(productID).child('upvote');

      // var vote = 0;
      // ref.on('value', (snapshot)=> {
      //   vote = snapshot.val();
      // });
      // ref.set(vote+1);
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

}

export default alt.createActions(Actions);
