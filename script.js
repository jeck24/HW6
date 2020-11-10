$("#searchBtn").on("click",function(){
    console.log("click");
    searchCity = $("#searchBar").val().trim();
    console.log(searchCity);
    searchWeather(searchCity);
});

function searchWeather(input) {
    
    APIKey = "166a433c57516f51dfab1f7edaed8413";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + input + "&appid=" + APIKey;

   $.ajax({
    url: queryURL,
    method: "GET"
   })
    
    .then(function (response) {
        // Log the queryURL
        console.log(queryURL);
        // Log the resulting object
        console.log(response);
        // Transfer content to HTML
        $(".cityMain").text("City:" + response.name);
        $(".windMain").text("Wind Speed: " + response.wind.speed);
        $(".humidityMain").text("Humidity: " + response.main.humidity);
        // Convert the temp to fahrenheit
        let tempF = (response.main.temp - 273.15) * 1.80 + 32;
        // add temp content to html
        $(".temperatureMain").text("Temperature (K) " + response.main.temp);

        // Log the data in the console as well
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + tempF);
        let iconLink = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
        let imgTag = $("<img>")
        imgTag.attr("src", iconLink);
        $(".icon").html(imgTag)
    });
};