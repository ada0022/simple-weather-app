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
            // Handle city not found case
            if (data.cod === 404) {
                document.getElementById('weatherDetails').innerHTML = `<p>City not found. Please try again.</p>`;
                return;
            }
            
            // Display weather details
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

// Function to create a painted sky with clouds
function createSkyWithClouds(totalBlocks) {
    const skyElement = document.querySelector('.sky');
    for (let i = 0; i < totalBlocks; i++) {
        const div = document.createElement('div');
        div.className = 'grid-block'; // Ensure this class has styles to be visible
        
        // Randomly decide if this block should be sky or cloud
        if (Math.random() < 0.15) { // 15% chance to become a cloud
            div.classList.add('cloud-color'); // You can add styles for cloud color
        } else {
            div.classList.add('sky-color'); // You can add styles for sky color
        }
    
        // Position blocks randomly within the sky
        div.style.top = `${Math.random() * 100}vh`; // Random top position
        div.style.left = `${Math.random() * 100}vw`; // Random left position
    
        skyElement.appendChild(div);
    }
}

// Automatically generate enough blocks to fill the screen
const totalBlocks = Math.ceil(window.innerWidth * window.innerHeight / 100); // 100 pixels per block
createSkyWithClouds(totalBlocks);
