// Import required packages, entities and modules
import Notiflix from 'notiflix';
import getRefs from './get-refs';
import { fetchWeather } from './weather-service';
let moment = require('moment');

const refs = getRefs();

// Add eventListener to the form
refs.form.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();
  let location = e.target.elements.searchQuery.value.trim();
  if (!location) {
    return;
  } else {
    refs.loading.classList.toggle('is-hidden');
    refs.start.classList.toggle('is-hidden');
    fetchWeather(location)
      .then(({ data }) => {
        refs.loading.classList.toggle('is-hidden');
        getWeather(data);
      })
      .catch(error => {
        console.log(error);
        Notiflix.Notify.failure(
          'Sorry, there are no locality matching your search query. Please try again.'
        );
      });
  }
}

function getWeather(data) {
  console.log(data);
  const location = data.name;
  const country = data.sys.country;
  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const weatherStatus = data.weather[0].main;
  const weatherIcon = data.weather[0].icon;
  const pressure = data.main.pressure;
  const humidity = data.main.humidity;
  const wind = data.wind.speed;
  const rainfall = data.rain ? data.rain['1h'] : 0;
  const sunrise = moment
    .unix(data.sys.sunrise)
    .utcOffset(data.timezone / 60)
    .format('HH : mm');
  const sunset = moment
    .unix(data.sys.sunset)
    .utc()
    .utcOffset(data.timezone / 60)
    .format('HH : mm');
  const dayLength = diffTime(data.sys.sunrise, data.sys.sunset);
  const template = `<div class="weather__header">
          <div class="weather__main">
            <div class="weather__city">${location}, ${country}</div>
            <div class="weather__status">${weatherStatus}</div>
          </div>
          <div class="weather__icon">
            <img
              src="https://openweathermap.org/img/w/${weatherIcon}.png"
              alt="${weatherStatus}"
            />
          </div>
        </div>
        <div class="weather__temp">
          ${temp}
        </div>
        <ul class="weather__features">
          <li class="weather__item feels">
            <span class="weather__feature feels-like">Feels like: </span
            ><span class="weather__value">${feelsLike}</span>
          </li>
          <li class="weather__item">
            <span class="weather__feature pressure">Pressure: </span
            ><span class="weather__value">${pressure} hPa</span>
          </li>
          <li class="weather__item">
            <span class="weather__feature humidity">Humidity: </span
            ><span class="weather__value">${humidity} %</span>
          </li>
          <li class="weather__item">
            <span class="weather__feature wind">Wind: </span
            ><span class="weather__value">${wind} m/s</span>
          </li>
          <li class="weather__item">
            <span class="weather__feature rainfall">Rainfall: </span
            ><span class="weather__value">${rainfall} mm/hour</span>
          </li>
          <li class="weather__item">
            <span class="weather__feature sunrise">Sunrise: </span
            ><span class="weather__value">${sunrise}</span>
          </li>
          <li class="weather__item">
            <span class="weather__feature sunset">Sunset: </span
            ><span class="weather__value">${sunset}</span>
          </li>
          <li class="weather__item">
            <span class="weather__feature daylength">Day length: </span
            ><span class="weather__value">${dayLength}</span>
          </li>
        </ul>
      </div>`;
  refs.weatherBlock.innerHTML = template;
}

function diffTime(start, end) {
  const diff = end - start;
  const minute = 60;
  const hour = minute * 60;
  const hours = Math.floor(diff / hour);
  const minutes = Math.floor((diff % hour) / minute);
  return `${hours}h  ${minutes}m`;
}
