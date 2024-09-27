import './styles.css'; 

const searchBtn = document.querySelector("#search-btn");
const unitToggle = document.querySelector("#unitToggle"); // Toggle for unit selection
let isFahrenheit = true; // Default to Fahrenheit
const apiKey = '26R3U2DJ5HJM7BLHH5D22E55S';
let city = 'Santo Domingo'; // Replace this dynamically based on user input

// Async function to fetch weather data
async function fetchWeatherData() {
    const cityInput = document.querySelector("#city-input").value.trim(); // Get the user's city input
    city = cityInput || city; // If input is empty, use default city
    const unitGroup = isFahrenheit ? 'us' : 'metric'; // Use 'us' for Fahrenheit, 'metric' for Celsius
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}?unitGroup=${unitGroup}&key=${apiKey}&contentType=json`;
    let weatherIcon;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error fetching weather data: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);
        // Extract and display the weather data in your app
        const temperature = data.currentConditions.temp;
        const condition = data.currentConditions.conditions;
        const humidity = data.currentConditions.humidity;
        weatherIcon = data.currentConditions.icon; // Get the icon name

        // Update the UI
        document.getElementById('city-name').textContent = city;
        document.getElementById('temperature').textContent = `${temperature.toFixed(1)}°${isFahrenheit ? 'F' : 'C'}`;
        document.getElementById('weather-condition').textContent = condition;
        console.log(weatherIcon);
    } catch (error) {
        console.error('Error:', error);
    }

    // Fetch GIF from Giphy
// Fetch GIF from Giphy
const giphyKey = 'evuw8kflhoLIqK8rhzSLCQWdxCoMul60';
try {
    const giphy = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${giphyKey}&s=${weatherIcon}`, { mode: 'cors' });
    if (!giphy.ok) {
        throw new Error(`Network response was not ok: ${giphy.statusText}`);
    }
    
    const fetchData = await giphy.json();
    
    if (fetchData.data && fetchData.data.images) {
        document.querySelector("#weather-icon").src = fetchData.data.images.original.url;
    } else {
        throw new Error("No images found in the response");
    }
} catch (error) {
    console.error("Error fetching GIF: ", error);
    document.querySelector("#weather-icon").src = ""; // Clear the image source if no image is found
    alert("No GIF found for the search term. Please try another term.");
}


}



// Initial fetch of weather data
fetchWeatherData();

// Event listeners
searchBtn.addEventListener('click', fetchWeatherData);
unitToggle.addEventListener('change', function() {
    isFahrenheit = this.checked; // Update unit based on toggle
    fetchWeatherData(); // Fetch data again with the new unit
});
