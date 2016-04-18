var myFirebaseRef = new Firebase("https://shufflemvp.firebaseio.com/");
var postsRef = myFirebaseRef.child('posts');

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
  $('p#productName').val("");
  $('p#productPrice').val("");
  $('p#productDescription').val("");
  $('input#productName').val("");
  $('input#minimumOffer').val("");
  $('input#productDescription').val("");
  $('div#productImageView').empty();
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
$('#myModal').on('hide.bs.modal', function (e) {
  clearInputPage();
});

$('input#sellButton').click(function() {
  var date = new Date().toLocaleString()

  postsRef.push().update({
    time_added: date,
    img: $('div#productImageView').val(),
    title: $('input#productName').val(),
    description: $('input#productDescription').val(),
    minimumOffer: $('input#minimumOffer').val()
  });

  clearInputPage();

  $('#myModal').modal('hide');
});


//The post should now show up on the feed and in the database.
postsRef.on('value', function(snapshot) {
  var postsData = snapshot.val();
  var postID = Object.keys(postsData);

  



  // console.log(postID[postID.length - 1]);

});


// postsRef.on('value', function(snapshot) {
//  var postsData = snapshot.val();
//  $('#posts').append('<div class="col-md-4 market-item market-item-small">' + '<a href="">' + '<img class="img-responsive" src="" alt=""/>' + '</a>' + 
//  '<h3>' + '<a href="" id="postName">' + postsData.title + '<a/>' + '</h3>' + 
//  '<p id="description">' + postsData.description + '</p>' + '</div>');

// });



//TODO ******************************

$('button#preview').click(function() {
  

  

});