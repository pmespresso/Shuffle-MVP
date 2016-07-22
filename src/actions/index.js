import alt from '../alt';
var _ = require('lodash');
var firebase = require("firebase/app");
  require("firebase/auth");
  require("firebase/database");

class Actions {

  initSession() {
    return (dispatch) => {
      var config = {
        apiKey: "AIzaSyAlovAl22dr9Dn8gEuzMdL4IYVXQywXkDs",
        authDomain: "shufflemvp.firebaseapp.com",
        databaseURL: "https://shufflemvp.firebaseio.com",
        storageBucket: "project-3575180930557666999.appspot.com",
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
          var products = _.values(snapshot.val());
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

}

export default alt.createActions(Actions);
