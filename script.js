const apiKey = 'ebfbe56098554c2f9893248831faeb99';

document.getElementById('getWeather').addEventListener('click', function() {
    const city = document.getElementById('city').value.trim();
    
    // Check if the input is empty
    if (!city) {
        alert('Please enter a city');
        return;
    }
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // Fetch weather data from the OpenWeatherMap API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Handle city not found case (OpenWeatherMap returns cod: 404 for this)
            if (data.cod === 404) {
                document.getElementById('weatherDetails').innerHTML = `<p>City not found. Please try again.</p>`;
                return;
            }
            
            // If data is found, display the weather details
            const weatherDetails = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
                <p>Weather: ${data.weather[0].description}</p>
            `;
            document.getElementById('weatherDetails').innerHTML = weatherDetails;
        })
        .catch(error => {
            // Handle errors in case of network or other issues
            document.getElementById('weatherDetails').innerHTML = `<p>Error fetching data. Please try again later.</p>`;
            console.error('Error fetching weather data:', error);
        });
});
