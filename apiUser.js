const express = require('express');
const router = express.Router();
const axios = require('axios');

const url =
  'https://www.jsonstore.io/ee10c67845a9a847e4c7183400f98e5a03df544a2cfe4cdca930b7e549c0bcff';



router.get('/', async function(req, res) {
  const { data } = await axios.get(`${url}/users/`);
  res.send(data);
});

router.post('/', async function(req, res) {
  console.log(req.body);
  const userId = Date.now();
  const { data } = await axios.post(`${url}/users/${userId}`, req.body, {
    headers: { 'content-type': 'application/json' },
  });
  res.send(data);
});

router.get('/:userId', async function(req, res) {
  const userId = req.params.userId;
  const { data } = await axios.get(`${url}/users/${userId}`);
  res.send(data);
});

router.put('/:userId', async function(req, res) {
  const userId = req.params.userId;
  const { data } = await axios.put(`${url}/users/${userId}/`, req.body, {
    headers: { 'content-type': 'application/json' },
  });
  res.send(data);
});

router.patch('/:userId', async function(req, res) {
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

router.delete('/:userId', async function(req, res) {
  const userId = req.params.userId;
  const { data } = await axios.delete(`${url}/users/${userId}`, {
    headers: { 'content-type': 'application/json' },
  });
  res.send(data);
});

module.exports = router;
