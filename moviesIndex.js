const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const url =
  'https://www.jsonstore.io/ee10c67845a9a847e4c7183400f98e5a03df544a2cfe4cdca930b7e549c0bcff';

app.get('/', function(req, res) {
  res.send('hello');
  console.log('server launched');
});

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

app.get('/movies', async function(req, res) {
  const { data } = await axios.get(`${url}/movies`);
  res.send(data);
});

app.get('/movies/:movieId', async function(req, res) {
  const movieId = req.params.movieId;
  const { data } = await axios.get(`${url}/movies/${movieId}`);
  res.send(data);
});

app.put('/movies/:movieId', async function(req, res) {
  const movieId = req.params.movieId;
  const { data } = await axios.put(`${url}/movies/${movieId}`, req.body, {
    headers: { 'content-type': 'application/json' },
  });

  res.send(data);
});

app.patch('/movies/:movieId', async function(req, res) {
  const movieId = req.params.movieId;
  const { data } = await axios.put(
    `${url}/movies/${movieId}/${req.body.field}`,
    `"${req.body.value}"`,
    { headers: { 'content-type': 'application/json' } }
  );
  res.send(data);
});

app.delete('movies/:movieId', async function(req, res) {
  const movieId = req.params.movieId;
  const { data } = await axios.delete(`${url}/movies/${movieId}`, {
    headers: { 'content-type': 'application/json' },
  });
  res.send(data);
});

app.listen(5300);
