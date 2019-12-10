const express = require('express');
const router = express.Router();

const axios = require('axios');
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());

const url =
  'https://www.jsonstore.io/ee10c67845a9a847e4c7183400f98e5a03df544a2cfe4cdca930b7e549c0bcff';

const doesMovieExist = (req, res, next) => {
  const movieId = req.params.movieId;
  const {
    data: { result },
  } = axios.get(`${url}/movies/${movieId}`);
  result ? next() : res.redirect(`/error/movie/${movieId}`);
};

app.use('*', async function(req, res, next) {
  const queryId = Date.now();
  const { data } = await axios.post(
    `${url}/query/${queryId}`,
    {
      verb: `${req.method}`,
      ipAddress: `${req.ip}`,
      params: `${JSON.stringify(req.params)}`,
      path: `${req.originalUrl}`,
      body: `${JSON.stringify(req.body)}`,
    },
    { headers: { 'content-type': 'application/json' } }
  );
  next();
});

app.get('/error/movie/:movieId', (req, res) => {
  res.status(404).send(`No movie with this id : ${req.params.movieId}`);
});

app.get('/', function(req, res) {
  res.send('hello');
  console.log('server launched');
});

const asyncRoute = asyncFunction => async (req, res, next) => {
  try {
    await asyncFunction(req, res, next);
  } catch (e) {
    res.redirect('/error/movies');
    // OU
    // next()
  }
};

app.get('/error/movies', (req, res) => {
  res.status(404).send(`EError`);
});

app.get(
  '/movies',
  asyncRoute(async (req, res) => {
    const { data } = await axios.get(`${url}/movies`);
    res.send(data);
  })
);

app.post('/movies', async function(req, res) {
  const movieId = Date.now();
  const { data } = await axios.post(
    `${url}/movies/${movieId}`,
    req.body,
    { headers: { 'Content-type': 'application/json' } },
    { name: 'Frozen2' }
  );
  res.send(data);
});

app.get('/movies/:movieId', doesMovieExist, async function(req, res) {
  const movieId = req.params.movieId;
  const { data } = await axios.get(`${url}/movies/${movieId}`);
  res.send(data);
});

app.put('/movies/:movieId', doesMovieExist, async function(req, res) {
  const movieId = req.params.movieId;
  const { data } = await axios.put(`${url}/movies/${movieId}`, req.body, {
    headers: { 'content-type': 'application/json' },
  });

  res.send(data);
});

app.patch('/movies/:movieId', doesMovieExist, async function(req, res) {
  const movieId = req.params.movieId;
  const { data } = await axios.put(
    `${url}/movies/${movieId}/${req.body.field}`,
    `"${req.body.value}"`,
    { headers: { 'content-type': 'application/json' } }
  );
  res.send(data);
});

app.delete('/movies/:movieId', doesMovieExist, async function(req, res) {
  const movieId = req.params.movieId;
  const { data } = await axios.delete(`${url}/movies/${movieId}`, {
    headers: { 'content-type': 'application/json' },
  });
  res.send(data);
});

app.all('*', (req, res) => {
  res.send('error');
});

app.listen(5300);
