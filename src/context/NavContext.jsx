import { createContext, useContext, useState} from 'react';
import { createNavigationContainerRef } from '@react-navigation/native';

export const NavContext = createContext({});

export const useNavContext = () => useContext(NavContext);

export const navigationRef = createNavigationContainerRef();

export const NavProvider = ({ children }) => {
    // Save the current route to determine the selected drawer item and visually highlight it
    const [currentRoute, setCurrentRoute] = useState("Dashboard_Tab");
    // Set a flag to determine whether the drawer menu is open or closed (used in DrawerNav)
    const [drawerEnabled, setDrawerEnabled] = useState(true);
    // for counting the push notifications (default 0 - if you set a value you will see a badge in the Tab and inbox button)
    const [notificationCount, setNotificationCount] = useState(0);

    /*useEffect(() => {
    // Add logic to receive and count notifications
    // For example, listening for push notifications could be integrated here or in another context.
    }, []);*/

    const navigateAndSetSelectedTab = (routeName, stackName) => {
        //console.log(`navigateAndSetSelectedTab aufgerufen mit routeName: ${routeName} und stackName: ${stackName}`);
        setCurrentRoute(routeName);

        // Check if navigation is ready
        if (!navigationRef.isReady()) {
            //console.log("Navigation ist nicht bereit. Bitte warten...");

            // Note: Depending on the use case, this check may not be necessary. Consider removing if not needed.
            return;
        }
        // Navigate to TaskMain and then push to Inbox Screen if routeName is 'Notification_Tab'
        if (routeName === 'Notification_Tab') {
            //console.log("Navigiere zum TaskMain und dann zum Inbox Screen");
            navigationRef.reset({
                index: 0,
                routes: [{ name: stackName, params: { screen: stackName } }],
            });
        // Reset stack to stackName if stackName is provided
        } else if (stackName) {
            //console.log(`Reset Stack zu: ${stackName}`);
            navigationRef.reset({
                index: 0,
                routes: [{ name: stackName, params: { screen: routeName } }],
            });
        // Navigate without stack if stackName is not provided
        } else {
            //console.log(`Navigiere ohne Stack zu: ${routeName}`);
            navigationRef.navigate(routeName);
        }
    };

    return (
        <NavContext.Provider value={{currentRoute, navigateAndSetSelectedTab, drawerEnabled, setDrawerEnabled, notificationCount, setNotificationCount}}>
            {children}
        </NavContext.Provider>
    );
};
