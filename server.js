'use strict';

console.log('Our frist server');

require('dotenv').config(); // makes it possible to go in  dotenv files and get the port

const express = require('express'); // requiring express library lin
const cors = require('cors'); // require imports cors allows share info, middleware
const app = express();
const weatherData = require('./data/weather.json');
app.use(cors());

const PORT = process.env.PORT || 3002; //define port



app.get('/weatherData', (request, response) => {
  const searchQuery = request.query.searchQuery;
  //console.log('searchQuery', searchQuery);
  console.log(searchQuery);

  let searchResult = weatherData.find(object => object.city_name === searchQuery);
  console.log(searchResult);

  const result = searchResult.data.map(dayObj => new Forecast(dayObj));
  //const result = new Forecast(searchResult); original
  response.status(200).send(result); // send it back to original request
  //console.log(result[0].data); first mod
  console.log(result);
});

class Forecast {
  constructor(weatherObject) {
    this.datetime = weatherObject.datetime;
    this.description = weatherObject.weather.description;
  }
}





app.get('*', (request, response) => {
  response.send('Does Not Compute');
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
