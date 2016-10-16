var express = require('express');
var history = require('connect-history-api-fallback');

var app = express();

app.use(history());
app.use("/", express.static('./public'));

var server = app.listen(3000, function() {
	console.log("server running on 3000.....");
});
