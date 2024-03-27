import axios from "axios";
import { decode as atob } from 'base-64';

// Basis-URL des Backends
const BASE_URL = "http://192.168.178.33:8080/ingeapp/api/v1";

// JWT dekodieren, um Benutzerinformationen zu extrahieren
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


// Authentifizierungsmethode
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
        console.error("Fehler im LoginService: ", err);
    }
};
