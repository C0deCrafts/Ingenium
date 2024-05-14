import iCal from "cal-parser";
import {isEqual as isEqualDateFns} from "date-fns/isEqual";

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

export const sortTasksByDoneDate = (tasks) => {
    return tasks.sort((a, b) => new Date(b.doneDate) - new Date(a.doneDate));
}


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

export const groupTasksByCompletionDate = (tasks) => {
    const now = new Date();
    const todayStr = now.toISOString().slice(0, 10);
    const yesterday = new Date(now.setDate(now.getDate() - 1));
    const yesterdayStr = yesterday.toISOString().slice(0, 10);
    const dayBeforeYesterday = new Date(yesterday.setDate(yesterday.getDate() - 1));
    const dayBeforeYesterdayStr = dayBeforeYesterday.toISOString().slice(0, 10);
    //const lastWeek = new Date(dayBeforeYesterday.setDate(dayBeforeYesterday.getDate() - 6));
    //const lastWeekStr = lastWeek.toISOString().slice(0, 10);
    //const fourteenDaysAgo = new Date(lastWeek.setDate(lastWeek.getDate() - 7));
    //const fourteenDaysAgoStr = fourteenDaysAgo.toISOString().slice(0, 10);
    const twentyFiveDaysAgo = new Date(now.setDate(now.getDate() - 25));
    const twentyFiveDaysAgoStr = twentyFiveDaysAgo.toISOString().slice(0, 10);

    //console.log("Today Str:", todayStr);
    //console.log("Yesterday Str:", yesterdayStr);
    //console.log("Day Before Yesterday Str:", dayBeforeYesterdayStr);
    //console.log("Last Week Str:", lastWeekStr);
    //console.log("14 Str:", fourteenDaysAgoStr);
    //console.log("Exp: ", twentyFiveDaysAgoStr)

    const groups = {
        today: [],
        yesterday: [],
        dayBeforeYesterday: [],
        thisMonth: [],
        expiringSoon: []  // Tasks that are 25 days or older
    };

    tasks.forEach(task => {
        const taskDateStr = task.doneDate?.slice(0, 10);

        if (taskDateStr === todayStr) {
            groups.today.push(task);
        } else if (taskDateStr === yesterdayStr) {
            groups.yesterday.push(task);
        } else if (taskDateStr === dayBeforeYesterdayStr) {
            groups.dayBeforeYesterday.push(task);
            // 11.05 / 10.05 / 09.05 /
            // 08.05 - 15.04 / 14.04 - 11.04
            // 10.05
        } else if (taskDateStr < dayBeforeYesterdayStr && taskDateStr > twentyFiveDaysAgoStr) {
            groups.thisMonth.push(task);
        } else if (taskDateStr <= twentyFiveDaysAgoStr) {
            //14.04 - 11.04
            groups.expiringSoon.push(task);
        }
    });

    //console.log("Final Groups:", JSON.stringify(groups, null, 2));
    return groups;
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

//*************METHODS USED FOR AGENDA IN TIMETABLE***************
/**
 * A class defining the structure for courseItems to be displayed in the timetable.
 */
class courseItem {
    constructor(courseDate, courseSummary, courseStart, courseEnd, courseURL) {
        this.courseDate = courseDate;
        this.courseSummary = courseSummary;
        this.courseStart = courseStart;
        this.courseEnd = courseEnd;
        this.courseURL = courseURL;
    }
}


/**
 * Takes the Event Array of the parsed IcalData (returned by the function parseIcalData)
 * and applies all functions needed to:
 * - extract all necessary information about the courses
 * - format an object with the necessary structure for the Agenda component
 * - fill the object with all the coursedates and coursedata for one semester
 * @param parsedIcalEventArray {Array} Array with events contained in the IcalData parsed with cal-parser.
 * @returns {Object} An object filled with all the courses for one semester, formatted in the structure expected by Agenda.
 */
export const convertIcalDataToAgendaStructure = (parsedIcalEventArray) => {
    //call method to create an array of courseItems from the event data
    let courseItems = createCourseItemArrayOfParsedIcsEvents(parsedIcalEventArray);

    //create an array of required structure for Agendalist, containing all dates minYear to maxYear
    const objectWithAgendaStructure = createAgendaListDataObject();

    //fill array with agendaList structure with all course items
    return fillAgendaObjectWithCourseData(courseItems, objectWithAgendaStructure);
}


/**
 * Creates an array of course items with the exact properties needed to display them in the timetable.
 * @param courses The event array received from the calparser containing the course data.
 * @returns {[]} An array of course item objects.
 */
const createCourseItemArrayOfParsedIcsEvents = (courses) => {
    let courseItems = [];
    courses.forEach(c => {
        /*
        EXTRACT THE NECESSARY COURSE ITEM DATA
        assign an empty string if any of the values which I try to gain access to is empty
         */
        //date on which the course takes place
        let courseDate= c.dtstart.value.toISOString().split('T')[0] || "";

        //time when the course takes place
        let courseStartTime = formatLocalTime(c.dtstart.value);
        let courseEndTime = formatLocalTime(c.dtend.value);

        //title of the course
        let courseSummary = c.summary.value || "";
        //URI - link to the Ilias course
        let courseURI = c.url.value || "";

        //add everything to an array with course items
        courseItems.push(new courseItem(courseDate, courseSummary, courseStartTime, courseEndTime, courseURI));
    });

    // Sort courseItems array by date and time
    courseItems.sort((a, b) => {
        // compare date strings with localeCompare method for Strings
        const dateComparison = a.courseDate.localeCompare(b.courseDate);
        //returns zero if dates are equal - if dates are not equal return the date comparison
        if (dateComparison !== 0) {
            return dateComparison;
        }
        // If dates are equal, compare times and return time comparison
        return a.courseStart.localeCompare(b.courseStart);
    });

    //console.log(courseItems);
    return courseItems;
};

/**
 * Returns the start and end date for the current school semester.
 * Used to initialize the calendar  with the starting and ending date of the current school semester (should
 * only render exactly that period)
 * Sommersemester: start is set to 01.02. and end is set to 31.08
 * Wintersemester: start is set to 01.09. and end is set to 01.03.
 * in both winter and summersemester february is rendered, as the federal states of austria have different semester breaks
 * during februrary.
 * @returns {{start, end}} An object holding the start and end date of the current semester.
 */
export const getSemesterDates = () => {
    //get the current date
    const today = new Date();
    //get the month of current date
    const month = today.getMonth();

    //initialize variables for semester start and semester end
    let start;
    let end;

    // Semester bestimmen
    if(month >= 8 || month <= 1) {
        if(month >= 8) {
            start = new Date(Date.UTC(today.getFullYear(), 8, 1));
            end = new Date(Date.UTC(today.getFullYear() + 1, 2, 1));
        }
        if(month <= 1) {
            start = new Date(Date.UTC(today.getFullYear() - 1, 8, 1));
            end = new Date(Date.UTC(today.getFullYear(), 2, 1));
        }
    } else {
        start = new Date(Date.UTC(today.getFullYear(), 1, 1));
        end = new Date(Date.UTC(today.getFullYear(), 7, 31));
    }
    return {
        start,
        end,
    };
}


/**
 * Creates an object holding all the dates of a semester as keys, with an empty array as value,
 * to which the course data will be assigned.
 * Example structure: '2024-04-20'....
 * @returns {{}}
 */
const createAgendaListDataObject = () => {
    /*
   *get the start and the end of the semester as min and max date for the agenda list
    */
    const {start, end} = getSemesterDates();

    const minDate = start;
    const maxDate = end;

    const agendaListData = {};

    let currentDate = new Date(minDate);

    //create the object holding keys with all dates in the range of minDate and maxDate
    while(currentDate.getTime() <= maxDate.getTime()) {

        const sectionTitle = currentDate.toISOString().split('T')[0];

        //check if date already exists and skip it
        if (!Object.keys(agendaListData).includes(sectionTitle)) {
            agendaListData[sectionTitle] = [];
        }

        //increase currentDate by one day after each round in the loop
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return agendaListData;
}

/**
 * Fills the object expected by Agenda in timetable, with all the courseItems of the current Semester.
 * @param courseItems
 * @param objectWithAgendaStructure
 * @returns {*}
 */
export const fillAgendaObjectWithCourseData = (courseItems, objectWithAgendaStructure) => {
    courseItems.forEach(c => {
        for (let [key, value] of Object.entries(objectWithAgendaStructure)) {
            if(isEqualDateFns(key, c.courseDate)) {
                value.push({
                    courseDate: c.courseDate,
                    courseStart: c.courseStart,
                    courseEnd: c.courseEnd,
                    courseTitle: c.courseSummary,
                    courseURL: c.courseURL
                });
            }
        }
    });
    return objectWithAgendaStructure;
}