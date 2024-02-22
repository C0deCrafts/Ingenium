import React, { createContext, useContext, useState } from 'react';
import { createNavigationContainerRef } from '@react-navigation/native';

export const TabContext = createContext();

export const useTabContext = () => useContext(TabContext);

export const navigationRef = createNavigationContainerRef();

export const TabProvider = ({ children }) => {
    const [currentRoute, setCurrentRoute] = useState();

    const navigateAndSetSelectedTab = (routeName) => {
        setCurrentRoute(routeName); // Allgemeiner Zustand für aktuelle Route
        if (navigationRef.isReady()) {
            navigationRef.navigate(routeName);
        }
    };

    return (
        <TabContext.Provider value={{ currentRoute, navigateAndSetSelectedTab }}>
            {children}
        </TabContext.Provider>
    );
};
