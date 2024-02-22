import {NavigationContainer} from "@react-navigation/native";
import {navigationRef, TabProvider} from "./context/TabContext";
import {StatusBar} from "react-native";
import DrawerNavigation from "./drawer/DrawerNavigation";
import RootNavigator from "./LoginNavigation";
import {useState} from "react";
import LoginNavigation from "./LoginNavigation";

function AppNavigation() {
    // Hier kann die Logik für die Überprüfung des Benutzer-Login-Status eingefügt werden
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    return(
        <TabProvider>
            <NavigationContainer ref={navigationRef}>
                <StatusBar barStyle="dark-content" />
                {userLoggedIn ? <DrawerNavigation /> : <LoginNavigation/>}
            </NavigationContainer>
        </TabProvider>
    )
}

export default AppNavigation;