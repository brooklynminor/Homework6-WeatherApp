var currentDay = document.getElementById('currentDay')
var searchBtn = document.getElementById("searchBtn");
// URL for weather icon
var weatherIconURL = "https://openweathermap.org/img/wn/10d@2x.png"

// This is our API key
var APIkey = "3ab9c663741007177d4cd151315964af";

var searchCity = localStorage.search ? JSON.parse(localStorage.search) : [];


searchBtn.addEventListener('click', function () {
  const cityName = document.querySelector('#cityName').value
  console.log(`hi there cityName=${cityName}`)

  searchCity.push(cityName)
  localStorage.search = JSON.stringify(searchCity)
  displaySearchCity();
  getWeather(cityName)
});
// function search( searchWeather ){
// $('#search').append(`
// <button onclick="getWeather('${searchWeather}'">${searchWeather}</button>) 
// } 
var saveName = [];

function displaySearchCity() {
  console.log(searchCity)

  for (var i = 0; i < searchCity.length; i++) {
    if (searchCity[i]) {
      saveName = searchCity[i]
      document.querySelector('#loadCityName').innerHTML += `<button type="button" class="btn btn-secondary btn-sm" onClick="getWeather('${saveName}')">` + `${saveName}` + '</button>';

    }
  }
}


function loadSearchCity() {
  document.getElementById('searchCity')
  //  document.querySelector("#search-list").innerHTML+=`
  //     <button type="button" class="btn btn-warning" onClick="clearAll()">Clear All</button>`
  for (let i = 0; i < searchCity.length; i++) {
    document.querySelector("#searchCity").innerHTML += `
              <button class="btn btn-primary btn-lg" onclick="sideBarSearch('${searchCity[i]}')">${searchCity[i]}</button>`
  }

}


// current day, month, date, year and time and updates every second
function showTime() {
  currentDay.innerText = moment().format('dddd, MMMM Do YYYY, h:mm a');
}
setInterval(showTime, 1000)
showTime()



// current city forcast --- only run WHEN user has clicked and got a CITY NAME

function getWeather(cityName) {
  var cityNameURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=` + APIkey;
  var apiData

  $.ajax({
    url: cityNameURL,
    method: "GET"
  }).then(function (currentResponse) {
    console.log(`response is: `, currentResponse)
    apiData = currentResponse
    // $('#currentWeather-card').append(currentResponse)

    document.querySelector('.city').textContent = 'City: ' + apiData.name
    document.querySelector('.wind').textContent = 'Wind Speed: ' + apiData.wind.speed + 'm/s';
    document.querySelector('.humidity').textContent = 'Humidity: ' + apiData.main.humidity + '%';
    document.querySelector('.temp').textContent = 'Temp: ' + (apiData.main.temp - 273.15).toFixed(1);
    $('#icon').html(`<img class='ml-5' src="https://openweathermap.org/img/wn/${apiData.weather[0].icon}@2x.png"/>`);

    // UV Index API by Geographic coordinates
    $.get('https://api.openweathermap.org/data/2.5/uvi?lat=' + currentResponse.coord.lat + '&lon=' + currentResponse.coord.lon + '&units=metric&exclude=daily&appid=' + APIkey)

      .then(function (oneCallResponse) {
        console.log(`oneCallResponse: `, oneCallResponse.value)
        document.querySelector('.uv').textContent = oneCallResponse.value

      })

      $.get( 'https://api.openweathermap.org/data/2.5/onecall?lat=' + currentResponse.coord.lat + '&lon=' + currentResponse.coord.lon + '&units=metric&appid=' + APIkey)

      // 5-day forcast API by city name
      .then(function (fiveDayResponse) {
        console.log(`response is: `, fiveDayResponse)
        element = fiveDayResponse
          
          document.querySelector('#date1').textContent = moment().add(1, "days").format("MMM Do YYYY");
          document.querySelector('.humidity1').textContent = 'Humidity: ' + element.daily[1].humidity + '%';
          document.querySelector('.temp1').textContent = 'Temp: ' + (element.daily[1].temp.day - 273.15).toFixed(1);
          $('#icon1').html(`<img class='ml-4' src="https://openweathermap.org/img/wn/${element.daily[1].weather[0].icon}@2x.png"/>`);
    
          document.querySelector('#date2').textContent = moment().add(2, "days").format("MMM Do YYYY");
          document.querySelector('.humidity2').textConent = 'Humidity: ' + element.daily[2].humidity + '%';
          document.querySelector('.temp2').textContent = 'Temp: ' + (element.daily[2].temp.day - 273.15).toFixed(1);
          $('#icon2').html(`<img class='ml-4' src="https://openweathermap.org/img/wn/${element.daily[2].weather[0].icon}@2x.png"/>`);
    
          document.querySelector('#date3').textContent = moment().add(3, "days").format("MMM Do YYYY");
          document.querySelector('.humidity3').textContent = 'Humidity: ' + element.daily[3].humidity + '%';
          document.querySelector('.temp3').textContent = 'Temp: ' + (element.daily[3].temp.day - 273.15).toFixed(1);
          $('#icon3').html(`<img class='ml-4' src="https://openweathermap.org/img/wn/${element.daily[3].weather[0].icon}@2x.png"/>`);
    
          document.querySelector('#date4').textContent = moment().add(4, "days").format("MMM Do YYYY");
          document.querySelector('.humidity4').textContent = 'Humidity: ' + element.daily[4].humidity + '%';
          document.querySelector('.temp4').textContent = 'Temp: ' + (element.daily[4].temp.day - 273.15).toFixed(1);
          $('#icon4').html(`<img class='ml-4' src="https://openweathermap.org/img/wn/${element.daily[4].weather[0].icon}@2x.png"/>`);
    
          document.querySelector('#date5').textContent = moment().add(5, "days").format("MMM Do YYYY");
          document.querySelector('.humidity5').textContent = 'Humidity: ' + element.daily[5].humidity + '%';
          document.querySelector('.temp5').textContent = 'Temp: ' + (element.daily[5].temp.day - 273.15).toFixed(1);
          $('#icon5').html(`<img class='ml-4' src="https://openweathermap.org/img/wn/${element.daily[5].weather[0].icon}@2x.png"/>`);
    
      
          })
          .catch(function (error) {
            console.log(error)
      
        })
  
  })
  

}
