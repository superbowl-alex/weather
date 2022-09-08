//API for requesting and receiving data from the server
const axios = require('axios');

export async function fetchWeather(location) {
  // My API key is stored in a constant
  const API_KEY = '3ee5ec382df756ee1df79b93708fa031';

  axios.defaults.baseURL = 'https://api.openweathermap.org/data/2.5/weather';

  const response = await axios.get(
    `/?units=metric&q=${location}&appid=${API_KEY}`
  );
  return response;
}
