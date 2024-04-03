import axios from "axios";
import { decode as atob } from 'base-64';

// Base URL of the backend
const BASE_URL = "http://192.168.178.33:8080/ingeapp/api/v1";

// Function to decode JWT to extract user information
export const decodeJWT = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error("Fehler beim Dekodieren des JWT", e);
        return null;
    }
};
// Authentication method
export const loginService = async (username, password) => {
    //console.log("Login Service gestartet...")
    try {
        //console.log("Response gestartet...")
        const response = await axios.post(`${BASE_URL}/auth/authenticate`, {
            username: username,
            password: password
        });
        //console.log("LoginService:", response.data.token);
        return response.data.token;
    } catch (err){
        if (axios.isAxiosError(err)) {
            const status = err.response?.status;
            if (status === 401) {
                throw new Error("Benutzername oder Passwort falsch."); //aktuell nicht verwendet da kein 401 fehler vorhanden
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

// Method to get user data
export const getUserData = async (uid, token) => {
    try {
        const response = await axios.get(`${BASE_URL}/user/getUserData/${uid}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        //console.log("UserData: ", response.data)
        return response.data;
    } catch (err) {
        console.error("Fehler beim Abrufen der Benutzerdaten: ", err);
    }
}

// Method to get iCal URL
export const getIcalUrl = async (uid, token) => {
    try {
        const response = await axios.get(`${BASE_URL}/user/getIcalUrl/${uid}/0`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        //console.log("iCalUrl: ", response.data)
        return response.data;
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            // Zugriff auf den HTTP-Statuscode
            const statusCode = err.response.status;
            //console.log(`Fehler beim Abrufen der iCal URL: ${statusCode}`);
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

// Method to get iCal data
export const getIcalData = async (uid, token) => {
    try {
        const response = await axios.get(`${BASE_URL}/user/getIcalData/${uid}/0`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        //console.log("iCalData: ", response.data)
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