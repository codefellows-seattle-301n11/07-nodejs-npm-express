'use strict';

const express = require('express'); //Instantiate the ExpressJS framework
const app = express(); //Instantiate the ExpressJS framework
const PORT = process.env.PORT || 3000;

// REVIEW: POST route needs to parse the body passed in with the request.
// POST middleware
app.use(express.urlencoded({ extended: true }));
//the PostMan tool sends results in JSON, so this is useful for that. 
app.use(express.json());

// COMMENT: OUR FILES ARE IN PUBLIC, TO ISOLATE THE FILES THAT WE ARE WILLING TO EXPOSE TO THE INTERNET, TO ONE PLACE. ANYTHING THAT ISN'T EXPECTED TO BE ACCESSIBLE SHOULD NOT BE IN THIS FOLDER. THIS WAS DEMO'D IN THE EXPRESS DEMO FOR LAB 7.
app.use(express.static('./public'));

//new route to get the form input at new.html. Callback is the response.sendFile.
//note the syntax of passing in an object literal with the root value.
app.get('/create-article', (request, response) => {
  response.sendFile('new.html', {root: './public'});
});

app.post('/articles', (request, response) => {
  // REVIEW: This route will receive a new article from the form page, new.html, and log that form data to the console. We will wire this up soon to actually write a record to our persistence layer!
  console.log(request.body);
  response.status(201).json(request.body);
});

//The 404 Route (ALWAYS Keep this as the last route)
//added the original 404 route from: https://stackoverflow.com/questions/6528876/how-to-redirect-404-errors-to-a-page-in-expressjs
//For the 404, app.use caches all bad routes, not just all bad get routes... so we do app.use rather than app.get...
app.use('*', function (request, response) {
  //response.send('Sorry we could not find what you were looking for... 404 error', 404);
  response.status(404).send('404 error... could not find what you were looking for...');
});

//if we don't define a listener the server will fire and close immediately. Listener is usually at the bottom of the file.
app.listen(PORT, function() {
  console.log(`listening on port: ${PORT}`); //template literal syntax.
});