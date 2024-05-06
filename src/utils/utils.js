import iCal from "cal-parser";

// Function to parse iCal data
export const parseICalData = (input) => {
    // Checks if the passed argument is an object and contains the required key
    const iCalFormat = input && typeof input === 'object' ? input.dataIcalFormatted : input;

    if(!iCalFormat) return [];

    try {
        // Parses the iCal string
        const parsed = iCal.parseString(iCalFormat);
        //console.log("Parsed iCal: ", parsed.events)
        return parsed.events;
    } catch (err) {
        console.error("Fehler beim Parsen der iCal-Daten: ", err)
        return [];
    }
}

// Function to filter and sort courses based on start time
export const filterAndSortCourses = (courses) => {
    //console.log("iCalData vor Filterung: ", courses);
    const now = new Date();
    // Filters courses that start after the current time and sorts them by start time
    const filteredAndSortedCourses = courses
        .filter(course => new Date(course.dtstart.value) > now)
        .sort((a, b) => new Date(a.dtstart.value) - new Date(b.dtstart.value));
    //console.log("Curses filtered and sorted:", courses)
    return filteredAndSortedCourses;
};

// Function to update course names based on course numbers
export const updateCourseNames = (filteredAndSortedCourses, uniqueCourses) => {
    // Creates a mapping of course number to course name
    const courseNameMapping = uniqueCourses.reduce((acc, course) => {
        acc[course.crsNummer] = course.kursName;
        return acc;
    }, {});

    // Updates `summary` for each course in `filteredAndSortedCourses` based on the mapping
    return filteredAndSortedCourses.map(course => {
        const crsMatch = course.url?.value.match(/crs_(\d+)/);
        const crsNummer = crsMatch ? crsMatch[1] : 'Unbekannt';
        const kursName = courseNameMapping[crsNummer] || course.summary?.value;
        return {...course, summary: {...course.summary, value: kursName}};
    });
};

// Function to extract unique courses and sort them by course number
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
        // Checks if `crsNummer` already exists in `uniqueCourses` object
        if (uniqueCourses[course.crsNummer]) {
            // If yes, filters out this element as it has already been accounted for
            return false;
        }
        // Marks the `crsNummer` as present
        uniqueCourses[course.crsNummer] = true;
        return true;
    }).sort((a, b) => a.crsNummer.localeCompare(b.crsNummer)); // Sorts courses by `crsNummer`

    return uniqueAndSortedCourses;
};

// Function to extract all courses including numbers
export const extractAllCourses = (courses) => {
    return courses.map(course => {
        const url = course.url?.value || "";
        const crsMatch = url.match(/crs_(\d+)/);
        const crsNummer = crsMatch ? crsMatch[1] : 'Unbekannt';
        const kursName = course.summary?.value || 'Unbekannter Kurs';

        return { crsNummer, kursName };
    })
};

// Function to get day abbreviation from index
export const getDay = (day) => {
    const days = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
    return days[day] || "";
};

// Function to format local time from ISO string
export const formatLocalTime = (time) => {
    const date = new Date(time);
    return date.toISOString().substring(11, 16);
};

export const formatDate = (date) => {
    date = new Date(date);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth()+1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

export const sortTasksByDueDate = (tasks) => {
    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('.');
        return new Date(year, month - 1, day);
    };

    const reformatDate = (dateString) => {
        const parts = dateString.split('-');
        return `${parts[2]}.${parts[1]}.${parts[0]}`;
    };

    return [...tasks].sort((a, b) => {
        const dateA = a.dueDate ? parseDate(reformatDate(a.dueDate)) : new Date(8640000000000000);
        const dateB = b.dueDate ? parseDate(reformatDate(b.dueDate)) : new Date(8640000000000000);

        return dateA - dateB;
    });
};


// Funktion, um das aktuelle Datum im gewünschten Format zu erhalten
export const getCurrentDateStringForReactNativeCalendar = () => {
    // Get today's date
    const today = new Date();

    // Extract year, month, and day
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Month starts from 0, so add 1
    const day = today.getDate().toString().padStart(2, '0');

    // Construct and return the date in the desired format
    return `${year}-${month}-${day}`;
};

// Function to get due date status
export const getDueDateStatus = (dueDate) => {
    const differenceInDays = countDaysUntilDue(dueDate);

    if (isNaN(differenceInDays)) {
        return ""; //wenn es kein Datum gibt, bzw NaN zurückkommt
    } else if (differenceInDays === 0) {
        return "jetzt fällig";
    } else if (differenceInDays === 1) {
        return "in einem Tag";
    } else if (differenceInDays < 0) {
        return "überfällig";
    } else {
        return `in ${differenceInDays} Tagen`;
    }
};

// Function to count days until due date
const countDaysUntilDue = (dueDateString) => {
    //zusätzliche NaN Überprüfung
    if(!dueDateString){
        return NaN;
    }
    // Convert dueDateString to Date object
    const dueDate = new Date(dueDateString);
    // Get current date
    const currentDate = new Date();

    //zusätzliche NaN Überprüfung
    if(isNaN(dueDate.getTime())){
        return NaN;
    }

    // Set time component of dueDate and currentDate to midnight to ignore time difference
    dueDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = dueDate - currentDate;
    // Convert milliseconds to days
    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));

    return differenceInDays;
};


// Function to get course name by course number
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
