
var __fireposts_ui;
$(function() {
  __fireposts_ui = new FirepostsUI();
});

function FirepostsUI() {
  this._limit = 141;
  this._loggedIn = false;
  // this._spinner = new Spinner();
  this._postsfeed = new FirePosts("https://shufflemvp.firebaseio.com/");
  this._unload = null;

  // Setup page navigation.
  this._setupHandlers();

  // Setup History listener.
  var self = this;
  window.History.Adapter.bind(window, "statechange", function() {
    self._pageController(window.History.getState().hash, false);
  });

  self._postsfeed.onStateChange(function(user) {
    self.onLoginStateChange(user);
  });
}

FirepostsUI.prototype._setupHandlers = function() {
   var self = this;
  $(document).on("click", "#makePostButton", function(e) {
    e.preventDefault();
    self._go($(this).attr("data-target"));
  });
  $(document).on("click", "#search-button", function(e) {
    e.preventDefault();
    self._go("/?search");
  });
  $(document).on("click", "#top-logo", function(e) {
    e.preventDefault();
    self._go("/");
  });
  $(document).on("click", "#logout-button", function(e) {
    e.preventDefault();
    self.logout();
  });
};

FirepostsUI.prototype._go = function(url) {
  window.History.pushState(null, null, url);
};

FirepostsUI.prototype._pageController = function(url) {
  // Extract sub page from URL, if any.
  var idx = url.indexOf("?");
  var hash = (idx > 0) ? url.slice(idx + 1) : "";
  var value = hash.split("=");

  this._unload && this._unload();

  switch (value[0]) {
    case "profile":
      if (!value[1]) {
        this._unload = this.render404();
      } else {
        this._unload = this.renderProfile(value[1]);
      }
      break;
    case "post":
      if (!value[1]) {
        this._unload = this.render404();
      } else {
        this._unload = this.renderPost(value[1]);
      }
      break;
    case "search":
      this._unload = this.renderSearch();
      break;
    default:
      if (this._loggedIn) {
        this._unload = this.renderTimeline(this._loggedIn);
      } else {
        this._unload = this.renderHome();
      }
      break;
  }
};

FirepostsUI.prototype._postHandler = function(e) {
  var $postTitle = $("input#productName");
  var $postPrice = $("input#minimumOffer");
  var $postDesc  = $("textarea#productDescription");

  var $previewTitle = $("span#productName");
  var $previewPrice = $("span#minimumOffer");
  var $previewDesc = $("span#productDescription");

  $postTitle.on("change", function(e) {
    console.log("HELLO");
    e.preventDefault();
    $previewTitle.append("<p>" + $previewTitle.val() + " </p>");
  });

  var sellButton = $("#sellButton");
  var containerEl = $("#makePostButton");
  var message = $("<div>").addClass("msg").html("Posting...");

  var self = this;
  e.preventDefault();
  sellButton.replaceWith(message);
  self._spinner.spin(containerEl.get(0));

  self._postsfeed.post(sparkText.val(), function(err, done) {

    if (!err) {
      message.html("Posted!").css("background", "#008000");
      postText.val("");
    } else {
      message.html("Posting failed!").css("background", "#FF6347");
    }
    self._spinner.stop();
    $("#c-count").val(self._limit);
    message.css("visibility", "visible");
    message.fadeOut(1500, function() {
      message.replaceWith(sparkButton);
      sparkButton.click(self._postHandler.bind(self));
    });
  });
};








