var baseURL = new Firebase("https://shufflemvp.firebaseio.com/");
var postsRef = new Firebase("https://shufflemvp.firebaseio.com/posts");


//TODO ***** Get the image from AWS S3
function addPost(key, fullData) {
	console.log(fullData);
  $('#posts').append('<div class="col-md-4 market-item market-item-small">' + '<a href="">' + '<img class="img-responsive" src="img/food1.jpg" alt=""/>' + '</a>' + 
 '<h3>' + '<a href="" id="postName">' + fullData[key].title + '<a/>' + '</h3>' + 
 '<p id="description">' + fullData[key].description + '</p>' + '<button class="btn btn-primary offer">' + 'Make Offer' + '</button>' + 
 '<button class="btn btn-primary save" >' + 'Save' + '</button>' + '</div>');
}

/* This initially gets called for each post in the Firebase database
* 	Looks a little like:
* 		key = H2389HDAjucpiafo0
*		childDatum = {title: dildos; description: sexy; minimumOffer: 20}
*/
function setUpFeed(key, fullData) {
	addPost(key, fullData); 
}

$(document).ready(function() {
	postsRef.once('value', function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			var key = childSnapshot.key();

			var childDatum = childSnapshot.val();
			// console.log(childData);
			setUpFeed(key, snapshot.val());
		});
	})
});

$('input#productImage').on('change', function () {
  var reader = new FileReader();

  reader.onload = function (e) {
      var thisImage = reader.result;
      localStorage.setItem("imgData", thisImage);
  };

  reader.readAsDataURL(this.files[0]);

    var dataImage = localStorage.getItem('imgData');
    var imgCtr = $('<img/>').prop('src', dataImage);
    $('div#productImageView').empty();
    $('div#productImageView').append(imgCtr);
});

function clearInputPage() {
  $('div#productImageView').empty();
  $('p#productName').empty();
  $('p#productPrice').empty();
  $('p#productDescription').empty();
  $('input#productName').val("");
  $('input#minimumOffer').val("");
  $('input#productDescription').val("");
}

$('input').on('change', function() {
  $('p#productName').empty();
  $('p#productPrice').empty();
  $('p#productDescription').empty();

  $('p#productName').append($('input#productName').val());
  // Temporary, later will add QuickDeal functionality
  $('p#productPrice').append($('input#minimumOffer').val());
  $('p#productDescription').append($('input#productDescription').val());

});

//When user exits with the close button, all unsaved info gets cleared.
$('#makePostModal').on('hide.bs.modal', function (e) {
  clearInputPage();
});


//User Pressed Sell button
$('input#sellButton').click(function() {
  var date = new Date().toLocaleString()

  postsRef.push().update({
    time_added: date,
    img: $('div#productImageView').val(), //upload to Firebase the link to AWS
    title: $('input#productName').val(),
    description: $('input#productDescription').val(),
    minimumOffer: $('input#minimumOffer').val()
  });

  clearInputPage();

  $('#makePostModal').modal('hide');
});

//TODO ***** figure out how to save the url reference to Firebase, and actually save the image to AWS S3.
postsRef.on('value', function(snapshot) {
  var postsData = snapshot.val(); //an array of the post objects
  var postIDs = Object.keys(postsData); //an array of each postID
  addPost(postIDs[postIDs.length - 1], postsData);
});


//TODO ******************************

$('button#preview').click(function() {
  

  

});