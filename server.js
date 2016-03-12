var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mailgun = require('mailgun-js')({apiKey: 'key-5cf681c09c48516a8e0b8b00a580969c', domain: 'sandbox08ea930e43c140d699bd4406076fd445.mailgun.org'});
var filepath = path.join(__dirname, 'IMG_1534.JPG');
var jade = require('jade');
var app = express();
var CONFIG = require('./config.json');
var user = CONFIG;

app.set('view engine', 'jade');
app.set('views', path.resolve(__dirname, 'views'));

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



app.get('/', function (req, res) {
  res.render('index');
});

app.get('/admin', function (req, res) {
   var user = {
    name:     CONFIG.name,
    phone:    CONFIG.phone,
    carrier:  CONFIG.carrier
  };
  res.render('admin', user);
});

app.post('/', function (req, res) {
  user = {
    name: req.body.name,
    phone: req.body.phone,
    carrier: req.body.carrier
 };
  
  res.render('admin', user);
});

app.post('/admin', function (req, res) {
  res.render('index');
});

app.post('/message', function (req, res) {
  var data = {
    from: 'Excited User <me@samples.mailgun.org>',
    // to: '18084998616@messaging.sprintpcs.com',
    to: user.phone + '@mms.att.net', //att
    // to: '8087814110@vzwpix.com',
    // to: '18083873284@tmomail.net',
    // to: '8087814110@vtext.com',
    subject: 'Hello',
    text: 'Someone is at your door',
    attachment: filepath

  };
  mailgun.messages().send(data, function (error, body) {
    if(error) {
      console.log(error);
    } else {
      console.log(body);
    }
  });
});



var server = app.listen(3000, function() {
  console.log('Listening to port', server.address().port);
});