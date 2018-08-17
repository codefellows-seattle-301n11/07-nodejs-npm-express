'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// REVIEWED: POST route needs to parse the body passed in with the request.
// POST middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.get('/new-article', (request, response) => {
  response.sendFile('new.html', {root: './public'});
});

app.post('/articles', (request, response) => {
  // REVIEWED: This route will receive a new article from the form page, new.html, and log that form data to the console. We will wire this up soon to actually write a record to our persistence layer!
  console.log(request.body);
  response.status(201).json(request.body);
});

app.use((request, response) => {
  response.status(404).send('404 error :(');
});

app.listen(PORT, () => console.log('Are We Live'));