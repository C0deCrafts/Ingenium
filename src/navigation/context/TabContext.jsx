import { createContext, useContext, useState, useEffect } from 'react';
import { createNavigationContainerRef } from '@react-navigation/native';

export const TabContext = createContext();

export const useTabContext = () => useContext(TabContext);

export const navigationRef = createNavigationContainerRef();

export const TabProvider = ({ children }) => {
    const [currentRoute, setCurrentRoute] = useState("Dashboard_Tab");
    //setze prob ob das DrawerMenü aufgeht oder nicht!! (wird in DrawerNav verwendet)
    const [drawerEnabled, setDrawerEnabled] = useState(true);
    const [notificationCount, setNotificationCount] = useState(10);

    const [forceColorChange, setForceColorChange] = useState(false);
    /*useEffect(() => {
    // Logik hinzufügen, um die Mitteilungen zu empfangen und zu zählen
    // Zum Beispiel könnte das Abhören von Push-Benachrichtigungen hier integriert werden.
    }, []);*/

    const navigateAndSetSelectedTab = (routeName, stackName) => {
        console.log(`navigateAndSetSelectedTab aufgerufen mit routeName: ${routeName} und stackName: ${stackName}`);

        // Aktuellen Routennamen setzen
        console.log(`Aktualisiere Route auf: ${routeName}`);

        //NotTab oder TaskTab
        setCurrentRoute(routeName);
        console.log(`Aktuelle Route gesetzt auf: ${routeName}`);

        if (!navigationRef.isReady()) {
            console.log("Navigation ist nicht bereit. Bitte warten...");
            return;
        }

        // Navigation zum TaskMain und dann Push zum Inbox Screen
        if (routeName === 'Notification_Tab') {
            console.log("Navigiere zum TaskMain und dann zum Inbox Screen");
            navigationRef.reset({
                index: 0,
                routes: [{ name: stackName, params: { screen: stackName } }],
            });
        } else if (stackName) {
            console.log(`Reset Stack zu: ${stackName}`);
            navigationRef.reset({
                index: 0,
                routes: [{ name: stackName, params: { screen: routeName } }],
            });
        } else {
            console.log(`Navigiere ohne Stack zu: ${routeName}`);
            navigationRef.navigate(routeName);
        }
    };

    return (
        <TabContext.Provider value={{currentRoute, navigateAndSetSelectedTab, drawerEnabled, setDrawerEnabled, notificationCount, setNotificationCount, forceColorChange, setForceColorChange}}>
            {children}
        </TabContext.Provider>
    );
};
