import {createContext, useContext, useEffect, useState} from "react";
import {decodeJWT, getUserData, loginService} from "../api/backendServices";
import {getItem, removeItem, saveItem} from "../storages/secureStorage";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(null);
    const [initialized, setInitialized] = useState(false);
    const [userDetails, setUserDetails] = useState({});
    const [userData, setUserData] = useState(null);
    const [loginError, setLoginError] = useState(null); // Neuer Zustand für Fehlermeldungen


    const [user, setUser] = useState(null);

    // Berechnet, wie lange der Token noch gültig ist (in Minuten)
    const calculateTokenValidity = (decodedToken) => {
        const currentTime = Date.now() / 1000; // Aktuelle Zeit in Sekunden
        const expTime = decodedToken.exp; // Ablaufzeit des Tokens in Sekunden
        const timeLeft = expTime - currentTime; // Verbleibende Zeit in Sekunden
        return timeLeft / 60; // Umrechnen in Minuten
    };

    useEffect(() => {
        const initializeAuth = async () => {
            const storedToken = await getItem("userToken");
            if(storedToken){
                console.log("Token aus Secure Storage: ", storedToken);
                const decoded = decodeJWT(storedToken);
                const validityDuration = calculateTokenValidity(decoded);

                if(validityDuration > 0){
                    console.log(`Token ist noch ${validityDuration.toFixed(2)} Minuten gültig.`);
                    setToken(storedToken);
                    setUserDetails({uid: decoded.uid });
                    setInitialized(true);
                } else {
                    console.log("Token abgelaufen oder ungültig. Nutzer wird ausgelogget");
                    await logout();
                }
            } else {
                console.log("Secure Storage Fehler - kein Token gefunden")
            }
        };
        initializeAuth();
    }, []);

    const login = async (username, password) => {
        try {
            const newToken = await loginService(username, password);
            if(newToken){
                const decodes = decodeJWT(newToken);
                setUserDetails({uid: decodes.uid});
                setToken(newToken);

                //secure storage
                await saveItem("userToken", newToken);
                //await saveItem("userId", decodes.uid.toString())
                //console.log("User Details: ", userDetails)
                setInitialized(true);
                setLoginError(null);
                console.log("Login Methode, TOKEN: ", newToken);
            }
        } catch (err) {
            setLoginError(err.message);
            console.error("Login fehlgeschlagen: ", err);
            setInitialized(false);
        }
    }

    const logout = async () => {
        await removeItem("userToken");
        await removeItem("userId");
        setToken(null);
        setUserDetails({});
        setInitialized(false);
        console.log("Ausgeloggt und Daten bereinigt");
    }

    const getUserDetails = async () => {
        if (token && userDetails.uid) {
            try {
                const data = await getUserData(userDetails.uid, token);
                setUserData(data); // Speichern der Benutzerdaten im Zustand
                console.log("GET USER DETAILS: ", data)
            } catch (error) {
                console.error("Fehler beim Laden der Benutzerdetails: ", error);
            }
        }
    };

    useEffect(() => {
        getUserDetails(); // Benutzerdaten laden, wenn Token und UID verfügbar sind
    }, [token, userDetails.uid]);


    return <AuthContext.Provider value={{initialized, user, userData, login, logout, loginError}}>{children}</AuthContext.Provider>
}