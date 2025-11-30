const apiKey = '3b63c38c3d0c5f38ba29c87b79f3cd80';
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const cityInput = document.getElementById('cityInput');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const weatherIcon = document.getElementById('weatherIcon');
const pressure = document.getElementById('pressure');
const dateTime = document.querySelector('.date-time');

// ✅ Fetch weather by city name
async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.cod !== 200) {
      alert(data.message);
      return;
    }
    updateUI(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

// promise return 
async function fetchWeather(city) {
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await res.json();
    if (data.cod !== 200) return alert(data.message);

    // Update UI directly
    document.getElementById('temperature').textContent = `${data.main.temp}°C`;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('pressure').textContent = `Pressure: ${data.main.pressure} hPa`;
    document.getElementById('wind').textContent = `Wind: ${data.wind.speed} km/h`;
    document.getElementById('City_Name').textContent = data.name;

    // icons 
const icons = {
  Clear: 'fa-sun',
  Clouds: 'fa-cloud',
  Rain: 'fa-cloud-showers-heavy',
  Snow: 'fa-snowflake',
  Thunderstorm: 'fa-bolt',
  Drizzle: 'fa-cloud-rain',
  Fog: 'fa-smog'
};


const weatherMain = data.weather[0].main;
  } catch (err) {
    console.error('Error fetching weather:', err);
  }
}


//  Event listeners
searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  } else {
    alert('Please enter a city name.');
  }
});


// Function to display real-time date and time
function displayDate() {
  const now = new Date();
  const options = { 
    weekday: 'long', month: 'long', day: 'numeric',
  };
  dateTime.textContent = now.toLocaleString(undefined, options);
}

displayDate();


