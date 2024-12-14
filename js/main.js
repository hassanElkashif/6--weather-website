var searchInput = document.querySelector(".search-in");
var cityName = document.querySelector(".city-name");
var currentDay = document.querySelector(".current-day");
var degreeNumber = document.querySelector(".degree-number");

var thisDayName = document.querySelector('.day1-name');
var dayAfterName = document.querySelector('.day2-name');
var after2DaysName = document.querySelector('.day3-name');

var minDay1 = document.querySelector('.minDay1');
var minDay2 = document.querySelector('.minDay2');
var minDay3 = document.querySelector('.minDay3');

var maxDay1 = document.querySelector('.maxDay1');
var maxDay2 = document.querySelector('.maxDay2');
var maxDay3 = document.querySelector('.maxDay3');

var stateDay1 = document.querySelector('.stateDay1');
var stateDay2 = document.querySelector('.stateDay2');
var stateDay3 = document.querySelector('.stateDay3');

var state1 = document.querySelectorAll('.state1');
var state2 = document.querySelector('.state2');
var state3 = document.querySelector('.state3');



function autoIp() {
  var newmyHttp = new XMLHttpRequest();
  newmyHttp.open(
    "GET",
    "https://api.weatherapi.com/v1/forecast.json?key=004b437fca1c4642b8b105322241312&q=auto:ip&days=3"
  );
  newmyHttp.send();

  newmyHttp.addEventListener("load", function () {
    if (newmyHttp.status === 200) {
      var short = JSON.parse(newmyHttp.response);

      cityName.innerHTML = `${short.location.name}, ${short.location.country}`;
      degreeNumber.innerHTML = short.current.temp_c;

      var today = short.forecast.forecastday[0].date;
      var dayAfter = short.forecast.forecastday[1].date;
      var after2Days = short.forecast.forecastday[2].date;

      currentDay.innerHTML = getDayName(today);
      thisDayName.innerHTML = getDayName(today);
      dayAfterName.innerHTML = getDayName(dayAfter);
      after2DaysName.innerHTML = getDayName(after2Days);

      minDay1.innerHTML = short.forecast.forecastday[0].day.mintemp_c;
      maxDay1.innerHTML = short.forecast.forecastday[0].day.maxtemp_c;

      minDay2.innerHTML = short.forecast.forecastday[1].day.mintemp_c;
      maxDay2.innerHTML = short.forecast.forecastday[1].day.maxtemp_c;

      minDay3.innerHTML = short.forecast.forecastday[2].day.mintemp_c;
      maxDay3.innerHTML = short.forecast.forecastday[2].day.maxtemp_c;

      stateDay1.innerHTML = short.forecast.forecastday[0].day.condition.text;
      stateDay2.innerHTML = short.forecast.forecastday[1].day.condition.text;
      stateDay3.innerHTML = short.forecast.forecastday[2].day.condition.text;

      for (let i = 0; i < state1.length; i++) {
        state1[i].src = `https:${short.forecast.forecastday[0].day.condition.icon}`;
      }
      state2.src = `https:${short.forecast.forecastday[1].day.condition.icon}`;
      state3.src = `https:${short.forecast.forecastday[2].day.condition.icon}`;
    }
  });
}

function search(city) {
  if (!city.trim() || city.length < 3) {
    autoIp(); 
    return;
  }

  var url = `https://api.weatherapi.com/v1/forecast.json?key=004b437fca1c4642b8b105322241312&q=${city}&days=3`;

  var myHttp = new XMLHttpRequest();
  myHttp.open("GET", url);
  myHttp.send();

  myHttp.addEventListener("load", function () {
    if (myHttp.status === 200) {
      var response = JSON.parse(myHttp.response);

      cityName.innerHTML = `${response.location.name}, ${response.location.country}`;
      degreeNumber.innerHTML = response.current.temp_c;

      var today = response.forecast.forecastday[0].date;
      var dayAfter = response.forecast.forecastday[1].date;
      var after2Days = response.forecast.forecastday[2].date;

      currentDay.innerHTML = getDayName(today);
      thisDayName.innerHTML = getDayName(today);
      dayAfterName.innerHTML = getDayName(dayAfter);
      after2DaysName.innerHTML = getDayName(after2Days);

      minDay1.innerHTML = response.forecast.forecastday[0].day.mintemp_c;
      maxDay1.innerHTML = response.forecast.forecastday[0].day.maxtemp_c;

      minDay2.innerHTML = response.forecast.forecastday[1].day.mintemp_c;
      maxDay2.innerHTML = response.forecast.forecastday[1].day.maxtemp_c;

      minDay3.innerHTML = response.forecast.forecastday[2].day.mintemp_c;
      maxDay3.innerHTML = response.forecast.forecastday[2].day.maxtemp_c;

      stateDay1.innerHTML = response.forecast.forecastday[0].day.condition.text;
      stateDay2.innerHTML = response.forecast.forecastday[1].day.condition.text;
      stateDay3.innerHTML = response.forecast.forecastday[2].day.condition.text;

      for (let i = 0; i < state1.length; i++) {
        state1[i].src = `https:${response.forecast.forecastday[0].day.condition.icon}`;
      }
      state2.src = `https:${response.forecast.forecastday[1].day.condition.icon}`;
      state3.src = `https:${response.forecast.forecastday[2].day.condition.icon}`;
    } 
  });
}

autoIp();

searchInput.addEventListener("input", function () {
  search(this.value);
});

function getDayName(dayNumber) {
  return new Date(dayNumber).toLocaleDateString('en-US', { weekday: 'long' });
}
