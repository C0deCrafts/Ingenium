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
import {DatabaseProvider} from "../context/DatabaseContext";
import {LocationProvider} from "../context/LocationContext";
import {CalendarProvider} from "../context/CalendarContext";

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


    /*useEffect(() => {
//Hilfsfunktion um die Routen zu ermitteln
    const unsubscribe = navigationRef.addListener("state", () => {
        console.log("Neuer Navigationszustand: ", navigationRef.getCurrentRoute());
        console.log("------------------------------------------------------------------")
        console.log("Komplette Routeninformation: ", navigationRef.getRootState());
        console.log("==================================================================")
    });

    return () => unsubscribe();
}, []);*/

    // Statusbar-Stil basierend auf dem aktuellen Thema einstellen
    const statusBarStyle = theme === LIGHTMODE ? 'dark-content' : 'light-content';

    if (!initialized) {
        // Ladebildschirm anzeigen, während die Authentifizierungsprüfung läuft
        return (
            <LoadingComponent message={"Initialisierung läuft..."}/>
        );
    }

    return(
        <NavigationContainer ref={navigationRef}>
            <StatusBar barStyle={statusBarStyle}/>
            {
                //Nur initialisieren, wenn Benutzer authentifiziert ist
                isAuthenticated ? (
                    <DatabaseProvider>
                        <LocationProvider>
                            <CalendarProvider>
                                <DrawerNavigation />
                            </CalendarProvider>
                        </LocationProvider>
                    </DatabaseProvider>
                ) : (
                    <LoginNavigation />
                )
            }
        </NavigationContainer>
    )
}

export default AppNavigation;