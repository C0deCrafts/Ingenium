import {ICONS} from "./icons";

/**
 * This file defines a mapping of weather conditions to corresponding weather icons.
 *
 * The weather conditions are mapped to specific weather icons sourced from the 'icons.js' file.
 * If the weather condition is not explicitly defined in this mapping, an empty string is used,
 * which results in hiding the weather icon.
 *
 * @constant {Object} weatherImages - Object containing mappings of weather conditions to weather icons
 * @property {string} Sunny - Sunny weather condition mapped to the corresponding icon
 * @property {string} Clear - Clear weather condition mapped to the corresponding icon
 * @property {string} Partly cloudy - Partly cloudy weather condition mapped to the corresponding icon
 * @property {string} Cloudy - Cloudy weather condition mapped to the corresponding icon
 * @property {string} Overcast - Overcast weather condition mapped to the corresponding icon
 * @property {string} Light rain - Light rain weather condition mapped to the corresponding icon
 * @property {string} Moderate rain - Moderate rain weather condition mapped to the corresponding icon
 * @property {string} Heavy rain - Heavy rain weather condition mapped to the corresponding icon
 * @property {string} Moderate or heavy freezing rain - Moderate or heavy freezing rain weather condition mapped to the corresponding icon
 * @property {string} Moderate or heavy rain shower - Moderate or heavy rain shower weather condition mapped to the corresponding icon
 * @property {string} Moderate or heavy rain with thunder - Moderate or heavy rain with thunder weather condition mapped to the corresponding icon
 * @property {string} other - Default icon when the weather condition is not explicitly defined (icon will be hidden)
 */
export const weatherImages = {
    "Sunny": ICONS.WEATHER_ICONS.SUNNY,
    "Clear": ICONS.WEATHER_ICONS.SUNNY,
    "Partly cloudy": ICONS.WEATHER_ICONS.SUN_CLOUDY,
    "Cloudy": ICONS.WEATHER_ICONS.CLOUDY,
    "Overcast": ICONS.WEATHER_ICONS.CLOUDY,
    "Light rain": ICONS.WEATHER_ICONS.RAIN,
    "Moderate rain": ICONS.WEATHER_ICONS.RAIN,
    "Heavy rain": ICONS.WEATHER_ICONS.RAIN,
    "Moderate or heavy freezing rain": ICONS.WEATHER_ICONS.SNOWFALL,
    "Moderate or heavy rain shower": ICONS.WEATHER_ICONS.RAIN,
    "Moderate or heavy rain with thunder": ICONS.WEATHER_ICONS.THUNDER,
    "other": "", // Icon wird ausgeblendet
};
