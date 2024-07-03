import {NavigationContainer} from "@react-navigation/native";
import {navigationRef} from "../context/NavContext";
import {StatusBar} from "react-native";
import DrawerNavigation from "./drawer/DrawerNavigation";
import LoginNavigation from "./LoginNavigation";
import {LIGHTMODE} from "../constants/styleSettings";
import {useTheme} from "../context/ThemeContext";
import {useAuth} from "../context/AuthContext";
import {useEffect, useState} from "react";
import LoadingComponent from "../components/LoadingComponent";
import {DatabaseProvider} from "../context/DatabaseContext";
import {LocationProvider} from "../context/LocationContext";
import {CalendarProvider} from "../context/CalendarContext";
import {TaskProvider} from "../context/TaskContext";

function AppNavigation() {
    const {initialized, isAuthenticated} = useAuth();
    // Dark mode - Light mode
    const {theme} = useTheme();
    // Loading state
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (initialized) {
            setLoading(false)
        }
    }, [initialized]);

    // Set status bar style based on the current theme
    const statusBarStyle = theme === LIGHTMODE ? 'dark-content' : 'light-content';

    if (loading) {
        // Show loading screen while authentication check is running
        // Prevents landing on the login screen first - looks nicer this way
        // Could be replaced by a splash screen
        return (
            <LoadingComponent message={"Initialisierung läuft..."}/>
        );
    }

    return(
        <NavigationContainer ref={navigationRef}>
            <StatusBar barStyle={statusBarStyle}/>
            {
                // Only initialize if user is authenticated
                isAuthenticated ? (
                    <DatabaseProvider>
                        <LocationProvider>
                            <CalendarProvider>
                                <TaskProvider>
                                    <DrawerNavigation/>
                                </TaskProvider>
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