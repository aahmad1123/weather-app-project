
var cityDisplay = document.getElementById("city-dashboard")
var fetchButton = document.getElementById("fetch-button")
var formInput = document.getElementById("city")
var cityArray = JSON.parse(localStorage.getItem("city"))||[]
var weatherDisplay = document.getElementById("weather-display")
var weatherIcon= document.getElementById("weather-icon")
var temp = document.createElement("p")
var humidity = document.createElement("p")
var wind = document.createElement("p")
var cityName = document.createElement("h3")
var forecast = document.getElementById("forecast")


function getApi(city){
    
   
     if (cityArray.indexOf(city) === -1){
        // console.log("hit this")
        cityArray.push(city)
        localStorage.setItem("city", JSON.stringify(cityArray))

        var cityButton = document.createElement("button")
        cityButton.textContent = city
        cityButton.setAttribute("value", city)

        cityButton.addEventListener("click",function(){
            getApi(this.value)
        })
        cityDisplay.append(cityButton)
    }
    var requestURL = 'https://api.openweathermap.org/data/2.5/forecast?q='+ city + '&units=imperial&appid=3014bc214835c93d24b06afecabe6c35'

    fetch(requestURL)
    .then(function (response){
        return response.json();
    })
    .then(function (data){
        console.log(data)
        forecast.innerHTML= ""


        for (var i = 4; i < data.list.length; i +=8){
            console.log(data.list[i])
            var forecastCard = document.createElement("div");
            forecastCard.setAttribute("class", "forecastCard")
            var foreCastTemp = document.createElement("p")
            foreCastTemp.textContent = "Temp: " + data.list[i].main.temp + "F"
            var foreCastWind = document.createElement('p')
            foreCastWind.textContent = "Wind speed: " + data.list[i].wind.speed + "MPH"
            var forecastHumidity = document.createElement('p')
            forecastHumidity.textContent = "Humidity: "+ data.list[i].main.humidity + "%"
            var icon = document.createElement("img")
            forecastDate = document.createElement("h3")
            // forecastDate.textContent = data.list[i].dt_txt
            var unixTimecode = data.list[i].dt
        var timestamp = unixTimecode * 1000
        var date = new Date(timestamp);
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        var formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
        forecastDate.textContent= formattedDate
        icon.setAttribute("class", "forecastIcon")
        icon.setAttribute('src', "https://openweathermap.org/img/wn/"+ data.list[i].weather[0].icon +"@2x.png")

            forecastCard.append(forecastDate, icon, foreCastTemp, foreCastWind, forecastHumidity)
            forecast.append(forecastCard)

        }
        
    })

    var requestURL2 = "https://api.openweathermap.org/data/2.5/weather?q="+ city + '&units=imperial&appid=3014bc214835c93d24b06afecabe6c35'
    fetch(requestURL2)
    .then(function (response){
        return response.json();
    })
   .then(function(data){
        console.log(data)
        weatherDisplay.innerHTML =""
        temp.textContent = ("Temp: " + data.main.temp + "F")
        humidity.textContent = ("Humidity: " + data.main.humidity + "%")
        wind.innerHTML = ("Wind Speed: "+ data.wind.speed + " MPH")
        var icon = document.createElement("img")
        icon.setAttribute("class", "currentIcon")
        icon.setAttribute('src', "https://openweathermap.org/img/wn/"+ data.weather[0].icon +"@2x.png")
         weatherDisplay.append(cityName)
         weatherDisplay.append(icon)
        weatherDisplay.append(temp)
        weatherDisplay.append(humidity)
        weatherDisplay.append(wind)
        var unixTimecode = data.dt
        var timestamp = unixTimecode * 1000
        var date = new Date(timestamp);
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        var formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
        console.log(formattedDate)
        cityName.textContent= (city + " " + formattedDate)


   })
}

for(var i=0; i < cityArray.length; i++){
    var cityButton = document.createElement("button")
    cityButton.textContent = cityArray[i]
    cityButton.setAttribute("value", cityArray[i])

    cityButton.addEventListener("click",function(){
        getApi(this.value)

    })
    cityDisplay.append(cityButton)

}

fetchButton.addEventListener("click", function(){
    var city = document.querySelector("#city").value
    getApi(city)

})