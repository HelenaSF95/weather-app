function displayDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tueday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let timeFormat = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09"];

  if (hour <= 9) {
    hour = timeFormat[hour];
  }
  if (minutes <= 9) {
    minutes = timeFormat[minutes];
  }

  let time = `${hour}:${minutes}`;

  let currentTime = document.querySelector("#date-time");
  currentTime.innerHTML = time;

  let currentDay = document.querySelector("#currentdate");
  currentDay.innerHTML = `${day}`;
}

function implementWeather(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#windspeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.temperature.humidity
  );

  let description = response.data.condition.description;
  document.querySelector("#description").innerHTML =
    description.charAt(0).toUpperCase() + description.slice(1);
  let iconElement = document.querySelector("#temp-icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );

  displayDate(response.data.time * 1000);
}

function searchCity(city) {
  let units = `metric`;
  let apiKey = `abodftdf7899f82673d6451a0b0db4af`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(implementWeather);
}

function searchCurrentLocation(position) {
  let units = `metric`;
  let apiKey = `abodftdf7899f82673d6451a0b0db4af`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&&units=${units}`;

  axios.get(apiUrl).then(implementWeather);
}

function obtainSummitedCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-text").value;

  searchCity(city);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

let searchButton = document.querySelector("#search-form");
searchButton.addEventListener("submit", obtainSummitedCity);

let currentButton = document.querySelector("#location-btn");
currentButton.addEventListener("click", getCurrentLocation);

searchCity("Brisbane");
