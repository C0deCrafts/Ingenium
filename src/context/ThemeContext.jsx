import { createContext, useContext, useState } from 'react';
import { LIGHTMODE, DARKMODE } from '../constants/styleSettings';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(LIGHTMODE); // App Start - Default - Light Mode

    const toggleTheme = () => {
        setTheme(theme === LIGHTMODE ? DARKMODE : LIGHTMODE);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
