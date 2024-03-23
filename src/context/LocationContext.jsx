import * as Location from "expo-location";
import { createContext, useContext, useEffect, useState } from "react";

const LocationContext = createContext();

export const useLocation = () => useContext(LocationContext);

/**
 * ### LocationProvider
 * This component manages the retrieval of the current device location and provides the location name to its descendants through the LocationContext.
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export const LocationProvider = ({ children }) => {
    // State to store the current location name
    const [locationName, setLocationName] = useState("");

    // Effect hook to retrieve and set the location name
    useEffect(() => {
        (async () => {
            // Request foreground location permissions
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Berechtigung verweigert');
                setLocationName('Berechtigung verweigert');
                return;
            }

            // Get the current device location
            let location = await Location.getCurrentPositionAsync({});

            // Reverse geocode the latitude and longitude to get location details
            let geocodes = await Location.reverseGeocodeAsync({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            });

            // Extract location name from the geocodes
            if (geocodes && geocodes.length > 0) {
                const [geocode] = geocodes;
                const name = geocode.city || geocode.region || 'Unbekannter Standort';
                console.log("Gefundener Standortname: ", name); // Log the found location name for test
                setLocationName(name);
            }
        })();
    }, []);

    return (
        <LocationContext.Provider value={locationName}>
            {children}
        </LocationContext.Provider>
    );
};
