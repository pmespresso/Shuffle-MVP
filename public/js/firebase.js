var baseURL = new Firebase("https://shufflemvp.firebaseio.com/");
var postsRef = new Firebase("https://shufflemvp.firebaseio.com/posts");

var Firebase = function() {};


Firebase.prototype.getPostData = function() {
	postsRef.once('value', function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			var key = childSnapshot.key();

			var childDatum = childSnapshot.val();

			if (snapshot.val() === undefined || snapshot.val() === null) {
				console.log("FOR THE DEVELOPER: this happens when no posts exist on the database yet.");
			}
			init.setUpFeed(key, snapshot.val());
		});
	});
}

Firebase.prototype.handleFileSelect() = function(evt) {
  var f = evt.target.files[0];
  var reader = new FileReader();
  reader.onload = (function(theFile) {
    return function(e) {
      var filePayload = e.target.result;
      // Generate a location that can't be guessed using the file's contents and a random number
      var hash = CryptoJS.SHA256(Math.random() + CryptoJS.SHA256(filePayload));
      var f = new Firebase(firebaseRef + 'pano/' + hash + '/filePayload');
      spinner.spin(document.getElementById('spin'));
      // Set the file payload to Firebase and register an onComplete handler to stop the spinner and show the preview
      f.set(filePayload, function() { 
        spinner.stop();
        document.getElementById("pano").src = e.target.result;
        $('#file-upload').hide();
        // Update the location bar so the URL can be shared with others
        window.location.hash = hash;
      });
    };
  })(f);
  reader.readAsDataURL(f);
}


//user pressed sell Item, now you must push the new post info to Firebase.
Firebase.prototype.sellItem() {
	postsRef.push().update({
	    time_added: date,
	    img: '', //upload to Firebase
	    title: $('input#productName').val(),
	    description: $('input#productDescription').val(),
	    minimumOffer: $('input#minimumOffer').val()
	  });
}

module.exports = Firebase;