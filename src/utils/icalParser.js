import ical from "cal-parser";

export const parseIcalData = (input) => {
    // Prüft, ob das übergebene Argument ein Objekt ist und den erforderlichen Schlüssel enthält
    const icalFormat = input && typeof input === 'object' ? input.dataIcalFormatted : input;

    if(!icalFormat) return [];

    try {
        const parsed = ical.parseString(icalFormat);
        console.log("Parsed ical: ", parsed.events)
        return parsed.events;
    } catch (err) {
        console.error("Fehler beim Parsen der iCal-Daten: ", err)
        return [];
    }
}

export const filterAndSortCourses = (courses) => {
    console.log("icalData vor Filterung: ", courses);
    const now = new Date();
    const filteredAndSortedCourses = courses
        .filter(course => new Date(course.dtstart.value) > now)
        .sort((a, b) => new Date(a.dtstart.value) - new Date(b.dtstart.value));
    console.log("Curses filtered and sorted:", courses)
    return filteredAndSortedCourses;
};
