const express = require('express');
const { promisify } = require('util');
const redis = require('redis');
client = redis.createClient();

const getAsync = promisify(client.get).bind(client);

const app = express();
const port = 3001;

app.get('/article', async (req, res) => {
  const articles = await getAsync('articles');
  console.log(JSON.parse(articles));
  return res.json(articles);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
