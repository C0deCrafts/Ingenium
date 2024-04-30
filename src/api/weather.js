import axios from "axios";
import {weatherImages} from "../constants/weatherData";
import {ICONS} from "../constants/icons";

//API from https://www.weatherapi.com
const apiKey = "36c91753cb8741d4a61132836241403";

const currentWeather = params => `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}`;

/**
 * ### fetchCurrentWeather
 * Function to fetch the current weather condition and corresponding icon for a specified city using the WeatherAPI.
 *
 * @param cityName - The name of the city for which to fetch the weather.
 * @returns {Promise<{condition: string, icon: number}|{condition: *, icon: (*|number), temperature: *}>} - Promise resolving to an object containing the current weather condition, icon URL, and temperature.
 * @dependencies axios, weatherImages, ICONS
 */
const fetchCurrentWeather = async (cityName) => {
    try {
        // Construct URL for accessing WeatherAPI forecast endpoint
        const response = await axios.get(currentWeather({cityName}));
        // Extract current weather condition text from the response
        const conditionText = response.data.current.condition.text;
        // Find corresponding icon URL based on condition text, or use default icon if not found
        const icon = weatherImages[conditionText] || ICONS.WEATHER_ICONS.DEFAULT;
        // Extract current temperature from the response
        const temperature = response.data.current.temp_c;

        // Log current weather condition to the console for test
        //console.log(`Das aktuelle Wetter in ${cityName}: ${conditionText}, Temperatur: ${temperature}`);

        // Return an object containing current weather condition and corresponding icon URL
        return { condition: conditionText, icon, temperature };
    } catch (err) {
        console.error("Fehler beim Abrufen der Wetterdaten: ", err);
        // Return default values in case of error
        return { condition: 'Unbekannt', icon: ICONS.WEATHER_ICONS.DEFAULT };
    }
}

export default fetchCurrentWeather;
