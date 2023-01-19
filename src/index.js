function implementWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#pseudo-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#windspeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
}

function searchCity(city) {
  let units = `metric`;
  let apiKey = `3f6be1c407b0d9d1933561808db358ba`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=${units}`;

  axios.get(apiUrl).then(implementWeather);
}

function searchCurrentLocation(position) {
  let units = `metric`;
  let apiKey = `3f6be1c407b0d9d1933561808db358ba`;
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

function formatDate(date) {
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = weekdays[date.getDay()];
  let currentHour = date.getHours();
  let currentMin = date.getMinutes();
  let timeFormat = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09"];

  if (currentHour <= 9) {
    currentHour = timeFormat[currentHour];
  }
  if (currentMin <= 9) {
    currentMin = timeFormat[currentMin];
  }

  let sentence = `${currentDay} ${currentHour}:${currentMin}`;
  return sentence;
}

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${formatDate(new Date())} ⛈`;

function showCelcius(event) {
  event.preventDefault();
  let temp = document.querySelector("#current-temp");
  temp.innerHTML = `Currently 19`;
}

let celciusTemp = document.querySelector("#temp-unit-celcius");
celciusTemp.addEventListener("click", showCelcius);

searchCity("London");
