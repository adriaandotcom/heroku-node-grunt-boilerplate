exports.contact = function(req, res) {

  // add some variable to the layout
  res.render('contact.ejs', {
    layout: false,
    locals: { title: 'Contact' }
  });

  console.log('This message will be send to the console');

});
