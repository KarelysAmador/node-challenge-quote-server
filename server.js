const { response } = require("express");
const lodash = require('lodash');

const cors = require('cors');
app.use(cors())


// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
const express = require("express");
const app = express();

//load the quotes JSON
const quotes = require("./quotes.json");

// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)

app.get("/", function (request, response) {
  response.send("Karelys's Quote Server!  Ask me for /quotes/random, or /quotes");
});

//START OF YOUR CODE..

app.get('/quotes', function(request, response) {
  response.send(quotes)
});

app.get('/quotes/random', function(request, response) {
  const randomQuotes = pickFromArray(quotes);
  response.send(randomQuotes)
});

app.get('/quotes/search', (request, response) => {
  quotes.forEach((element) => {

  const termQuery = request.query.term.toLowerCase();
  const search = quotes.filter((element) => element.quote.toLowerCase().includes(termQuery));

  response.send(search);
})
})

/*como lo hizo el profe
app.get ("/quotes/Search", function (request, response)
{
  let searchQuery =request.query.term;
  console.log(searchQuery);

let result =   []
  For (const obj of quotes)  {
    if (obj.quote.toLowerCase().includes(searchQuery.toLowerCase())){
      result.push(obj);
    }
  }
  response.send (result)
})
 */
/*pickFromArray obtienes un valor al azar del array
todo lo que sea devolver datos es .get*/

//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//

function pickFromArray(arr) {
  const random =Math.random() * arr.length;
  const randomIndex = Math.floor(random);
  return arr[randomIndex];
}

//Start our server so that it listens for HTTP requests!
let port = 5000;

app.listen( port, function () {
  console.log("Your app is listening on port " + port);
});
