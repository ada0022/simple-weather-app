const apiKey = 'ebfbe56098554c2f9893248831faeb99';

document.getElementById('getWeather').addEventListener('click', function() {
    const city = document.getElementById('city').value.trim();
    
    // Check if the input is empty
    if (!city) {
        alert('Please enter a city');
        return;
    }

    // Show loading message
    document.getElementById('weatherDetails').innerHTML = `<p>Loading...</p>`;
    
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
function createSkyWithClouds() {
    const skyElement = document.querySelector('.sky');
    
    // Create enough blocks to fill the screen
    const totalBlocks = Math.ceil(window.innerWidth * window.innerHeight / (10 * 10)); // Number of blocks based on 10x10 size

    for (let i = 0; i < totalBlocks; i++) {
        const div = document.createElement('div');
        div.className = 'grid-block'; // Ensure this class has styles to be visible
        
        // Assign a random initial color (85% light blue, 15% white)
        div.style.backgroundColor = Math.random() < 0.15 ? 'white' : 'lightblue';
    
        skyElement.appendChild(div);
    }
}

// Change the colors of the grid blocks every 10 seconds
setInterval(() => {
    const blocks = document.querySelectorAll('.grid-block');
    blocks.forEach(block => {
        block.style.backgroundColor = Math.random() < 0.15 ? 'white' : 'lightblue'; // 15% chance for white, 85% for light blue
    });
}, 10000); // Change every 10 seconds

// Initialize the sky with clouds
createSkyWithClouds();
