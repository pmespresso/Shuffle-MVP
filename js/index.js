var myFirebaseRef = new Firebase("https://shufflemvp.firebaseio.com/");

$('input#productImage').on('change', function () {
	var reader = new FileReader();

	reader.onload = function (e) {
	    console.log(reader.result + '->' + typeof reader.result)
	    var thisImage = reader.result;
	    localStorage.setItem("imgData", thisImage);
	};

	reader.readAsDataURL(this.files[0]);

    var dataImage = localStorage.getItem('imgData');
    var imgCtr = $('<img/>').prop('src', dataImage);
    $('div#productImageView').append(imgCtr);
});

$('#myModal').on('hide.bs.modal', function (e) {
	$('p#productName').val("");
	$('p#productPrice').val("");
	$('p#productDescription').val("");
	$('input#productName').val("");
	$('input#minimumOffer').val("");
	$('input#productDescription').val("");
	$('div#productImageView').val("");
});

$('input').on('change', function() {
	$('p#productName').empty();
	$('p#productPrice').empty();
	$('p#productDescription').empty();

	$('p#productName').append($('input#productName').val());
	// Temporary, later will add QuickDeal functionality
	$('p#productPrice').append($('input#minimumOffer').val());
	$('p#productDescription').append($('input#productDescription').val());

});



$('input#sellButton').click(function() {
	var date = new Date().toLocaleString()
	var postsRef = myFirebaseRef.child('posts');

	postsRef.update({
		time_added: date,
		img: $('div#productImageView').val(),
		title: $('input#productName').val(),
		description: $('input#productDescription').val(),
		minimumOffer: $('input#minimumOffer').val()
	});

	$('input#productImage').val("");
	$('input#productName').val("");
	$('input#productDescription').val("");
	$('input#minimumOffer').val("");

	$('p#productDescription').empty();
	$('p#productName').empty();
	$('p#productPrice').empty();

	$('#myModal').modal('hide');

});



//TODO ******************************

$('button#preview').click(function() {
	

	

});