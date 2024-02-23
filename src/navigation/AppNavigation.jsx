import {NavigationContainer} from "@react-navigation/native";
import {navigationRef, TabProvider} from "./context/TabContext";
import {StatusBar} from "react-native";
import DrawerNavigation from "./drawer/DrawerNavigation";
import {useState} from "react";
import LoginNavigation from "./LoginNavigation";
import {LIGHTMODE} from "../constants/styleSettings";
import { useTheme } from "../constants/context/ThemeContext";

function AppNavigation() {
    // Hier kann die Logik für die Überprüfung des Benutzer-Login-Status eingefügt werden
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    //Darkmode - Lightmode
    const { theme, toggleTheme } = useTheme();
    // Statusbar-Stil basierend auf dem aktuellen Thema einstellen
    const statusBarStyle = theme === LIGHTMODE ? 'dark-content' : 'light-content';


    return(
            <TabProvider>
                <NavigationContainer ref={navigationRef}>
                    <StatusBar barStyle={statusBarStyle} />
                    {userLoggedIn ? <DrawerNavigation /> : <LoginNavigation/>}
                </NavigationContainer>
            </TabProvider>
    )
}

export default AppNavigation;