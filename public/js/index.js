var firebaseRef = new Firebase("https://shufflemvp.firebaseio.com/");
var postsRef = new Firebase("https://shufflemvp.firebaseio.com/posts");
var usersRef = new Firebase("https://shufflemvp.firebaseio.com/users");

var roleArn = 'arn:aws:iam::829041221529:role/shuffleAdministrator';

var bucketName = 'shuffle-norcal';

AWS.config.region = 'us-west-1';

var bucket = new AWS.S3({
    params: {
        Bucket: bucketName
    }
});


//Facebook Authorization
firebaseRef.authWithOAuthPopup("facebook", function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
    $('#userProfileNavImage').append('<img src=' + authData.facebook.profileImageURL + ' />');

    //creating new user
    usersRef.transaction(function(currentData) {
      if (currentData === null) {
        return {
          name: authData.facebook.displayName,
          userid: authData.uid,
          cohort: authData.facebook.email.slice(authData.facebook.email.search('@'), authData.facebook.email.length),
          token: authData.token,
          email: authData.facebook.email,
          activePosts: '',
          profile_image: authData.facebook.profileImageURL
        }
      } else {
        window.alert(currentData + " already exists!");
      }
    });
  }
}, {
  remember: 'default',
  scope: 'public_profile'
});

//TODO ***** Get the image from AWS S3
function addSmallPost(key, fullData) {
  $('.grid').append('<div class="grid-item">' + '<a href="">' + '<img src="img/books_collection1.jpg" alt=""/>' + '</a>' + 
 '<h3>' + fullData[key].title + '</h3>' + 
 '<p id="description">' + fullData[key].description + '</p>' + '<button class="btn btn-primary offer">' + 'Message Seller' + '</button>' + 
 '<button class="btn btn-primary save" >' + 'Save' + '</button>' + '</div>');
}

/* This initially gets called for each post in the Firebase database
* 	Looks a little like:
* 		key = H2389HDAjucpiafo0
*		childDatum = {title: dildos; description: sexy; minimumOffer: 20}
*/
function setUpFeed(key, fullData) {
	//Temporary before adding other size cards
  // Also you shouldn't be loading everything everytime you load
	addSmallPost(key, fullData); 
}

$(document).ready(function() {
	postsRef.once('value', function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			var key = childSnapshot.key();

			var childDatum = childSnapshot.val();

			if (snapshot.val() === undefined || snapshot.val() === null) {
				console.log("FOR THE DEVELOPER: this happens when no posts exist on the database yet.");
			}
			setUpFeed(key, snapshot.val());
		});
	});
});


$('input#minimumOffer').on('change', function() {
	return event.charCode >= 48 && event.charCode <= 57;
});


$('input#productImage').on('change', function() {
  var $fileObject = $('#productImage')[0].files[0];
  $('div#productImageView').append();
});

function clearInputPage() {
  $('div#productImageView').empty();
  $('p#productName').empty();
  $('p#productPrice').empty();
  $('p#productDescription').empty();
  $('input#productName').val("");
  $('input#minimumOffer').val("");
  $('textarea#productDescription').val("");
}

$('input').on('change', function() {
  $('div#productImageView').empty();
  $('p#productName').empty();
  $('p#productPrice').empty();

  $('p#productName').append($('input#productName').val());
  // Temporary, later will add QuickDeal functionality
  $('p#productPrice').append($('input#minimumOffer').val());
  $('p#productDescription').append($('textarea#productDescription').val());

});

//When user exits with the close button, all unsaved info gets cleared.
$('#makePostModal').on('hide.bs.modal', function (e) {
  clearInputPage();
});

//User Pressed Sell button
$('input#sellButton').click(function(evt) {
  var date = new Date().toLocaleString();
  // var imageFile = $('#productImage')[0].files[0];

  //create new post
  postsRef.push().update({
    time_added: date,
    img: 'hello', 
    title: $('input#productName').val(),
    description: $('textarea#productDescription').val(),
    minimumOffer: $('input#minimumOffer').val()
  });

  clearInputPage();

  //push the img url to aws. 


  $('#makePostModal').modal('hide');
});

//TODO ***** figure out how to save the url reference to Firebase, and actually save the image to AWS S3.
postsRef.on('value', function(snapshot) {
  var postsData = snapshot.val(); //an array of the post objects
  var postIDs = Object.keys(postsData); //an array of each postID
  addSmallPost(postIDs[postIDs.length - 1], postsData);
});


//TODO ******************************

// $('button#preview').click(function() {
  

  

// });