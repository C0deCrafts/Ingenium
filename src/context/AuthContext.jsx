import {createContext, useContext, useEffect, useState} from "react";
import {loginService} from "../api/backendServices";
import axios from "axios";


const userToken = "user-token";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(null);
    const [initialized, setInitialized] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadToken = async () => {
            // try to get stored token
            // if stored token == true
            // setToken
            // ?? axios.defaults.header.common["Authorization"]="Bearer &{stored token}"; ??
            // after if --> setInitialized = true
        }
    }, []);

    const login = async (userName, password) => {
        try {
            const data = await loginService(userName, password);
            //console.log("Login Methode, TOKEN: ", data);
        } catch (err) {
            console.error("Login fehlgeschlagen: ", err.response ? err.response.data : err);
            setInitialized(false);
        }
    }

    const logout = async () => {
        //setToken(null);
        //await SecureStore.deleteItemAsync(key);
        //?? axios.defaults.header.common["Authorization"]=""; ??
        console.log("logout function from: AuthContext")
        setInitialized(false);
    }

    return <AuthContext.Provider value={{initialized, user, login, logout}}>{children}</AuthContext.Provider>
}