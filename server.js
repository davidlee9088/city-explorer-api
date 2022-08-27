'use strict';
// import {getMovies} from './movies';
// import {getWeather} from './weather';
// console.log('Our frist server');

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
// const weatherData = require('./data/weather.json');
const { default: axios } = require('axios');
const { response, request } = require('express');
app.use(cors());

const PORT = process.env.PORT || 3002; //define port
console.log(response, request);


app.get('/weatherData', async (request, response) => {
  console.log('requestquery ', request.query);
  const lat = request.query.lat;
  const lon = request.query.lon;
  console.log(lat, lon);

  let example = await axios.get(`http://api.weatherbit.io/v2.0/forecast/daily?Key=65835d99b37443d0bf3d27469175c3c5&days=5&city=seattle`);
  console.log(example.data);
  let exampleResult = example.data.data.map((e1) => new Cast(e1));
  response.status(200).send(exampleResult);


});


app.get('/movies', async (request, response) => {
  let cityName = request.query.cityname;
  try {

    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityName}`;
    let cityMovie = await axios.get(url);

    let selectedMovie = cityMovie.data.results.map(dailyMovie => {
      return new Movie(dailyMovie);

    });
    response.send(selectedMovie);
    // return selectedMovie;

  } catch (error) {
    console.log(error.message);
  }
  // let getMoviesArr = getMovies(cityname);
  // response.status(200).send(getMoviesArr);
});

// let getMovies = async(cityName) => {

// try {

//   let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityName}`;
//   let cityMovie = await axios.get(url);

//   let selectedMovie = cityMovie.data.results.map(dailyMovie => {
//     return new Movie(dailyMovie);

//   });
//   return selectedMovie;

// } catch (error) {
//   console.log(error.message);
// }
// };
class Movie {
  constructor(cityMovie) {
    this.title = cityMovie.original_title;
    this.description = cityMovie.overview;
    this.avgVotes = cityMovie.vote_average;
    this.totalVotes = cityMovie.vote_count;
    this.popularity = cityMovie.popularity;
    this.releasedOn = cityMovie.released_date;
    this.img = cityMovie.poster_path;
  }
}
// console.log(getMovies('seattle'));

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


