
var __fireposts_ui;
$(function() {
  __fireposts_ui = new FirepostsUI();
});

function FirepostsUI() {
  this._limit = 141;
  this._loggedIn = false;
  this._spinner = new Spinner();
  this._firefeed = new Firefeed("https://shufflemvp.firebaseio.com/");
  this._unload = null;

  // Setup page navigation.
  this._setupHandlers();

  // Setup History listener.
  var self = this;
  window.History.Adapter.bind(window, "statechange", function() {
    self._pageController(window.History.getState().hash, false);
  });

  self._firefeed.onStateChange(function(user) {
    self.onLoginStateChange(user);
  });
}

FirepostsUI.prototype._setupHandlers = function() {
  var self = this;
  $(document).on("click", "", function(e) {
    e.preventDefault();
    self._go($(this).attr("href"));
  });

};