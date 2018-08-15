'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// REVIEWED: POST route needs to parse the body passed in with the request.
// POST middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/', (request, response) => {
  response.send('We Are Live');
});

app.post('/articles', (request, response) => {
  // REVIEWED: This route will receive a new article from the form page, new.html, and log that form data to the console. We will wire this up soon to actually write a record to our persistence layer!
  console.log(request.body);
  response.status(201).json(request.body);
});

app.listen(PORT, () => console.log('Are We Live'));

// app.use('*', )
app.use((reqeust, response) => {
  response.status(404).send('404 ERROR: CODER HAS NOT HAD ENOUGH COFFE');
})

app.get('/new-article', (reqeust, response) =>{
  response.sendFile('new.html', {root: '.public'});
});