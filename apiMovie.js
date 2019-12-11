const express = require('express');
const router = express.Router();
const axios = require('axios');

const url =
  'https://www.jsonstore.io/ee10c67845a9a847e4c7183400f98e5a03df544a2cfe4cdca930b7e549c0bcff';

const doesMovieExist = async (req, res, next) => {
  const movieId = req.params.movieId;
  const {
    data: { result },
  } = await axios.get(`${url}/movies/${movieId}`);
  result ? next() : res.redirect(`/error/movie/${movieId}`);
};

router.use('*', function(req, res, next) {
  const queryId = Date.now();
  const { data } = axios.post(
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

router.get('/error/movie/:movieId', (req, res) => {
  res.status(404).send(`No movie with this id : ${req.params.movieId}`);
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

router.get('/error/movies', (req, res) => {
  res.status(404).send(`EError`);
});

router.get(
  '/',
  asyncRoute(async (req, res) => {
    const { data } = await axios.get(`${url}/movies`);
    res.send(data);
  })
);

router.post('/', async function(req, res) {
  const movieId = Date.now();
  const { data } = await axios.post(`${url}/movies/${movieId}`, req.body, {
    headers: { 'Content-type': 'application/json' },
  });
  res.send(data);
});

router.get('/:movieId', doesMovieExist, async function(req, res) {
  const movieId = req.params.movieId;
  const { data } = await axios.get(`${url}/movies/${movieId}`);
  res.send(data);
});

router.put('/:movieId', doesMovieExist, async function(req, res) {
  const movieId = req.params.movieId;
  const { data } = await axios.put(`${url}/movies/${movieId}`, req.body, {
    headers: { 'content-type': 'application/json' },
  });

  res.send(data);
});

router.patch('/:movieId', doesMovieExist, async function(req, res) {
  const movieId = req.params.movieId;
  const { data } = await axios.put(
    `${url}/movies/${movieId}/${req.body.field}`,
    `"${req.body.value}"`,
    { headers: { 'content-type': 'application/json' } }
  );
  res.send(data);
});

router.delete('/:movieId', doesMovieExist, async function(req, res) {
  const movieId = req.params.movieId;
  const { data } = await axios.delete(`${url}/movies/${movieId}`, {
    headers: { 'content-type': 'application/json' },
  });
  res.send(data);
});

router.all('*', (req, res) => {
  res.send('error');
});

module.exports = router;
