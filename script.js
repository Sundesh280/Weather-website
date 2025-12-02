// fetch api 
const apiKey = '3b63c38c3d0c5f38ba29c87b79f3cd80';
async function fetchWeather(city) {
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await res.json();
    
    if (data.cod !== 200) {
      alert(data.message);
      return;
    }

    updateWeatherUI(data);
    
  } catch (err) {
    console.error('Error fetching weather:', err);
  }
}

// 
function updateWeatherUI(data) {
  document.getElementById('temperature').textContent = `${data.main.temp}°C`;
  document.getElementById('description').textContent = data.weather[0].description;
  document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
  document.getElementById('pressure').textContent = `Pressure: ${data.main.pressure} hPa`;
  document.getElementById('wind').textContent = `Wind: ${data.wind.speed} km/h`;
  document.getElementById('City_Name').textContent = data.name;

  const iconClass = getWeatherIcon(data.weather[0].main);
  document.getElementById('weatherIcon').className = `fa ${iconClass}`;
}

// weather info 
function getWeatherIcon(weatherMain) {
  switch(weatherMain) {
    case 'Clear': return 'fa-sun';
    case 'Clouds': return 'fa-cloud';
    case 'Rain': return 'fa-cloud-showers-heavy';
    case 'Snow': return 'fa-snowflake';
    case 'Thunderstorm': return 'fa-bolt';
    case 'Drizzle': return 'fa-cloud-rain';
    case 'Fog': return 'fa-smog';
    default: return 'fa-question';
  }
}

// onlick fuction fro button 
document.getElementById('searchBtn').addEventListener('click', () => {
  const city = document.getElementById('cityInput').value.trim();
  if (city) {
    fetchWeather(city);
  } else {
    alert('Please enter a city name.');
  }
});

// show the date

function displayDate() {
  const now = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  document.querySelector('.date-time').textContent = now.toLocaleString(undefined, options);
}

displayDate(); 




