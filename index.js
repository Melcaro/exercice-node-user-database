const express = require('express');
const app = express();
// const userRouter = require('./apiUser');
// const movieRouter = require('./apiMovie');
// const axios = require('axios');

// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

const Twitter = require('twitter');
const auth = require('./auth');

const client = new Twitter(auth);

const params = { screen_name: 'mel_caro78' };

client.get('/users/show', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});

const stream = client.stream('statuses/filter', { track: 'mel_caro78' });

stream.on('data', function(event) {
  client.post('statuses/filter', { status: 'Thanks!' + event.text });
  console.log(event);
});

app.use(express.json());

app.use('/users', userRouter);

app.use('/movies', movieRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(5200);
