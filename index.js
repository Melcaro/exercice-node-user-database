const express = require('express');
const app = express();

const users = require('./data/users.json');
const engines = require('consolidate');

app.engine('hbs', engines.handlebars);
app.set('view engine', 'hbs');
app.set('views', './views');

app.get('/', function(req, res) {
  res.render('index.hbs', { users });
});

app.listen(5200);
