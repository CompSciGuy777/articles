const fetch = require('node-fetch');
const { promisify } = require('util');

var redis = require('redis');
client = redis.createClient();

const setAsync = promisify(client.set).bind(client);

const baseUrl = 'https://newsapi.org';

const options = {
  method: 'GET', // or 'PUT'// data can be `string` or {object}!
  headers: {
    'Content-Type': 'application/json',
    'X-Api-Key': 'b7ae9dc4fc9e4f288873e2dab8b78562'
  }
};

const getAllheadlines = async () => {
  const url = `${baseUrl}/v2/top-headlines?country=us`;

  try {
    const response = await fetch(url, options);
    const json = await response.json();
    console.log('Success:', JSON.stringify(json));
  } catch (error) {
    console.error('Error:', error);
  }
  console.log();
};

const getAllArticles = async query => {
  const url = `${baseUrl}/v2/everything?q=${query}`;

  try {
    const response = await fetch(url, options);
    const json = await response.json();
    const sucess = await setAsync('articles', JSON.stringify(json));
    console.log('redis set', sucess);
  } catch (error) {
    console.error('Error:', error);
  }
  console.log('Done');
};

getAllArticles('vaccines');
