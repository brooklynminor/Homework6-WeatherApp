# Homework6-WeatherApp

## Objective
An API is a software intermediary that allows application to communicate witth one-another. Retrieved data from another application's API is used to access data and functionality by making requests with specific parameters to a URL. In this case, the weather dashboared is using the OpenWeather API.

## Overview
When we manipulate the DOM using JavaScript or jQuery, we are leveraging the DOM API. An API, or application programming interface, is a set of protocols that allows us to hook into the functionality of another application and use it within our own. The DOM API is an example of a **client-side API**. There are numerous client-side web APIs that extend the functionality of the browser.

Companies and organizations that collect and store data often make that data available to web developers to use in their applications. A **server-side API** is one or more URLs, or endpoints, where we can make requests for data stored on a third-party server.

When we make a request to a server-side API, we have no control over how long the response will take to resolve. This can create issues when dynamically generating HTML in the DOM because our JavaScript might execute before we receive the data, we need to render elements. AJAX (asynchronous JavaScript and XML) is the integration of several technologies to address this asynchronicity of the client-server request-response pattern. 

XML, or extensible markup language, is a specification for encoding documents (similar to HTML). It was the standard format for data exchange for many years but has been largely replaced by JSON, though we still refer to this approach as AJAX. The fetch API was recently introduced to make it easier to use the XMLHttpRequest object without the need for a third-party library such as jQuery.

## Algorithms
The web-application documents the date and time using Moment.js, the date is updated every second.
```
function showTime() {
  currentDay.innerText = moment().format('dddd, MMMM Do YYYY, h:mm a');
}
setInterval(showTime, 1000)
showTime()
```

Event Listeners are methods that attach an event handler to a specified element without overwritting existing handlers. This method allows event listeners to be added to any HTML DOM object or element.
```
searchBtn.addEventListener('click', function () {
  const cityName = document.querySelector('#cityName').value
  console.log(`hi there cityName=${cityName}`)


  getWeather(cityName)
});
```

JSON is used to exchange data to and from a web server. The data received from the web server is displayed as a string.
```
var searchCity = localStorage.search ? JSON.parse(localStorage.search) : [];
```

A for loop is added in order for the user to cycle through the properties, while displaying a different value. This allows user to loop through  various Cities.
```
  document.querySelector('#loadCityName').innerHTML = ""
  for (var i = 0; i < searchCity.length; i++) {
    if (searchCity[i]) {
      saveName = searchCity[i]
      document.querySelector('#loadCityName').innerHTML += `<button type="button" class="btn btn-secondary btn-sm" onClick="getWeather('${saveName}')">` + `${saveName}` + '</button>';

    }
  }
```

Query selector method is used to return an element that matches the specified selectors. In this case, it is used to select HTML elements based on their id and classes.

Four API calls were used to create the Weather App; UV Index, Five Day Forcast, Weather Icons and the Current City Forcast. The API's are all nested within the getWeather function passing in the parameters of cityName. In order to request the API calls an API key is rerquired.

AJAX echanges data with the server, and updating parts of a web page wihtout reloading. Ajax calls can also send data from a server asynchronously without interfering with the display and behaviour of the existing page.
```
$.ajax({
    url: cityNameURL,
    method: "GET"
}).then(function (currentResponse) {
    console.log(`response is: `, currentResponse)
    apiData = currentResponse
```
The $.get() method requests data from the server with an HTTP GET request.
GET method is used to request data from a specified resource through the request of the URL parameter.
```
      $.get( 'https://api.openweathermap.org/data/2.5/onecall?lat=' + currentResponse.coord.lat + '&lon=' + currentResponse.coord.lon + '&units=metric&appid=' + APIkey)
```

The .then method function to register a callback that JavaScript will call when the value is computed. The method accepts a resolved and a rejected callback. Where the catch statement lets you handle the error. The catch statement allows you to define a block of code to be executed, if an error occurs in the then block.
```
          .catch(function (error) {
```
  ## License
  [License](https://choosealicense.com/licenses/mit)