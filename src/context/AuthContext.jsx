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
    const [loginError, setLoginError] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userData, setUserData] = useState(null);

    // Function to calculate remaining token validity
    const calculateTokenValidity = (decodedToken) => {
        const currentTime = Date.now() / 1000; // Current time in seconds
        const expTime = decodedToken.exp; // Token expiry time in seconds
        const timeLeft = expTime - currentTime; // Remaining time in seconds
        return timeLeft / 60; // Convert to minutes
    };

    const initializeAuth = async () => {
        const storedToken = await getItem("userToken"); // Retrieve token from storage
        if(storedToken){
            console.log("Token aus Secure Storage: ", storedToken);
            const decoded = decodeJWT(storedToken); // Decode token
            const validityDuration = calculateTokenValidity(decoded); // Calculate token validity

            if(validityDuration > 0){
                console.log(`Token ist noch ${validityDuration.toFixed(2)} Minuten gültig.`);
                // If token is valid
                setToken(storedToken);
                setAuthStatus({initialized: true, isAuthenticated: true});
                setUserId(decoded.uid);
            } else {
                // If token is expired or invalid
                console.log("Token abgelaufen oder ungültig. Nutzer wird ausgeloggt");
                await logout();
            }
        } else {
            // If no token is found in storage
            console.log("Secure Storage - kein Token gespeichert")
            setAuthStatus({initialized: true, isAuthenticated: false});
        }
    };

    useEffect(() => {
        initializeAuth();
    }, []);

    // Function to handle user login
    const login = async (username, password) => {
        try {
            const newToken = await loginService(username, password);
            // Successful login, set token and auth status
            const decoded = decodeJWT(newToken);
            setUserId(decoded.uid);
            setToken(newToken);
            // Save token securely
            await saveItem("userToken", newToken);
            // Update auth status
            setAuthStatus({ initialized: true, isAuthenticated: true });
            setLoginError(null); // Reset any error messages
        } catch (err) {
            console.log("Fehler beim Login:", err);
            setLoginError(err.message);
            setAuthStatus({ initialized: true, isAuthenticated: false });
            throw new err;
        }
    };

    // Function to handle user logout
    const logout = async () => {
        await removeItem("userToken");
        setToken(null);
        setUserId(null);
        setUserData(null);
        setAuthStatus({ initialized: true, isAuthenticated: false });
        console.log("Ausgeloggt und Daten bereinigt");
    }

    // Function to get on object with user details ->
    // {"accountIsNotLocked": value, "firstname": value, "lastname": value, "title": value, "userID": value}
    const getUserDetails = async () => {
        //console.log("USER ID: ", userId)
        if (token && userId) {
            try {
                const data = await getUserData(userId, token);
                setUserData(data); // Speichern der Benutzerdaten im Zustand
                //console.log("GET USER DETAILS: ", data)
            } catch (error) {
                console.log("Fehler beim Laden der Benutzerdetails: ", error);
            }
        }
    };

    useEffect(() => {
        getUserDetails(); // Load userData, if token and uid are available
    }, [token, userId]);

    return <AuthContext.Provider value={{...authStatus, token, userId, userData, login, logout, loginError}}>{children}</AuthContext.Provider>
}