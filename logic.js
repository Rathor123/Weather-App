// sample url
// https://api.openweathermap.org/data/2.5/weather?q=goa&appid=b7bb872b699bf54572a9f219fb730b08
// all selectors
let url = "https://api.openweathermap.org/data/2.5/weather?";
let apikey = "b7bb872b699bf54572a9f219fb730b08&units=metric";
let deg = document.querySelector(".deg");
let city = document.querySelector(".city");
let humidity = document.querySelector(".humidity");
let windSpeed = document.querySelector(".windSpeed");
let img = document.querySelector(".img");
let getcity = document.querySelector(".searchInput");
let valuebox = document.querySelector(".valuebox");
let invalidmsg = document.querySelector(".invalid");

//this function fetching weather values from api & changing DOM elements

async function checkWeather(town) {
  valuebox.style.display = "none";
  invalidmsg.style.display = "none";
  let wheatherUrl = await fetch(`${url}q=${town}&appid=${apikey}`);
  if (wheatherUrl.status == 404) {
    // valuebox.style.display = "block";
    invalidmsg.style.display = "block";
  } else {
    let data = await wheatherUrl.json();
    let humiditycheck = data.weather[0].main;
    if (humiditycheck == "Haze") {
      img.src = "images/clear.png";
    } else if (humiditycheck == "Clouds") {
      img.src = "images/clouds.png";
    } else if (humiditycheck == "Rain") {
      img.src = "images/rain.png";
    } else if (humiditycheck == "Drizzle") {
      img.src = "images/drizzle.png";
    } else if (humiditycheck == "Mist") {
      img.src = "images/mist.png";
    } else if (humiditycheck == "Clear") {
      img.src = "images/clear.png";
    } else if (humiditycheck == "Snow") {
      img.src = "images/snow.png";
    } else {
      img.src = "images/wind.png";
    }
    deg.innerHTML = Math.round(data.main.temp) + "°C";
    city.innerHTML = data.name;
    windSpeed.innerHTML = `${data.wind.speed}km/h <br> Wind Speed`;
    humidity.innerHTML = `${data.main.humidity}% <br> Humidity`;
    valuebox.style.display = "block";
  }
}
let btn = document.querySelector(".btn");
// button click event
btn.addEventListener("click", () => {
  checkWeather(getcity.value);
});
// enter key event
getcity.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    checkWeather(getcity.value);
  }
});
