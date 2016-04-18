$('input#productImage').on('change', function () {
	console.log(this);

	var reader = new FileReader();

	reader.onload = function (e) {
	    console.log(reader.result + '->' + typeof reader.result)
	    var thisImage = reader.result;
	    localStorage.setItem("imgData", thisImage);
	};

	reader.readAsDataURL(this.files[0]);

    var dataImage = localStorage.getItem('imgData');
    console.log(dataImage);
    var imgCtr = $('<img/>').prop('src', dataImage);
    $('div#productImageView').append(imgCtr);
});

$('input').on('change', function() {
	$('p#productName').empty();
	$('p#productPrice').empty();

	$('p#productName').append($('input#productName').val());
	$('p#productPrice').append($('input#minimumOffer').val());
});

$('button#sellButton').click(function() {
	
	

});