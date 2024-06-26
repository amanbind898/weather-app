document.getElementById('location-form').addEventListener('submit', function(event) {
  event.preventDefault();
  getWeather();
});

async function getWeather() {
  const city = document.getElementById('location-input').value;
  document.getElementById('location-input').value = '';
  const weatherDataContainer = document.getElementById('weather-data');
 
  if (!city) {
    weatherDataContainer.textContent = 'Error: City not found';
    return;
  }

  const apiKey = '40d953b637dfecf01d5b19790d837354'; // Your actual API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (response.status === 401) {
      weatherDataContainer.textContent = 'Error: Unauthorized access. Please check your API key.';
    } else if (data.cod === '404') {
      weatherDataContainer.textContent = 'Error: City not found';
    } else {
      weatherDataContainer.innerHTML = `
        <h2>${data.name}</h2>
        <p>${data.weather[0].description}</p>
        <p>${(data.main.temp - 273.15).toFixed(2)} °C</p>
      `;
    }
  } catch (error) {
    weatherDataContainer.textContent = 'Error: Unable to fetch data';
  }
}
