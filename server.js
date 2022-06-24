
'use strict';

console.log('first server');

require('dotenv').config();
//const weatherData = require('./weather.json');
const express = require('express');
const app = express();
// const axios = require('axios');
const getWeather = require('./weather');
const getMovies = require('./movies');
const cors = require('cors');
// const { response } = require('express');


app.use(cors());


const PORT = process.env.PORT || 3002;

app.get('/', (req, res) => {
  return res.send('Welcome to our server');
});

app.get('/weather', async(request, response) => {
  console.log('hitting weather route');
  let searchQueryCity = request.query.searchQueryCity;
  //let cityWeather = weatherData.find((e) => e.city_name.toLowerCase() === searchQueryCity.toLowerCase());
  let weatherData = await getWeather(searchQueryCity);
  response.send(weatherData);

});
app.get('/movies', async(request, response) => {
  console.log('hitting movie route');
  let searchQueryCity = request.query.searchQueryCity;
  //let cityWeather = weatherData.find((e) => e.city_name.toLowerCase() === searchQueryCity.toLowerCase());
  let movieData = await getMovies(searchQueryCity);
  response.send(movieData);

});


app.get('*', (req, res) => {
  console.log('hitting all route');
  res.send('Page not found here : error');
});


app.use((error, request, response,) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
