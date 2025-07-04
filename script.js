async function updateWeather() {
  const weatherBox = document.getElementById("weather");

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${ZIP}`
    );
    const data = await response.json();

    const temp = Math.round(data.current.temp_f);
    const feelsLike = Math.round(data.current.feelslike_f);
    const condition = data.current.condition.text.toLowerCase();
    const wind = Math.round(data.current.wind_mph);
    const humidity = data.current.humidity;
    const iconUrl = "https:" + data.current.condition.icon;
    const isNight = data.current.is_day === 0;

    weatherBox.innerHTML = `
      <h2>${CITY} Weather</h2>
      <div class="weather-details">
        <img src="${iconUrl}" alt="${condition}" />
        <div class="weather-text">
          <p class="condition"><strong>${condition}</strong></p>
          <p class="temp">${temp}°F <small>(feels like ${feelsLike}°F)</small></p>
          <p class="meta">💨 ${wind} mph | 💧 ${humidity}% humidity</p>
        </div>
      </div>
    `;

    updateBackground(condition, isNight);
  } catch (error) {
    weatherBox.innerHTML = `<p>Could not load weather.</p>`;
    console.error("Weather API error:", error);
  }
}
