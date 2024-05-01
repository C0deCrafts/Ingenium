import {createContext, useContext, useEffect, useState} from "react";
import {useAuth} from "./AuthContext";
import {getICalData, getICalUrl} from "../api/backendServices";
import {extractCourses, parseICalData, getCourseNameByNumber} from "../utils/utils";

const CalendarContext = createContext({});

export const useCalendar = () => useContext(CalendarContext);

export const CalendarProvider = ({children}) => {
    const [iCalUrl, setICalUrl] = useState(null);
    const [iCalData, setICalData] = useState(null);
    const {token, userId} = useAuth(); // Access authentication context

    // Test URL for iCal data
    const iCalTestUrl = 'https://ilias.ingenium.co.at/calendar.php?client_id=ingenium&token=af68c563718004ae8395de22074658f3';

    // Function to load iCal data from the backend
    const loadCalendarData = async () => {
        if(token && userId){
            try {
                const url = await getICalUrl(userId, token);
                setICalUrl(url);
                //console.log("URL: ", url)
                const data = await getICalData(userId, token);
                const parsedData = parseICalData(data);
                setICalData(parsedData);
                //console.log("DATA: ", parsedData);
            } catch (err) {
                console.log("Fehler beim Laden der Kalenderdaten: ", err);
            }
        }
    }

    // Test function to load iCal test data
    const loadICalTestUrl = async () => {
        try {
            // Fetch iCal test data
            const response = await fetch(iCalTestUrl);
            if (!response.ok) {
                console.error('Fehler beim Herunterladen der iCal-Daten');
            }
            const testData = await response.text();
            const parsedData = parseICalData(testData); // Parse iCal test data
            const courseData = extractCourses(parsedData); // Extract courses from parsed data
            const sortedCourses = courseData.sort((a, b) => a.crsNummer.localeCompare(b.crsNummer)); // Sort courses by course number

            // Displaying the sorted courses one below the other -> only for logging for better readability.
            const showCourses = sortedCourses.map(course => JSON.stringify(course)).join("\n");
            setICalData(parsedData); // Set parsed iCal data in state
            setICalUrl(iCalTestUrl);
        } catch (error) {
            console.error('Fehler beim Laden der iCal-Daten:', error);
        }
    };

    // Load iCal test data when token or user ID changes
    useEffect(() => {
        loadICalTestUrl();
        //loadCalendarData();
    }, [token, userId])

    return (
        <CalendarContext.Provider value={{iCalUrl, iCalData, getCourseNameByNumber}}>
            {children}
        </CalendarContext.Provider>
    );
}