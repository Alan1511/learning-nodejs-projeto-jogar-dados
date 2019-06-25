var express =  require('express');

var consign = require('consign');

var app = express();

app.set('view engine' , 'ejs');
app.set('views', './app/views');

app.use(express.static('./app/public'));

consign()
	.include('./app/routes')
	.include('./app/controllers')
	.include('./app/models')
	.then('config/dbConnection.js')
	.into(app);

module.exports = app;
