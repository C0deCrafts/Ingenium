import {createContext, useContext, useEffect, useState} from "react";
import {useAuth} from "./AuthContext";
import {getIcalData, getIcalUrl} from "../api/backendServices";
import {extractCourses, parseIcalData} from "../utils/utils";

const CalendarContext = createContext({});

export const useCalendar = () => useContext(CalendarContext);

export const CalendarProvider = ({children}) => {
    const [icalUrl, setIcalUrl] = useState(null);
    const [icalData, setIcalData] = useState(null);
    const [courses, setCourses] = useState([]);
    const {token, userId} = useAuth();

    //Test DATA
    const icalTestUrl = 'https://ilias.ingenium.co.at/calendar.php?client_id=ingenium&token=af68c563718004ae8395de22074658f3';

    const getCourseNameByNumber = (crsNummer) => {
        switch (crsNummer) {
            case "147613": return "Computerpraktikum";
            case "147617": return "Digitale Ethik";
            case "147619": return "Programmieren";
            case "147621": return "Systemplanung";
            case "147625": return "Technische Informatik";
            case "147627": return "Wirtschaft und Recht";
            case "147629": return "Netzwerktechnik";
            case "147631": return "Mathematik";
            case "153647": return "Englisch";
            case "154021": return "Artificial Intelligence";
            case "154063": return "Webprogrammierung";
            case "155753": return "Deutsch";
            case "156163": return "Datenbanken";
            default: return "Unbekannter Kurs";
        }
    };

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
            const courseData = extractCourses(parsedData);

            // Sortieren der Kurse nach `crsNummer`
            const sortedCourses = courseData.sort((a, b) => a.crsNummer.localeCompare(b.crsNummer));

            //Anzeige untereinander nur für log
            const showCourses = sortedCourses.map(course => JSON.stringify(course)).join("\n");
            //console.log("Kurse: ", showCourses);

            //console.log("Sorted Kurse: ", sortedCourses);
            setCourses(sortedCourses);
            //console.log("TEST ICAL: ", parsedData)
            //console.log("PARSED DATA",parsedData)
            setIcalData(parsedData);
        } catch (error) {
            console.error('Fehler beim Laden der iCal-Daten:', error);
        }
    };

    useEffect(() => {
        loadIcalTestUrl();
    }, [token, userId])

    return (
        <CalendarContext.Provider value={{icalUrl, icalData, getCourseNameByNumber}}>
            {children}
        </CalendarContext.Provider>
    );
}