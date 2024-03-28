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

/*
// NICHT GEFILTERT - ALLE KURSE INKL NUMMERN WERDEN ANGEZEIGT
export const extractCourses = (courses) => {
    return courses.map(course => {
        const url = course.url?.value || "";
        const crsMatch = url.match(/crs_(\d+)/);
        const crsNummer = crsMatch ? crsMatch[1] : 'Unbekannt';
        const kursName = course.summary?.value || 'Unbekannter Kurs';

        return { crsNummer, kursName };
    })
}
*/
