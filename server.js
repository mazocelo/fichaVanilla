const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static(__dirname + '/dist/index.html'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + '/index.html')
})

// listen for requests :)
const listener = app.listen(port, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
