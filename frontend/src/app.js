const express = require('express');
const path = require('path');
const request = require('request');

const app = express();

app.disable('view cache');

app.get('/api/someInfo', (req, res, next) => {
  console.log('Requesting info from backend!');
  request('http://localhost:3001/backend', (err, response, body) => {
    console.log('Received some response!');
    if (err) {
      console.log(err);
      res.send({ content: "Something went wrong!" });
    }
    res.send(body);
  });
});

app.get('*', (req, res) => { res.sendFile(path.resolve(__dirname, '../public/index.html')); });

let port = 3000;

app.listen(port, () => {
  console.log(`Frontend server listening on port ${port}!`);
});
