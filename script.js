let weather = {
    apiKey: "a6418f21787a0a6e3dda0e543299019a",
    fetchWeather: function(city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data))
        .catch((error) => console.log("Error:", error));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name, icon, description, temp, humidity, speed);
        document.querySelector(".city").innerText = "Weather in " +  name;
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + "km/hr";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}')`;
    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

weather.fetchWeather("Chennai");

document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault(); // prevent the default form submission
      weather.search(); // call the search function when the Enter key is pressed
    }
});
