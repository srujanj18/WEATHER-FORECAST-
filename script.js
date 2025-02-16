const apiKey = "YOUR_OPENWEATHER_API_KEY"; // Replace with your OpenWeatherMap API key
const weatherForm = document.getElementById("weather-form");
const locationInput = document.getElementById("location-input");
const weatherInfo = document.getElementById("weather-info");

// Fetch weather data from the API
async function fetchWeather(location) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Location not found. Please try again.");
    }
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    weatherInfo.innerHTML = `<p class="error">${error.message}</p>`;
  }
}

// Display weather data on the page
function displayWeather(data) {
  const { name, main, weather, wind } = data;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  weatherInfo.innerHTML = `
    <h2>${name}</h2>
    <img src="${iconUrl}" alt="${weather[0].description}">
    <p><strong>Temperature:</strong> ${main.temp}°C</p>
    <p><strong>Weather:</strong> ${weather[0].description}</p>
    <p><strong>Humidity:</strong> ${main.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
  `;
}

// Handle form submission
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = locationInput.value.trim();
  if (location) {
    fetchWeather(location);
  } else {
    weatherInfo.innerHTML = `<p class="error">Please enter a location.</p>`;
  }
});

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoords(latitude, longitude);
      },
      (error) => {
        console.error("Error fetching location:", error);
        weatherInfo.innerHTML = `<p class="error">Unable to fetch your location.</p>`;
      }
    );
  }
  
  async function fetchWeatherByCoords(lat, lon) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Unable to fetch weather data.");
      }
      const data = await response.json();
      displayWeather(data);
    } catch (error) {
      weatherInfo.innerHTML = `<p class="error">${error.message}</p>`;
    }
  }
