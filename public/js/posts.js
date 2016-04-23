/**
 * The Postsfeed object is the primary conduit to the data feed. It provides
 * functions to login a user, log them out, and most importantly, to register
 * callbacks for events like receiving a new batch of posts to the feed, or a 
 * 
 *. This object knows nothing about the UI, see FirePosts-ui.js for
 * how this object is used to make sure the UI is updated as events come in.
 *
 * @param    {string}    baseURL     The Firebase URL.
 * @param    {boolean}   newContext  Whether a new Firebase context is used.
 *                                   (Useful for testing only)
 * @return   {FirePosts}
*/

function FirePosts(baseURL, newContext) {
  var self = this;
  this._name = null;
  this._facebookId = null;
  this._firebase = null;
  this._mainUser = null;
  this._fullName = null;
  this._searchHandler = null;
  this._currentSearch = null;
  this._baseURL = baseURL;

  this._handlers = [];

  if (!baseURL || typeof baseURL != "string") {
    throw new Error("Invalid baseURL provided");
  }
  this._firebase = new Firebase(
    baseURL, newContext || false ? new Firebase.Context() : null
  );

  this._authHandlers = [];
  this._firebase.onAuth(self._onLoginStateChange.bind(self));
}

FirePosts.prototype = {
  _validateCallback: function(cb, notInit) {
    if (!cb || typeof cb != "function") {
      throw new Error("Invalid onComplete callback provided");
    }
    if (!notInit) {
      if (!this._uid || !this._firebase) {
        throw new Error("Method called without a preceding login() call");
      }
    }
  },
  _validateString: function(str, name) {
    if (!str || typeof str != "string") {
      throw new Error("Invalid " + name + " provided");
    }
  },
  _getParameterByName: function(name) {
    var expr = "[?&]" + name + "=([^&]*)";
    var match = RegExp(expr).exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
  },
  _getPicURL: function(id, large) {
    if (id) {
      id = id.replace('facebook:', '');
    }
    return "https://graph.facebook.com/" + (id || this._uid.replace('facebook:', '')) +
           "/picture/?type=" + (large ? "large" : "square") +
           "&return_ssl_resources=1";
  },
  _onNewPostForFeed: function(feed, onComplete, onOverflow) {
    var self = this;

    // We listen for new children on the feed.
    var handler = feed.on("child_added", function(snap) {
      // When a new post is added, fetch the content from the master posts
      // list since feeds only contain references in the form of post IDs.
      var postID = snap.name();

      var postRef = self._firebase.child("posts").child(postID);
      var handler = postRef.on("value", function(postSnapshot) {
        var ret = postSnapshot.val();
        if (ret !== null) {
          ret.pic = self._getPicURL(ret.author);
          onComplete(postSnapshot.name(), ret);
        }
      });

      self._handlers.push({
        ref: postRef, handler: handler, eventType: "value"
      });

    });

    self._handlers.push({
      ref: feed, handler: handler, eventType: "child_added"
    });

    // Also listen for child_removed so we can call onOverflow appropriately.
    handler = feed.on("child_removed", function(snap) {
      onOverflow(snap.name());
    });
    self._handlers.push({
      ref: feed, handler: handler, eventType: "child_removed"
    });
  },
  _onLoginStateChange: function(user) {
    var self = this;
    if (user) {
      // The user is successfully logged in.
      this.onLogin(user);
    } else {
      // No existing session found - the user is logged out.
      this.onLogout();
    }
  },
  onStateChange: function(cb) {
    this._firebase.onAuth(cb.bind(this));
  }
};

/**
 * Attach a callback method to be invoked whenever the authentication state
 * of the user changes. If an error occurs during authentication, the error
 * object will be non-null. If a user is successfully authenticated, the error
 * object will be null, and the user object will be non-null. If a user is
 * simply logged-out, both the error and user objects will be null.
 */
FirePosts.prototype.onLoginStateChange = function(onLoginStateChange) {
  var self = this;
  self._validateCallback(onLoginStateChange, true);
  this._authHandlers.push(onLoginStateChange);
};

/**
 * Login a user using Firebase Simple Login, using the specified authentication
 * provider. Pass the optional 'rememberMe' argument to the FirebaseSimpleLogin
 * in order to create a long-lasting session. If the user is successfully
 * authenticated, then the previously-configured callback will be invoked with
 * a null error and a user object.
 *
 * @param    {string}    provider    The authentication provider to use.
 *                       "facebook"
 */
FirePosts.prototype.login = function(provider) {
  this._firebase.authWithOAuthPopup(provider, this.onLogin.bind(this));
};

/**
 * Logout the current user. The user object may be reused after a logout, but
 * only after a successful login() has been performed. After a logout occurs,
 * the session data will be cleared and writing data will no longer be
 * permitted, as configured by security rules.
 */
FirePosts.prototype.logout = function() {
  if (this._uid) {
    // Set presence to offline, reset all instance variables, and return!
    var peopleRef = this._firebase.child("people").child(this._uid);
    peopleRef.child("presence").set("offline");
  }
  this._firebase.unauth();
};


/**
 * On successful authentication, set up Firebase references and hang on to
 * relevant user data like id and name. Firebase Simple Login automatically
 * sessions the user using a combination of browser cookies and local storage
 * so there is no need to do any additional sessioning here.
 */

FirePosts.prototype.onLogin = function(user) {
  var self = this;
  if (!user) { return; }

  this._uid = user.uid;
  this._facebookId = user.facebook.id;

  // adapt model to old scheme
  var displayName = user.facebook.displayName.split(' ');
  user.first_name = displayName[0];
  user.last_name = displayName[displayName.length - 1];
  user.id = user.uid;
  user.name = user.facebook.displayName;
  user.location = user.user_location;
  user.bio = ''
  user.gender = user.facebook.cachedUserProfile.gender;
  user.pic = this._getPicURL(user.id, false);

  // Populate search index
  var firstNameKey = [user['first_name'], user['last_name'], user['id']].join('|').toLowerCase();
  var lastNameKey = [user['last_name'], user['first_name'], user['id']].join('|').toLowerCase();
  this._firebase.child('search/firstName').child(firstNameKey).set(user['id']);
  this._firebase.child('search/lastName').child(lastNameKey).set(user['id']);

  this._mainUser = self._firebase.child("users").child(this._uid);
  this._fullName = user.name;
  this._name = user.first_name;

  var peopleRef = self._firebase.child("people").child(this._uid);
  peopleRef.once("value", function(peopleSnap) {
    var info = {};
    var val = peopleSnap.val();
    if (!val) {
      // If this is a first time login, upload user details.
      info = {
        name: self._name,
        fullName: self._fullName,
        location: self.user_location,
        bio: "",
        pic: self._getPicURL()
      };
      peopleRef.set(info);
    } else {
      info = val;
    }
    peopleRef.child("presence").set("online");
    info.id = self._uid;
    self._user = info;

    // Notify downstream listeners for new authenticated user state
    for (var i = 0; i < self._authHandlers.length; i++) {
      self._authHandlers[i](null, self._user);
    }
  });
}

/**
 * On logout, clean up by removing expired user session data and marking
 * the current user as offline. Firebase Simple Login automatically handles
 * user sessions, so there is no need to do any additional sessioning here.
 */
FirePosts.prototype.onLogout = function() {
  this._user = null;
  this._facebookId = null;
  this._mainUser = null;
  this._fullName = null;
  this._name = null;

  // Notify downstream listeners for new authenticated user state
  var self = this;
  for (var i = 0; i < this._authHandlers.length; i++) {
    self._authHandlers[i](null, null);
  }
};

FirePosts.prototype.startSearch = function(resultsHandler) {
  this._searchHandler = resultsHandler;
};

FirePosts.prototype.updateSearchTerm = function(term) {
  var isValidStem = function(stem) {
    var invalid = ['.', '#', '$', '/', '[', ']'];
    for (var i = 0; i < invalid.length; ++i) {
      if (stem.indexOf([invalid[i]]) !== -1) {
        return false;
      }
    }
    return true;
  };

  if (isValidStem(term) && term.length >= 3) {
    if (this._currentSearch) {
      // we have an existing search
      if (this._currentSearch.containsTerm(term)) {
        // update the term
        this._currentSearch.updateTerm(term);
      } else {
        // stop the search
        this.stopSearching();
      }
    } else {
      // This is a new search
      this._currentSearch = new FirePostsSearch(this._firebase, term, this._searchHandler);
    }
  } else {
    this.stopSearching();
  }
};

FirePosts.prototype.stopSearching = function() {
  if (this._currentSearch) {
    this._currentSearch.stopSearch();
    this._currentSearch = null;
  }
  this._searchHandler && this._searchHandler([]);
};


/**
 * Get information on a particular post, given a post ID. You do not need
 * to be authenticated to make this call. The onComplete callback will be
 * provided an object as a single argument, containing the same fields as the
 * object returned by onNewPost().
 *
 * onComplete will be called only once as posts cannot be modified once they
 * are posted (see rules.json).
 *
 * @param    {string}    id          The post ID of the post to be fetched.
 * @param    {Function}  onComplete  The callback to call with the post.
 */
FirePosts.prototype.getPost = function(id, onComplete) {
  var self = this;
  self._validateCallback(onComplete, true);
  self._firebase.child("posts").child(id).once("value", function(snap) {
    onComplete(snap.val());
  });
};


/**
 * Post a Post as the current user. The provided callback will be called with
 * (err, done) where "err" will be false if the post succeeded, and done will
 * be set to the ID of the Post just posted. You need to be authenticated
 * through login() to use this function.
 *
 * @param    {string}    content     The content of the Post in json form.
 * @param    {Function}  onComplete  The callback to call when the post is done.
 */
FirePosts.prototype.post = function(postTitle, postDescription, postPrice, postMinimumOffer, onComplete) {
  var self = this;
  self._validateString(content, "post");
  self._validateCallback(onComplete);

  // First, we add the Post to the global posts list. push() ensures that
  // we get a unique ID for the Post that is chronologically ordered.
  var postRef = self._firebase.child("posts").push();
  var postRefId = postRef.name();
  var post = {
    author: self._uid, // uid for v2 security rules
    by: self._fullName,
    title: postTitle,
    description: postDescription,
    price: postPrice,
    minimumOffer: postMinimumOffer,
    timestamp: new Date().getTime()
  };

  postRef.set(post, function(err) {
    if (err) {
      onComplete(new Error("Could not post Post"), false);
      return;
    }

    // Now we add a "reference" to the Post we just pushed, by adding it to
    // the posts list for the current user.
    var feedPostRef = self._mainUser.child("posts").child(postRefId);
    feedPostRef.set(true, function(err) {
      if (err) {
        onComplete(new Error("Could not add Post to feed"), false);
        return;
      }

      // Then, we add the Post ID to the users own feed.
      self._mainUser.child("feed").child(postRefId).set(true);

      // We also add ourself (with priority) to a list of users with recent
      // activity which we can use elsewhere to see "active" users.
      var time = new Date().getTime();
      var recentUsersRef = self._firebase.child("recent-users");

      recentUsersRef.child(self._uid).setWithPriority(true, time);

      // We'll also add the Post to a separate list of most recent posts
      // which can be displayed elsewhere, just like active users above.
      var recentPostRef = self._firebase.child("recent-posts");
      recentPostRef.child(PostRefId).setWithPriority(true, time);

      // Finally, we add the Post ID to the feed of everyone who follows
      // the current user.
      self._mainUser.child("followers").once("value", function(followerList) {
        followerList.forEach(function(follower) {
          if (!follower.val()) {
            return;
          }
          var childRef = self._firebase.child("users").child(follower.name());
          childRef.child("feed").child(PostRefId).set(true);
        });
      });

      // All done!
      onComplete(false, PostRefId);
    });
  });
};


/**
 * Set one of our profile fields (e.g. bio, location, etc.)
 *
 * @param    {string}    field       The name of the field (e.g. 'bio').
 * @param    {Object}    value       The new value to write.
 */
FirePosts.prototype.setProfileField = function(field, value) {
  var peopleRef = this._firebase.child("people").child(this._uid);
  peopleRef.child(field).set(value);
};


/**
 * Register a callback to be notified whenever a new Post appears on the
 * current user's list. This is usually triggered by another user posting a
 * Post (see FirePosts.post), which will appear in real-time on the current
 * user's feed!
 *
 * You can limit the number of posts that you'll get by passing a number as
 * the first argument. The onComplete callback will called only for the 100
 * latest posts. The callback will also be called for any posts that are
 * added subsequently, but if the total number of posts exceeds the number
 * provided, the onOverflow callback will be called to compensate.
 *
 * To hook this up to the DOM, simply display a Post in your onComplete
 * callback, but also remove the Post in the onOverflow callback. This will
 * ensure that the total number of posts displayed on your page will never
 * exceed the number specified (default is 100).
 *
 * You need to be authenticated through login() to use this function.
 *
 * @param    {number}    totalCount  The maximum number of posts to report.
 *                                   If new posts are added after this event
 *                                   handler is set, they will also be reported
 *                                   but the onOverflow callback will be
 *                                   invoked with the oldest posts to
 *                                   compensate.
 *
 * @param    {Function}  onComplete  The callback to call whenever a new Post
 *                                   appears on the current user's feed. The
 *                                   function will be invoked with two
 *                                   arguments, the first of which is the Post
 *                                   ID and the second an object containing the
 *                                   "author", "by", "pic" and "content"
 *                                   properties.
 *
 * @param    {Function}  onOverflow  The callback that will be called when
 *                                   onComplete has already been called
 *                                   totalCount times, to keep the total number
 *                                   of reported posts capped at totalCount.
 *                                   This will be called with one argument,
 *                                   the Post ID of the Post expected to
 *                                   removed (the oldest Post).
 */
FirePosts.prototype.onNewPost = function(totalCount, onComplete, onOverflow) {
  this._validateCallback(onComplete);
  this._validateCallback(onOverflow);

  var feed = this._mainUser.child("feed").limit(totalCount || 100);
  this._onNewPostForFeed(feed, onComplete, onOverflow);
};

/**
 * Register a callback to be notified whenever a given user posts a new Post.
 * Since all posts are public, you do not need to be authenticated to
 * set this event handler. The parameters of this function behave exactly
 * like onNewPost, except that the posts returned are always for the
 * specified user.
 *
 * You do not need to be authenticated to use this function.
 *
 * @param    {string}    id          The user ID from whom the posts are
 *                                   fetched. Defaults to 10.
 * @param    {number}    count       The maximum number of posts to report.
 *
 * @param    {Function}  onComplete  The callback to call whenever a new Post
 *                                   appears on the specified user's feed.
 *
 * @param    {Function}  onOverflow  The callback that will be called when
 *                                   a Post needs to be evicted.
 */
FirePosts.prototype.onNewPostFor = function(id, count, onComplete, onOverflow) {
  this._validateCallback(onComplete, true);
  this._validateCallback(onOverflow, true);

  var feed = this._firebase.child("users").child(id).child("posts");
  feed = feed.limit(count || 10);

  this._onNewPostForFeed(feed, onComplete, onOverflow);
}

/**
 * Register a callback to get the latest posts (default 5). The onComplete and
 * onOverflow handlers will be invoked in the same manner as onNewPostFor.
 *
 * You do not need to be authenticated to use this function.
 *
 * @param    {number}    count       The maximum number of posts to report.
 *
 * @param    {Function}  onComplete  The callback to call whenever a new Post
 *                                   is added to the latest set.
 *
 * @param    {Function}  onOverflow  The callback that will be called when
 *                                   a Post needs to be evicted from the
 *                                   latest set.
 */
FirePosts.prototype.onLatestPost = function(count, onComplete, onOverflow) {
  this._validateCallback(onComplete, true);
  this._validateCallback(onOverflow, true);

  var feed = this._firebase.child("recent-posts");
  feed = feed.limit(count || 5);

  this._onNewPostForFeed(feed, onComplete, onOverflow);
};

/**
 * Unload all event handlers currently registered. You must call this function
 * when you no longer want to receive updates. This is especially important
 * for single page apps, when transistioning between views. It is safe to
 * reuse the FirePosts object after calling this and registering new handlers.
 */
FirePosts.prototype.unload = function() {
  for (var i = 0; i < this._handlers.length; i++) {
    var ref = this._handlers[i].ref;
    var handler = this._handlers[i].handler;
    var eventType = this._handlers[i].eventType;
    ref.off(eventType, handler);
  }
  this._handlers = [];
};