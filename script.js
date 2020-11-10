$("#searchBtn").on("click",(event) =>{
    event.preventDefault();
    console.log("click");
    searchCity = $("#searchBar").val().trim();
    console.log(searchCity);
    searchWeather(searchCity);
    searchForecasts(searchCity);
});

function searchWeather(input) {
    
    APIKey = "166a433c57516f51dfab1f7edaed8413";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + input + "&units=metric&appid=" + APIKey;

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
        $("#cityMain").text(response.name);
        $(".windMain").text("Wind Speed: " + response.wind.speed);
        $(".humidityMain").text("Humidity: " + response.main.humidity);

        var lat = response.coord.lat;
        console.log("Lat: " + lat);

        var lon = response.coord.lon;
        console.log("Lon: " + lon);
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

        searchUV(lat,lon);
    });
};

function searchUV(lat,lon){
    APIKey = "166a433c57516f51dfab1f7edaed8413";
    var queryURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&cnt=1&appid="+APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .then(function(response){
        $(".uvMain").text("UV Index: "+response[0].value);

    });
}

function searchForecasts(input){
    APIKey = "166a433c57516f51dfab1f7edaed8413";
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + input + "&units=metric&cnt=6&appid=" + APIKey;

    $.ajax({
        url:queryURL,
        method:"GET"
    })

    .then(function(response){
        $("#dayPlusOneTemperature").text("Temperature: "+response.list[0].temp.day);
        $("#dayPlusOneHumidity").text("Humidity: "+response.list[0].humidity);
        getDateOne(response.list[0].dt);

        $("#dayPlusTwoTemperature").text("Temperature: "+response.list[1].temp.day);
        $("#dayPlusTwoHumidity").text("Humidity: "+response.list[1].humidity);
        getDateTwo(response.list[1].dt);

        $("#dayPlusThreeTemperature").text("Temperature: "+response.list[2].temp.day);
        $("#dayPlusThreeHumidity").text("Humidity: "+response.list[2].humidity);
        getDateThree(response.list[2].dt);

        $("#dayPlusFourTemperature").text("Temperature: "+response.list[3].temp.day);
        $("#dayPlusFourHumidity").text("Humidity: "+response.list[3].humidity);
        getDateFour(response.list[3].dt);

        $("#dayPlusFiveTemperature").text("Temperature: "+response.list[4].temp.day);
        $("#dayPlusFiveHumidity").text("Humidity: "+response.list[4].humidity);
        getDateFive(response.list[4].dt);
    });
}

function getDateOne(x){
    var date = new Date(x*1000);
    console.log(date);

    $("#dayPlusOneDate").text(date);
}

function getDateTwo(x){
    var date = new Date(x*1000);
    console.log(date);

    $("#dayPlusTwoDate").text(date);
}

function getDateThree(x){
    var date = new Date(x*1000);
    console.log(date);

    $("#dayPlusThreeDate").text(date);
}

function getDateFour(x){
    var date = new Date(x*1000);
    console.log(date);

    $("#dayPlusFourDate").text(date);
}

function getDateFive(x){
    var date = new Date(x*1000);
    console.log(date);

    $("#dayPlusFiveDate").text(date);
}