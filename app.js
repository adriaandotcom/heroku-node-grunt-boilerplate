var express = require('express');
var ejs     = require('ejs');
var contact = require('./routes/contact');
var app     = express();

app.configure(function () {
  app.set('title', 'Heroku Node Grunt boilerplate');
});

// make files in public accessable
app.use(express.static(process.cwd() + '/public'));


app.configure('development', function() {
  app.locals({
    url: {
      js: '/assets/app.js',
      css: '/assets/app.css'
    }
  });
});

// use assets compilation for production environment
app.configure('production', function() {

  // get javascript and css files
  var fileJSON = require('./manifest.json');

  app.locals({
    url: {
      js: '/assets/' + fileJSON['app.js'],
      css: '/assets/' + fileJSON['app.css']
    }
  });
});

// start listening
var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log('Listening on ' + port);
});

// render index
app.get('/', function(req, res) {
  res.render('index.ejs');
});

// render contact
app.get('/contact', contact.page);
