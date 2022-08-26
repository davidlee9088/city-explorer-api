'use strict';

console.log('Our frist server');

require('dotenv').config(); 
const express = require('express'); 
const cors = require('cors'); 
const app = express();
const weatherData = require('./data/weather.json');
app.use(cors());

const PORT = process.env.PORT || 3002; //define port



app.get('/weatherData', (request, response) => {
  const searchQuery = request.query.searchQuery;

  console.log(searchQuery);

  let searchResult = weatherData.find(object => object.city_name === searchQuery);
  console.log(searchResult);

  const result = searchResult.data.map(dayObj => new Cast(dayObj));
 
  response.status(200).send(result); 
 
  console.log(result);
});

class Cast {
  constructor(weatherObject) {
    this.datetime = weatherObject.datetime;
    this.description = weatherObject.weather.description;
  }
}





app.get('*', (request, response) => {
  response.send('Does Not Compute');
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
