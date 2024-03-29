import ical from "cal-parser";

export const parseIcalData = (input) => {
    // Prüft, ob das übergebene Argument ein Objekt ist und den erforderlichen Schlüssel enthält
    const icalFormat = input && typeof input === 'object' ? input.dataIcalFormatted : input;

    if(!icalFormat) return [];

    try {
        const parsed = ical.parseString(icalFormat);
        //console.log("Parsed ical: ", parsed.events)
        return parsed.events;
    } catch (err) {
        console.error("Fehler beim Parsen der iCal-Daten: ", err)
        return [];
    }
}

export const filterAndSortCourses = (courses) => {
    //console.log("icalData vor Filterung: ", courses);
    const now = new Date();
    const filteredAndSortedCourses = courses
        .filter(course => new Date(course.dtstart.value) > now)
        .sort((a, b) => new Date(a.dtstart.value) - new Date(b.dtstart.value));
    //console.log("Curses filtered and sorted:", courses)
    return filteredAndSortedCourses;
};

// Funktion, die gefilterte und sortierte Kurse aktualisiert,
// indem sie den Kursnamen aus den einzigartigen Kursen zuordnet
export const updateCourseNames = (filteredAndSortedCourses, uniqueCourses) => {
    // Erstelle ein Mapping von Kursnummer zu Kursname
    const courseNameMapping = uniqueCourses.reduce((acc, course) => {
        acc[course.crsNummer] = course.kursName;
        return acc;
    }, {});

    // Aktualisiere `headerTitle` für jeden Kurs in `filteredAndSortedCourses` basierend auf dem Mapping
    return filteredAndSortedCourses.map(course => {
        const crsMatch = course.url?.value.match(/crs_(\d+)/);
        const crsNummer = crsMatch ? crsMatch[1] : 'Unbekannt';
        const kursName = courseNameMapping[crsNummer] || course.summary?.value;
        return {...course, summary: {...course.summary, value: kursName}};
    });
};

// GEFILTERT - ALLE KURSE INKL NUMMERN WERDEN NUR EINMAL ANGEZEIGT
export const extractCourses = (courses) => {
    const uniqueCourses = {};
    const uniqueAndSortedCourses = courses.map(course => {
        const url = course.url?.value || "";
        const crsMatch = url.match(/crs_(\d+)/);
        const crsNummer = crsMatch ? crsMatch[1] : 'Unbekannt';
        const kursName = course.summary?.value || 'Unbekannter Kurs';

        //console.log(crsNummer + ": " + kursName)

        return { crsNummer, kursName };
    }).filter(course => {
        // Prüfe, ob die `crsNummer` bereits im `uniqueCourses` Objekt vorhanden ist
        if (uniqueCourses[course.crsNummer]) {
            // Wenn ja, filtere dieses Element aus, da es bereits berücksichtigt wurde
            return false;
        }
        // Markiere die `crsNummer` als vorhanden
        uniqueCourses[course.crsNummer] = true;
        return true;
    }).sort((a, b) => a.crsNummer.localeCompare(b.crsNummer)); // Sortiere die Kurse nach `crsNummer`

    return uniqueAndSortedCourses;
};

// NICHT GEFILTERT - ALLE KURSE INKL NUMMERN WERDEN ANGEZEIGT
export const extractAllCourses = (courses) => {
    return courses.map(course => {
        const url = course.url?.value || "";
        const crsMatch = url.match(/crs_(\d+)/);
        const crsNummer = crsMatch ? crsMatch[1] : 'Unbekannt';
        const kursName = course.summary?.value || 'Unbekannter Kurs';

        return { crsNummer, kursName };
    })
};

export const getDay = (day) => {
    const days = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
    return days[day] || "";
};

export const formatLocalTime = (time) => {
    const date = new Date(time);
    return date.toISOString().substring(11, 16);
};

export const getCourseNameByNumber = (crsNummer) => {
    switch (crsNummer) {
        case "147609": return "Betriebswirtschaft"
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
