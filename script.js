const API_KEY = "f83db8837e5b402084a170936250407";
const CITY = "Madison";
const ZIP = "53719";

function updateClock() {
  const now = new Date();
  const clock = document.getElementById("clock");
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  clock.textContent = `${hours}:${minutes}:${seconds}`;
}

function updateBackground(condition, isNight) {
  const body = document.body;
  body.className = ""; // Reset classes

  if (isNight) {
    body.classList.add("night");
  }

  if (condition.includes("rain")) {
    body.classList.add("rainy");
  } else if (condition.includes("cloud")) {
    body.classList.add("cloudy");
  } else if (condition.includes("fog") || condition.includes("mist")) {
    body.classList.add("foggy");
  } else if (condition.includes("snow")) {
    body.classList.add("snowy");
  } else if (condition.includes("clear") || condition.includes("sunny")) {
    body.classList.add(isNight ? "clear-night" : "clear-day");
  }
}

async function updateWeather() {
  const weatherBox = document.getElementById("weather");

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${ZIP}`
    );
    const data = await response.json();
    const temp = Math.round(data.current.temp_f);
    const condition = data.current.condition.text.toLowerCase();
    const isNight = data.current.is_day === 0;

    weatherBox.innerHTML = `
      <h2>${CITY} Weather</h2>
      <p><strong>${condition}</strong></p>
      <p>${temp}°F</p>
    `;

    updateBackground(condition, isNight);
  } catch (error) {
    weatherBox.innerHTML = `<p>Could not load weather.</p>`;
    console.error("Weather API error:", error);
  }
}

setInterval(updateClock, 1000);
updateClock();
updateWeather();
