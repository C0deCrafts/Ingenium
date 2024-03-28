import {createContext, useContext, useEffect, useState} from "react";
import {useAuth} from "./AuthContext";
import {getIcalData, getIcalUrl} from "../api/backendServices";
import {parseIcalData} from "../utils/utils";

const CalendarContext = createContext({});

export const useCalendar = () => useContext(CalendarContext);

export const CalendarProvider = ({children}) => {
    const [icalUrl, setIcalUrl] = useState(null);
    const [icalData, setIcalData] = useState(null);
    const {token, userId} = useAuth();

    //Test DATA
    const icalTestUrl = 'https://ilias.ingenium.co.at/calendar.php?client_id=ingenium&token=af68c563718004ae8395de22074658f3';

    //original ical data from backend
    const loadCalendarData = async () => {
        if(token && userId){
            try {
                const url = await getIcalUrl(userId, token);
                setIcalUrl(url);
                //console.log("URL: ", url)
                const data = await getIcalData(userId, token);
                const parsedData = parseIcalData(data);
                setIcalData(parsedData);
                //console.log("DATA: ", parsedData);
            } catch (err) {
                console.log("Fehler beim Laden der Kalenderdaten: ", err);
            }
        }
    }

    //Test function with actual ical data
    const loadIcalTestUrl = async () => {
        try {
            const response = await fetch(icalTestUrl);
            if (!response.ok) {
                console.error('Fehler beim Herunterladen der iCal-Daten');
            }
            const testData = await response.text();
            const parsedData = parseIcalData(testData);
            //console.log("TEST ICAL: ", parsedData)
            setIcalData(parsedData);
        } catch (error) {
            console.error('Fehler beim Laden der iCal-Daten:', error);
        }
    };

    useEffect(() => {
        loadIcalTestUrl();
    }, [token, userId])

    return (
        <CalendarContext.Provider value={{icalUrl, icalData}}>
            {children}
        </CalendarContext.Provider>
    );
}