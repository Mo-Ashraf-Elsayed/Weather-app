var inputSearch = document.getElementById("locationSearch");
var btnSubmitSearch = document.getElementById("submitSearch");
var latitude;
var longitude;
var latAndLonLocation;
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
    latAndLonLocation = `${latitude},${longitude}`
    console.log(latAndLonLocation)
    // if(navigator.geolocation.getCurrentPosition(function (p) {})==undefined){ => بترجع ايه
    //     console.log("-------------")
    // }
    getWeather();
  });
} else {
  console.log("The browser isn't support navigator.geolocation");
}
async function getWeather() {
  // console.log(data)
  var weather = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=bd41354009ff4be2ac5121909240612&q=${latAndLonLocation}&days=3`
  );
  var finalWeather = await weather.json();
  console.log(finalWeather)
  cityFromWeatherRequest = finalWeather.location.name.toLowerCase();
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
inputSearch.addEventListener("input", function (e) {
  latAndLonLocation = this.value;
  getWeather();
  if (e.inputType === "deleteContentBackward") {
    getWeather();
  }
});
