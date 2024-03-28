import {createContext, useContext, useEffect, useState} from "react";
import {decodeJWT, getUserData, loginService} from "../api/backendServices";
import {getItem, removeItem, saveItem} from "../storages/secureStorage";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(null);
    const [authStatus, setAuthStatus] = useState({
        initialized: false,
        isAuthenticated: false,
    });

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
                    setAuthStatus({initialized: true, isAuthenticated: true});
                } else {
                    console.log("Token abgelaufen oder ungültig. Nutzer wird ausgelogget");
                    await logout();
                }
            } else {
                console.log("Secure Storage - kein Token gespeichert")
                setAuthStatus({initialized: true, isAuthenticated: false});
            }
        };
        initializeAuth();
    }, []);

    const login = async (username, password) => {
        try {
            const newToken = await loginService(username, password);
            // Erfolgreicher Login, setze Token und auth Status
            const decodes = decodeJWT(newToken);
            setUserDetails({ uid: decodes.uid });
            setToken(newToken);
            // Speichere Token sicher
            await saveItem("userToken", newToken);
            // Aktualisiere AuthStatus
            setAuthStatus({ initialized: true, isAuthenticated: true });
            setLoginError(null); // Zurücksetzen von etwaigen Fehlermeldungen
        } catch (err) {
            console.log("Fehler beim Login:", err);
            setLoginError(err.message);
            setAuthStatus({ initialized: true, isAuthenticated: false });
            throw new err;
        }
    };


    const logout = async () => {
        await removeItem("userToken");
        await removeItem("userId");
        setToken(null);
        setUserDetails({});
        setAuthStatus({ initialized: true, isAuthenticated: false });
        console.log("Ausgeloggt und Daten bereinigt");
    }

    const getUserDetails = async () => {
        if (token && userDetails.uid) {
            try {
                const data = await getUserData(userDetails.uid, token);
                setUserData(data); // Speichern der Benutzerdaten im Zustand
                console.log("GET USER DETAILS: ", data)
            } catch (error) {
                console.log("Fehler beim Laden der Benutzerdetails: ", error);
            }
        }
    };

    useEffect(() => {
        getUserDetails(); // Benutzerdaten laden, wenn Token und UID verfügbar sind
    }, [token, userDetails.uid]);


    return <AuthContext.Provider value={{...authStatus, token, user, userData, userDetails, login, logout, loginError}}>{children}</AuthContext.Provider>
}