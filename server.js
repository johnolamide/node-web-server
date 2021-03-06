const express = require('express');
const hbs = require('hbs');
const fs  = require('fs');

const port = process.env.PORT || 3000;
var app = express();

// register the partials folder
hbs.registerPartials(__dirname + '/views/partials');
// tell express to use the hbs template
app.set('view engine', 'hbs');
// register an express middleware with app.use()
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method}: ${req.url}`;
  console.log(log);
  fs.appendFileSync('server.log', log + '\n');
  next();
});

// app.use((req, res, next) =>{
//   res.render('maintenance.hbs');
// });

// register helper funtions
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) =>{
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my Website'
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects Page',
    welcomeMessage: "This is the Projects Page."
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request.'
  });
});

app.listen(port, () =>{
  console.log(`Server is up on port: ${port}`);
});
