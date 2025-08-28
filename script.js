// Access API key
// For GitHub: use placeholder to hide the real key
// For CodeSandbox: set WEATHER_API_KEY as environment variable
const apiKey = "YOUR_API_KEY";

// DOM Elements
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("getWeatherBtn");
const weatherDisplay = document.getElementById("weatherResult");

// Fetch weather
async function getWeather(city) {
  if (!city) {
    weatherDisplay.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) throw new Error("City not found or invalid API key");

    const data = await response.json();

    weatherDisplay.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>Temperature: ${data.main.temp} °C</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind Speed: ${data.wind.speed} m/s</p>
      <p>Condition: ${data.weather[0].description}</p>
    `;
  } catch (err) {
    weatherDisplay.innerHTML = `<p>Error: ${err.message}</p>`;
  }
}

// Event listeners
searchBtn.addEventListener("click", () => getWeather(cityInput.value.trim()));
cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchBtn.click();
});
