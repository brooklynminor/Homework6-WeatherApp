var currentDay = document.getElementById('currentDay')
var searchBtn = document.getElementById("searchBtn");
// URL for weather icon
var weatherIconURL = "https://openweathermap.org/img/wn/10d@2x.png"

// This is our API key
var APIkey = "3ab9c663741007177d4cd151315964af";

searchBtn.addEventListener('click', function () {
  const cityName = document.querySelector('#cityName').value 
  console.log( `hi there cityName=${cityName}`)

  getWeather( cityName )
});
// function search( searchWeather ){
// $('#search').append(`
// <button onclick="getWeather('${searchWeather}'">${searchWeather}</button>) 
// } 
var searchCityArray =  JSON.parse(localStorage.getItem("searchHistory"));

console.log(searchCityArray)

function displaySearchCity(){
  console.log( searchCityArray )

  var saveName = [];
  document.querySelector('#localStorage-card').innerHTML = '<p>' + `${cityName}` + '</p>';
   for(var i=0; i<searchCityArray.length; i++){
      if(searchCityArray[i].name ){
          saveName = searchCityArray[i].name
      }
   }
   document.querySelector('#localStorage-card').textContent = saveName 
}


function loadSearchCity() {
  document.getElementById('searchCity')
  searchCity = localStorage.search ? JSON.parse(localStorage.search) : [];
  //  document.querySelector("#search-list").innerHTML+=`
  //     <button type="button" class="btn btn-warning" onClick="clearAll()">Clear All</button>`
  for (let i = 0; i < searchCity.length; i++) {
    document.querySelector("#searchCity").innerHTML += `
              <button class="btn btn-primary btn-lg" onclick="sideBarSearch('${searchCity[i]}')">${searchCity[i]}</button>`
  }
}

// current day, month, date, year and time and updates every second
function showTime(){
  currentDay.innerText = moment().format('dddd, MMMM Do YYYY, h:mm a');
}
setInterval( showTime, 1000)
showTime()






// current city forcast --- only run WHEN user has clicked and got a CITY NAME

function getWeather( cityName ){
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
        console.log( `oneCallResponse: `, oneCallResponse.value)
        // console.log(`coords: `, oneCallResponse.coord.lat, oneCallResponse.coord.lon);
        document.querySelector('.uv').textContent = oneCallResponse.value

        // to convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
      })

      // .catch(function (error) {
      //   console.log(error)
      // });
  })


  // 5-day forcast API by city name
  var fiveDayForcastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=` + APIkey;

  $.ajax({
    url: fiveDayForcastURL,
    method: "GET"
  }).then(function (fiveDayResponse) {
    // console.log(`response is: `, fiveDayResponse)

    fiveDayResponse.daily.forEach(element => {
      var displayEl1 = $('<p>' + fiveDayResponse.current.weather[1].description + '</p>');
      $('#currentWeather-card1').append(displayEl1)
      // to convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
      document.querySelector('.date1').textContent = moment().add(1, "days").format("MMM Do YYYY");
      document.querySelector('.humidity1').textContent = 'Humidity: ' + element.main.humidity + '%';
      document.querySelector('.temp1').textContent = 'Temp: ' + (element.main.temp - 273.15).toFixed(1);
      $('#icon1').html(`<img class='ml-5' src="https://openweathermap.org/img/wn/${element.weather[1].icon}@2x.png"/>`);

        var displayEl2 = $('<p>' + fiveDayResponse.current.weather[2].description + '</p>');
        $('#currentWeather-card2').append(displayEl2);
        // to convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
        document.querySelector('.date2').textContent = moment().add(2, "days").format("MMM Do YYYY");
        document.querySelector('.humidity2').textConent = 'Humidity: ' + element.main.humidity + '%';
        document.querySelector('.temp2').textContent = 'Temp: ' + (element.main.temp - 273.15).toFixed(1);
        $('#icon2').html(`<img class='ml-5' src="https://openweathermap.org/img/wn/${element.weather[2].icon}@2x.png"/>`);

        var displayEl3 = $('<p>' + fiveDayResponse.current.weather[3].description + '</p>');
        $('#currentWeather-card3').append(displayEl3);
        // to convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
        document.querySelector('.date3').textContent = moment().add(3, "days").format("MMM Do YYYY");
        document.querySelector('.humidity3').textContent = 'Humidity: ' + element.main.humidity + '%';
        document.querySelector('.temp3').textContent = 'Temp: ' + (element.main.temp - 273.15).toFixed(1);
        $('#icon3').html(`<img class='ml-5' src="https://openweathermap.org/img/wn/${element.weather[3].icon}@2x.png"/>`);

        var displayEl4 = $('<p>' + fiveDayResponse.current.weather[4].description + '</p>');
        $('#currentWeather-card4').append(displayEl4);
        // to convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
        document.querySelector('.date4').textContent = moment().add(4, "days").format("MMM Do YYYY");
        document.querySelector('.humidity4').textContent = 'Humidity: ' + element.main.humidity + '%';
        document.querySelector('.temp4').textContent = 'Temp: ' + (element.main.temp - 273.15).toFixed(1);
        $('#icon4').html(`<img class='ml-5' src="https://openweathermap.org/img/wn/${element.weather[4].icon}@2x.png"/>`);

        var displayEl5 = $('<p>' + fiveDayResponse.current.weather[5].description + '</p>');
        $('#currentWeather-card5').append(displayEl5);
        // to convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
        document.querySelector('.date5').textContent = moment().add(5, "days").format("MMM Do YYYY");
        document.querySelector('.humidity5').textContent = 'Humidity: ' + element.main.humidity + '%';
        document.querySelector('.temp5').textContent = 'Temp: ' + (element.main.temp - 273.15).toFixed(1);
        $('#icon5').html(`<img class='ml-5' src="https://openweathermap.org/img/wn/${element.weather[5].icon}@2x.png"/>`);

      
    })

      .catch(function (error) {
        console.log(error)
      })
    })
}
