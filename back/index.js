const express = require('express');
const app = express();
const port = 3000;
const connection = require('./config');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send('Welcome to jaMusic Server');
});

app.get('/profiles', (request, response) => {
  connection.query('SELECT * from profile', (err, results) => {
    if (err) {
      response.status(500).send('Error retrieving profiles');
    } else {
      response.json(results);
    }
  });
})

app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }

  console.log(`Server is listening on ${port}`);
});
