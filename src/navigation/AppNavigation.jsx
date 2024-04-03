import {NavigationContainer} from "@react-navigation/native";
import {navigationRef, TabProvider} from "./context/TabContext";
import {StatusBar} from "react-native";
import DrawerNavigation from "./drawer/DrawerNavigation";
import LoginNavigation from "./LoginNavigation";
import {LIGHTMODE} from "../constants/styleSettings";
import { useTheme } from "../context/ThemeContext";
import {useAuth} from "../context/AuthContext";
import {useEffect, useState} from "react";
import LoadingComponent from "../components/LoadingComponent";

function AppNavigation() {
    const {initialized, isAuthenticated} = useAuth();
    //Darkmode - Lightmode
    const { theme } = useTheme();
    //Ladezustand
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (initialized){
            setLoading(false)
        }
    }, [initialized]);

    // Statusbar-Stil basierend auf dem aktuellen Thema einstellen
    const statusBarStyle = theme === LIGHTMODE ? 'dark-content' : 'light-content';

    if (loading || !initialized) {
        // Ladebildschirm anzeigen, während die Authentifizierungsprüfung läuft
        return (
            <LoadingComponent message={"Laden..."}/>
        );
    }

    return(
            <TabProvider>
                <NavigationContainer ref={navigationRef}>
                    <StatusBar barStyle={statusBarStyle} />
                    {isAuthenticated ? <DrawerNavigation /> : <LoginNavigation/>}
                </NavigationContainer>
            </TabProvider>
    )
}

export default AppNavigation;