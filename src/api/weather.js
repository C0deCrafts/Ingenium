import axios from "axios";

const apiKey = "36c91753cb8741d4a61132836241403";

const currentWeather = params => `https://api.weatherapi.com/v1/search.json?key${apiKey}&q=${params.cityName}`;

const apiCall = async (endpoint) => {
    const options = {
        methode: "GET",
        url: endpoint
    }
    try{
        const response = await axios.request(options);
        return response.data;
    }catch (err){
        console.log("Error apiCall method: ", err);
        return null;
    }
}

export const fetchCurrentWeather = params => {
    return apiCall(currentWeather(params));
}