import {createContext, useContext, useEffect, useState} from 'react';
import { LIGHTMODE, DARKMODE } from '../constants/styleSettings';
import {loadThemeMode, saveThemeMode} from "../storages/asyncStorage";
//import {ActivityIndicator, View} from "react-native";

const ThemeContext = createContext({});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(LIGHTMODE);
    //const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadTheme = async () => {
            const storedThemeMode = await loadThemeMode();
            if(storedThemeMode !== null){
                if(storedThemeMode === "Darkmode")
                {
                    setTheme(DARKMODE);
                }else {
                    setTheme(LIGHTMODE);
                }
            }
            //setIsLoading(false);
        };
        loadTheme();
    }, []);

    //Beobachten, möglicherweise wird das nicht benötigt
    //Achtung eigene Komponente funktioniert nicht, da diese bereits auf useTheme zugreift
    /*if (isLoading) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
        </View>;
    }*/

    const setSpecificTheme = async (newTheme) => {
        setTheme(newTheme);
            if(newTheme === DARKMODE)
            {
                await saveThemeMode("Darkmode");
            }else {
                await saveThemeMode("Lightmode");
            }
        };

    return (
        <ThemeContext.Provider value={{ theme, setSpecificTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
