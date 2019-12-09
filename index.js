const express = require('express');
const app = express();

const axios = require('axios');

app.use(express.json());

const url =
  'https://www.jsonstore.io/ee10c67845a9a847e4c7183400f98e5a03df544a2cfe4cdca930b7e549c0bcff';

app.get('/', function(req, res) {
  res.send('hello');
});

app.post('/users', async function(req, res) {
  console.log(req.body);
  const userId = Date.now();
  const { data } = await axios.post(`${url}/users/${userId}`, req.body, {
    headers: { 'content-type': 'application/json' },
  });
  res.send(data);
});

app.get('/users', async function(req, res) {
  const { data } = await axios.get(`${url}/users/`);
  res.send(data);
});

app.get('/users/:userId', async function(req, res) {
  const userId = req.params.userId;
  const { data } = await axios.get(`${url}/users/${userId}`);
  res.send(data);
});

app.put('/users/:userId', async function(req, res) {
  const userId = req.params.userId;
  const { data } = await axios.put(`${url}/users/${userId}/`, req.body, {
    headers: { 'content-type': 'application/json' },
  });
  res.send(data);
});

app.patch('/users/:userId', async function(req, res) {
  const userId = req.params.userId;
  const { data } = await axios.put(
    `${url}/users/${userId}/${req.body.field}`,
    `"${req.body.value}"`,
    {
      headers: { 'content-type': 'application/json' },
    }
  );
  res.send(data);
});

app.delete('/users/:userId', async function(req, res) {
  const userId = req.params.userId;
  const { data } = await axios.delete(`${url}/users/${userId}`, {
    headers: { 'content-type': 'application/json' },
  });
  res.send(data);
});

app.listen(5200);
