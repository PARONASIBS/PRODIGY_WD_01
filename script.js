const apiKey = "077b8e270559a0dae0428a0a6edd21fd";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    switch(data.weather[0].main) {
      case "Clouds": weatherIcon.src = "Assets/images/clouds.png"; break;
      case "Clear": weatherIcon.src = "Assets/images/clear.png"; break;
      case "Rain": weatherIcon.src = "Assets/images/rain.png"; break;
      case "Drizzle": weatherIcon.src = "Assets/images/drizzle.png"; break;
      case "Mist": weatherIcon.src = "Assets/images/mist.png"; break;
      default: weatherIcon.src = "Assets/images/clear.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";

  } catch (err) {
    console.error("Error fetching weather:", err);
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
