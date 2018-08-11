'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// REVIEWED: POST route needs to parse the body passed in with the request.
// POSTED middleware
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));

// COMMENTED TO EXPLAIN WHY USE EXPRESS AND PUBLIC: Files are placed into a public directory to assign them strictly for public access, this protects other elements such as electronic property from being viewed. Express JS serves the local files by compiling and sorting multiple features to make the code more robust.
app.get('/new-article', (request, response) => {
  response.sendFile('new.html', {root: './public'});
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

app.post('/articles', (request, response) => {
  // REVIEWED: This route will receive a new article from the form page, new.html, and log that form data to the console. We will wire this up soon to actually write a record to our persistence layer!
  console.log(request.body);
  response.status(201).json(request.body);
});

app.use(function (req, res) {
  res.status(404).send(`404 Error: Sorry can't find that!`);
});
