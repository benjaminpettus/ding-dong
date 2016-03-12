var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
// var jade = require('jade');


var app = express();

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



app.get('/', function (req, res) {
  res.send('Home Page');
});

app.get('/admin', function (req, res) {
  res.send('Admin Page');
});

app.post('/', function (req, res) {
  res.render('admin');
});

app.post('/admin', function (req, res) {
  res.render('index');
});




var server = app.listen(3000, function() {
  console.log('Listening to port', server.address().port);
});