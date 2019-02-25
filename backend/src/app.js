const express = require('express');
const path = require('path');

const app = express();

app.disable('view cache');

app.get('/backend', (req, res, next) => {
    console.log('Sending back some info!');
    res.send({ content: 'someInfo' });
});

let port = 3001;

app.listen(port, () => {
    console.log(`Backend listening on port ${port}!`);
});
