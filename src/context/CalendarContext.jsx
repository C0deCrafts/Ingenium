import {createContext, useContext, useEffect, useState} from "react";
import {useAuth} from "./AuthContext";
import {getIcalData, getIcalUrl} from "../api/backendServices";

const CalendarContext = createContext({});

export const useCalendar = () => useContext(CalendarContext);

export const CalendarProvider = ({children}) => {
    const [icalUrl, setIcalUrl] = useState(null);
    const [icalData, setIcalData] = useState(null);
    const {token, userData} = useAuth();

    useEffect(() => {
        const loadCalendarData = async () => {
            if(token && userData?.userID){
                try {
                    const url = await getIcalUrl(userData?.userID, token);
                    setIcalUrl(url);
                    console.log("URL: ", url)
                    const data = await getIcalData(userData?.userID, token);
                    setIcalData(data);
                    console.log("DATA: ", data)
                } catch (err) {
                    console.log("Fehler beim Laden der Kalenderdaten: ", err);
                }
            }
        }
        loadCalendarData();
    }, [token, userData?.userID]);

    return (
        <CalendarContext.Provider value={{icalUrl, icalData}}>
            {children}
        </CalendarContext.Provider>
    );
}