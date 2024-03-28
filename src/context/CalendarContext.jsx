import {createContext, useContext, useEffect, useState} from "react";
import {useAuth} from "./AuthContext";
import {getIcalData, getIcalUrl} from "../api/backendServices";

const CalendarContext = createContext({});

export const useCalendar = () => useContext(CalendarContext);

export const CalendarProvider = ({children}) => {
    const [icalUrl, setIcalUrl] = useState(null);
    const [icalData, setIcalData] = useState(null);
    const {token, userId} = useAuth();

    useEffect(() => {
        const loadCalendarData = async () => {
            if(token && userId){
                try {
                    const url = await getIcalUrl(userId, token);
                    setIcalUrl(url);
                    console.log("URL: ", url)
                    const data = await getIcalData(userId, token);
                    setIcalData(data);
                    console.log("DATA: ", data)
                } catch (err) {
                    console.log("Fehler beim Laden der Kalenderdaten: ", err);
                }
            }
        }
        loadCalendarData();
    }, [token, userId]);

    return (
        <CalendarContext.Provider value={{icalUrl, icalData}}>
            {children}
        </CalendarContext.Provider>
    );
}