const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
// handlebars partials
hbs.registerPartials(__dirname + '/views/partials');
// setup template engine
app.set('view engine', 'hbs');

// --middleware--
// log requests
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});
// start maintainence mode
// app.use((req, res, next) => {
//   res.render('maintainence.hbs', {
//     pageTitle: 'Page Under Maintainence',
//     pageMessage: 'We will be back shortly'
//   });
//   //next();
// });

// middleware --- set public resource directory
app.use(express.static(__dirname + '/public'));

// handlebars helpers
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});
// homepage
app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  // res.send({
  //   name: 'Dharmendra',
  //   likes: [
  //     'Biking',
  //     'Cities'
  //   ]
  // });
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website',
    //currentYear: new Date().getFullYear()
  });
});
// About us page
app.get('/about', (req, res) => {
  // res.send('About Page');
  res.render('about.hbs', {
    pageTitle: 'About Page',
    //currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
