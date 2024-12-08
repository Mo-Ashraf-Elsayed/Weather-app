var inputSearch = document.getElementById("locationSearch");
var btnSubmitSearch = document.getElementById("submitSearch");
var cityName = "cairo1";
var countryFromWeatherRequest;
var cityFromWeatherRequest;
var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
var latitude;
var longitude;

//current day elements
var eleCurrDayName = document.getElementById("cDayName");
var eleCurrDayDate = document.getElementById("cDaydate");
var eleCityName = document.getElementById("cityName");
var eleCurrDayTemp = document.getElementById("cDayTemp");
var eleCurrDayImgCondition = document.getElementById("cDayConditionImg");
var eleCurrDayCondition = document.getElementById("cCondition");

//next day elements
var eleNextDayName = document.getElementById("nDayName");
var eleNextDayImgCondidion = document.getElementById("nDayCondidionImg");
var eleNextDayMaxTemp = document.getElementById("nDayMaxTemp");
var eleNextDayMinTemp = document.getElementById("nDayMinTemp");
var eleNextDayCondition = document.getElementById("nCondition");

//after next day elements
var eleAfterNextDayName = document.getElementById("aNextDayName");
var eleAfterNextDayImgCondidion = document.getElementById(
  "aNextDayCondidionImg"
);
var eleAfterNextDayMaxTemp = document.getElementById("aNextDayMaxTemp");
var eleAfterNextDayMinTemp = document.getElementById("aNextDayMinTemp");
var eleAfterNextDayCondition = document.getElementById("aNextCondition");

// to know the location of the user
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (p) {
    latitude = p.coords.latitude;
    longitude = p.coords.longitude;
    // if(navigator.geolocation.getCurrentPosition(function (p) {})==undefined){ => بترجع ايه
    //     console.log("-------------")
    // }
    // getWeather();
    getCountry();
  });
} else {
  console.log("The browser isn't support navigator.geolocation");
}
async function getCountry() {
  await getWeather();
  var response = await fetch(
    // api from opencagedata to know the country from latitude and longitude
    `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=303a5e5cf5b64c588fc7788c675222f1&language=en`
  );
  var data = await response.json();
  console.log(data);
  // Check if data is valid
  if (data.results.length > 0) {
    var country1 = data.results[0].components.country;
    if (country1 == countryFromWeatherRequest) {
      cityName = cityFromWeatherRequest;
      console.log(cityName, "from country req");
      await getWeather();
    }
    console.log(
      `The country at latitude ${latitude} and longitude ${longitude} is ${country1}.`
    );
  } else {
    console.log("No country found for these coordinates.");
  }
}
async function getWeather() {
  // console.log(data)
  var weather = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=bd41354009ff4be2ac5121909240612&q=${cityName}&days=3`
  );
  var finalWeather = await weather.json();
  countryFromWeatherRequest = finalWeather.location.country;
  cityFromWeatherRequest = finalWeather.location.name.toLowerCase();
  console.log(cityName, "from weather req");
  console.log(cityFromWeatherRequest);
  console.log(countryFromWeatherRequest);

  //current day
  eleCurrDayName.innerHTML = days[new Date().getDay()];
  eleCurrDayDate.innerHTML = `${new Date().getDate()} ${
    months[new Date().getMonth()]
  }`;
  eleCityName.innerHTML = finalWeather.location.name;
  eleCurrDayTemp.innerHTML = finalWeather.current.temp_c + `<sup>o</sup>C`;
  eleCurrDayImgCondition.setAttribute(
    "src",
    "https:" + finalWeather.current.condition.icon
  );
  eleCurrDayCondition.innerHTML = finalWeather.current.condition.text;
  //next day
  var nDayName = new Date().getDay() + 1;
  nDayName === 7 ? (nDayName = 0) : (nDayName = nDayName);
  eleNextDayName.innerHTML = days[nDayName];
  eleNextDayImgCondidion.setAttribute(
    "src",
    "https:" + finalWeather.forecast.forecastday[1].day.condition.icon
  );
  eleNextDayMaxTemp.innerHTML =
    finalWeather.forecast.forecastday[1].day.maxtemp_c + `<sup>o</sup>C`;
  eleNextDayMinTemp.innerHTML =
    finalWeather.forecast.forecastday[1].day.mintemp_c + `<sup>o</sup>`;
  eleNextDayCondition.innerHTML =
    finalWeather.forecast.forecastday[1].day.condition.text;

  //after next day elements
  var aNextDayName = nDayName + 1;
  aNextDayName === 7 ? (aNextDayName = 0) : (aNextDayName = aNextDayName);
  eleAfterNextDayName.innerHTML = days[aNextDayName];
  eleAfterNextDayImgCondidion.setAttribute(
    "src",
    "https:" + finalWeather.forecast.forecastday[2].day.condition.icon
  );
  eleAfterNextDayMaxTemp.innerHTML =
    finalWeather.forecast.forecastday[2].day.maxtemp_c + `<sup>o</sup>C`;
  eleAfterNextDayMinTemp.innerHTML =
    finalWeather.forecast.forecastday[2].day.mintemp_c + `<sup>o</sup>`;
  eleAfterNextDayCondition.innerHTML =
    finalWeather.forecast.forecastday[2].day.condition.text;
}
// to search for a city to know its weather
inputSearch.addEventListener("input", search);
btnSubmitSearch.addEventListener('click',search)
function search(e) {
  cityName = inputSearch.value;
  getWeather();
  if (e.inputType === "deleteContentBackward") {
    getWeather();
  }
}