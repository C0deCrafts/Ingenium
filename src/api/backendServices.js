import axios from "axios";

// Basis-URL des Backends
const BASE_URL = "https://33a353aa6321322373de641aee502563.serveo.net/ingeapp/api/v1";

// JWT dekodieren, um Benutzerinformationen zu extrahieren
export const decodeJWT = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

// Authentifizierungsmethode
export const loginService = async (username, password) => {
    console.log("Login Service gestartet...")
    try {
        console.log("Response gestartet...")
        const response = await axios.post(`${BASE_URL}/auth/authenticate`, {
            username: username,
            password: password
        });
        console.log("LoginService: TOKEN - ", response);
        return response.data;
    } catch (err){
        console.error("Voller Fehler: ", err);
        if (err.response) {
            // Der Server hat mit einem Statuscode geantwortet, der außerhalb des Bereichs von 2xx liegt
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
        } else if (err.request) {
            // Die Anfrage wurde gemacht, aber keine Antwort wurde empfangen
            console.log(err.request);
        } else {
            // Etwas anderes hat den Fehler ausgelöst
            console.log('Error', err.message);
        }
        console.log(err.config);
    }
};
