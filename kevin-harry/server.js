'use strict';

const express = require('express'); //Instantiate the ExpressJS framework
const app = express(); //Instantiate the ExpressJS framework
const PORT = process.env.PORT || 3000;

// REVIEW: POST route needs to parse the body passed in with the request.
// POST middleware

app.use(express.urlencoded({ extended: true }));

// COMMENT: OUR FILES ARE IN PUBLIC, TO ISOLATE THE FILES THAT WE ARE WILLING TO EXPOSE TO THE INTERNET, TO ONE PLACE. ANYTHING THAT ISN'T EXPECTED TO BE ACCESSIBLE SHOULD NOT BE IN THIS FOLDER. THIS WAS DEMO'D IN THE EXPRESS DEMO FOR LAB 7.
app.use(express.static('./public'));
app.use(express.json());


app.listen(PORT, function() {
  console.log(`listening on port: ${PORT}`); //template literal syntax.
});

//new route to get the form input at new.html. Callback is the response.sendFile.
app.get('/create-article', (request, response) => {
  response.sendFile('new.html', {root: './public'});
});

app.post('/articles', (request, response) => {
  // REVIEW: This route will receive a new article from the form page, new.html, and log that form data to the console. We will wire this up soon to actually write a record to our persistence layer!
  console.log(request.body);
  response.status(201).json(request.body);
});

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function (req, res) {
  res.send('what???', 404);
});
//added this 404 route from: https://stackoverflow.com/questions/6528876/how-to-redirect-404-errors-to-a-page-in-expressjs