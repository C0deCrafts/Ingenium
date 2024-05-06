import axios from "axios";
import { decode as atob } from 'base-64';

// Base URL of the backend - change the BASE_URL if you are in another network
// in future change the BASE_URL to the backend hosting url
const BASE_URL = "http://192.168.178.35:8080/ingeapp/api/v1";

/**
 * ### decodeJWT
 * Function to decode JWT to extract user information
 *
 * @param {string} token
 * @returns {object|null}
 * @dependencies atob
 */
export const decodeJWT = (token) => {
    try {
        // Extract the payload from the JWT token
        const base64Url = token.split('.')[1];
        // Replace characters for decoding
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        // Decode base64 and decode URI
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        // Parse the JSON payload and return
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error("Fehler beim Dekodieren des JWT", e);
        return null;
    }
};

/**
 * ### loginService
 * Authentication method to log in the user
 *
 * @param {string} username - User's username.
 * @param {string} password - User's password.
 * @returns {Promise<String>} JWT Token upon successful authentication.
 * @throws {Error} If authentication fails or a network error occurs.
 * @dependencies axios, BASE_URL
 */
export const loginService = async (username, password) => {
    try {
        // Send authentication request to the backend
        const response = await axios.post(`${BASE_URL}/auth/authenticate`, {
            username: username,
            password: password
        });
        //console.log("JWT Token: ", response.data.token);

        // Return the JWT token from the response
        return response.data.token;
    } catch (err){
        if (axios.isAxiosError(err)) {
            // Handle axios errors
            const status = err.response?.status;
            if (status === 401) {
                throw new Error("Benutzername oder Passwort falsch."); //currently not used as no 401 error present
            } else if (status === 403) {
                throw new Error("Benutzername oder Passwort falsch!");
            } else {
                throw new Error("Ein unerwarteter Fehler ist aufgetreten.");
            }
        } else {
            throw new Error("Ein Netzwerkfehler ist aufgetreten.");
        }
    }
};

/**
 * ### getUserData
 * Method to get user data from the backend
 *
 * @param uid - User ID.
 * @param token - JWT Token for authentication
 * @returns {Promise<Object>} - User data
 * @throws {Error} If there's an error fetching user data
 * @dependencies axios, BASE_URL
 */
export const getUserData = async (uid, token) => {
    try {
        // Send request to fetch user data
        const response = await axios.get(`${BASE_URL}/user/getUserData/${uid}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        //console.log("UserData: ", response.data)

        // Return the user data from the response
        return response.data;
    } catch (err) {
        console.error("Fehler beim Abrufen der Benutzerdaten: ", err);
    }
}

/**
 * ### getICalUrl
 * Method to get the iCal URL for the user
 *
 * @param uid - User ID
 * @param token - JWT token for the authentication
 * @returns {Promise<String>} iCal URL
 * @throws {Error} If there's an error fetching the iCal URL.
 * @dependencies axios, BASE_URL
 */
export const getICalUrl = async (uid, token) => {
    try {
        // Send request to fetch iCal URL
        const response = await axios.get(`${BASE_URL}/user/getIcalUrl/${uid}/0`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        //console.log("iCalUrl: ", response.data)

        // Return the iCal URL from the response
        return response.data;
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            // Access to the HTTP status code
            const statusCode = err.response.status;
            //console.log(`Fehler beim Abrufen der iCal URL: ${statusCode}`);

            // Handle errors while fetching iCal URL
            switch (statusCode) {
                case 404:
                    console.log("Die iCal URL wurde nicht gefunden.");
                    break;
                case 403:
                    console.log("Zugriff auf die iCal URL verweigert.");
                    break;
                default:
                    console.log("Ein unerwarteter Fehler ist aufgetreten beim Abrufen der iCal URL.");
            }
        } else {
            console.log("Ein Netzwerkfehler ist aufgetreten.");
        }
        throw err;
    }
};

/**
 * ### getICal Data
 * Method to get the iCal data for user.
 *
 * // actually not in use - needed in CalendarContext --> loadCalendarData
 * // if we want load iCal data from the backend
 *
 * @param uid - User ID.
 * @param token - JWT token for authentication.
 * @returns {Promise<any>} - iCal data
 * @throws {Error} If there's an error fetching the iCal data.
 * @dependencies axios, BASE_URL
 */
export const getICalData = async (uid, token) => {
    try {
        // Send request to fetch iCal data
        const response = await axios.get(`${BASE_URL}/user/getIcalData/${uid}/0`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("iCalData: ", response.data)

        // Return the iCal data from the response
        return response.data;
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            // Zugriff auf den HTTP-Statuscode
            const statusCode = err.response.status;
            //console.error(`Fehler beim Abrufen der iCal Daten: ${statusCode}`);
            switch (statusCode) {
                case 404:
                    console.error("Die iCal Daten wurden nicht gefunden.");
                    break;
                case 403:
                    console.error("Zugriff auf die iCal Daten verweigert.");
                    break;
                default:
                    console.error("Ein unerwarteter Fehler ist aufgetreten beim Abrufen der iCal Daten.");
            }
        } else {
            console.error("Ein Netzwerkfehler ist aufgetreten.");
        }
        throw err;
    }
};