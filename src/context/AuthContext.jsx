import {createContext, useContext, useEffect, useState} from "react";
import {decodeJWT, loginService} from "../api/backendServices";
import {getItem, removeItem, saveItem} from "../storages/secureStorage";


const userToken = "user-token";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(null);
    const [initialized, setInitialized] = useState(false);
    const [userDetails, setUserDetails] = useState({});


    const [user, setUser] = useState(null);


    useEffect(() => {
        const initializeAuth = async () => {
            const storedToken = await getItem("userToken");
            if(storedToken){
                console.log("Token aus Secure Storage: ", storedToken);
                const decoded = decodeJWT(storedToken);
                if(decoded && decoded.exp * 1000 > Date.now()){
                    setToken(storedToken);
                    setUserDetails({uid: decoded.uid });
                    setInitialized(true);
                } else {
                    console.log("Token abgelaufen oder ungültig");
                    await logout();
                }
            } else {
                console.log("Secure Storage Fehler - kein Token")
            }
            // try to get stored token
            // if stored token == true
            // setToken
            // ?? axios.defaults.header.common["Authorization"]="Bearer &{stored token}"; ??
            // after if --> setInitialized = true
        };
        initializeAuth();
    }, []);

    const login = async (username, password) => {
        try {
            const newToken = await loginService(username, password);
            if(newToken){
                setToken(newToken);
                const decodes = decodeJWT(newToken);
                setUserDetails({uid: decodes.uid});

                //secure storage
                await saveItem("userToken", newToken);
                await saveItem("userId", decodes.uid.toString())
                console.log("User Details: ", userDetails)

                setInitialized(true);
                console.log("Login Methode, TOKEN: ", newToken);
            } else {
                // zu Fehlerscreen wechseln
                console.error("Login fehlgeschlagen: Kein Token erhalten.");
                setInitialized(false);
            }

        } catch (err) {
            console.error("Login fehlgeschlagen: ", err.response ? err.response.data : err);
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

    return <AuthContext.Provider value={{initialized, user, login, logout}}>{children}</AuthContext.Provider>
}