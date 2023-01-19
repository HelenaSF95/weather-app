function fetchCityTemp(response) {
  let cityTempCel = Math.round(response.data.main.temp);
  let weatherDescription = response.data.weather[0].description;
  let descriptionText =
    weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);
  let wind = Math.round(response.data.wind.speed);
  let humidity = Math.round(response.data.main.humidity);
  console.log(response.data.main.humidity);

  let tempCel = document.querySelector("#current-temp");
  let currentDescription = document.querySelector("#description");
  let currentWindspeed = document.querySelector("#windspeed");
  let currentHumidity = document.querySelector("#humidity");
  console.log(currentHumidity);

  tempCel.innerHTML = `Currently ${cityTempCel}`;
  currentDescription.innerHTML = `${descriptionText}`;
  currentWindspeed.innerHTML = `${wind} km/h`;
  currentHumidity.innerHTML = `${humidity} %`;
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-text");

  let units = `metric`;
  let apiKey = `3f6be1c407b0d9d1933561808db358ba`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&&units=${units}`;

  axios.get(apiUrl).then(fetchCityTemp);

  let cityName = document.querySelector("#city");
  cityName.innerHTML = city.value;
}

function searchCurrentLocation(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);

  let units = `metric`;
  let apiKey = `3f6be1c407b0d9d1933561808db358ba`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}`;

  axios.get(apiUrl).then(fetchCityTemp);
}

function getCurrentLocation(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchButton = document.querySelector("#search-form");
searchButton.addEventListener("submit", updateCity);

let currentButton = document.querySelector("#current-btn");
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
