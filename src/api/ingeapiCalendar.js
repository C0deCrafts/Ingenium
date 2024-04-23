import axios from "axios";
import {isEqual as isEqualDateFns} from 'date-fns';


/****************************************Working WITH CALENDARDATA******************************************/
let icalFileLiveIlias = 'https://ilias.ingenium.co.at/calendar.php?client_id=ingenium&token=8339093b3398627d800ed5635c6543f8';


//Functions from Sabrina
//todo need to use the one from utils
//need to add my functions to utils
//need to use Sabrinas Ical fetching function

export const formatLocalTime = (time) => {
    const date = new Date(time);
    return date.toISOString().substring(11, 16);
};


/*
initialize a parser for event parsing
Uses the cal-parser package from npm, which is a package for parsing icaldata
to react native, that does not require any node native packages
https://www.npmjs.com/package/cal-parser?activeTab=readme
 */
const parser = require('cal-parser');

/**
 * AXIOS REQUEST for fetching the calendar data
 * Fetches the IcalLink and calls the convertIcalFunction to convert the data to
 * the needed data structure.
 * @returns an array containing eventItems for display in the timetable.
 */
export const fetchIcal = () => {
    return axios.get(icalFileLiveIlias)
        .then( async response => {
            /*save response data to variable*/
            const icalData = response.data;
            console.log( "Success fetching IcalData with AXIOS:");

            /*parse and save the data needed from an event to a data structure which can be used by Agenda List*/
            return convertIcalData(icalData);
        }).catch(error => {
            console.log("Error when fetching iCal link with AXIOS:", error);
        });
};

/**
 * Parses the fetched ical data, and calls functions to:
 * - extract all necessary information about the courses
 * - format an array with the necessary structure for the AgendaList
 * - fill the array with all courses
 * @param icalData the raw ical data fetched from Inge App API.
 * @returns {[]} An array with all courses formatted as the AgendaList accepts them.
 */
const convertIcalData = (icalData) => {
    //parse ics file and extract only the events array from the data obtained
    const icsEvents = parser.parseString(icalData).events;

    //call method to create an array of courseItems from the event data
    let courseItems = createCourseItemArrayOfParsedIcsEvents(icsEvents);

    //create an array of required structure for Agendalist, containing all dates minYear to maxYear
    const arrayWithAgendaListStructure = createArrayWithAllDatesOfSemester();

    //fill array with agendaList structure with all course items
    return fillAgendaListArrayWithCourses(courseItems, arrayWithAgendaListStructure);
}

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
 * sommersemester: start is set to 01.02. and end is set to 31.08
 * wintersemester: start is set to 01.09. and end is set to 01.03.
 * in both winter and summersemester february is rendered, as the federal states of austria have different semester breaks
 * during februrary.
 * @returns {{start, end}}
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
 * Creates an array with the datastructure required by the AgendaList which will output the course items.
 * For all days rendered in  the agenda the Array must have an object with:
 * - key: title, value: date in format 'dd-MM-YYYY'
 * - key: data, value: [array with all course items happening that day]
 * For all dates to be rendered in the agenda every single date in the course date range must be present.
 * The function creates this structure with dates ranging from the 01st of January of minYear
 * and the 31st of december of maxYear.
 * The function is used to create a date range corresponding to the date range of the course items received by
 * the ics file fetched from Ilias.
 * @returns {[]}
 */
const createArrayWithAllDatesOfSemester = () => {
    /*
    *get the start and the end of the semester as min and max date for the agenda list
     */
    const {start, end} = getSemesterDates();

    const minDate = start;
    const maxDate = end;

    const agendaListData = [];

    let currentDate = new Date(minDate);

    //create the array with all dates in the range of minDate and maxDate
    while(currentDate.getTime() <= maxDate.getTime()) {

        const sectionTitle = currentDate.toISOString().split('T')[0];

        // Check if the date already exists in the array - to avoid duplicates due to daylight saving time
        const existingDate = agendaListData.find(item => item.title === sectionTitle);

        if (!existingDate) {
            agendaListData.push({
                title: sectionTitle,
                data: []
            });
        }

        //increase currentDate by one day after each round in the loop
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return agendaListData;
}

/**
 * Fills courseItems into the array with agenda list structure - the courses are added to the data array
 * of the day they take place. For days where no courses take place, an empty object is passed to the data
 * array, as this is needed for rendering a component on days without courses to the AgendaList.
 * @param courseItems {Array} an array of course items with structure defined by courseItem class.
 * @param arrayWithAgendaListStructure {Array}
 * @returns {*}
 */
const fillAgendaListArrayWithCourses = (courseItems, arrayWithAgendaListStructure) => {
    /*
    * loop through the course Items one by one
    * and add them to their corresponding date in
    * the courseItemsWithAgendaListStructure array
    * */
    for(let i = 0; i < courseItems.length; i++) {
        for(let j = 0; j < arrayWithAgendaListStructure.length; j++) {
            //comparing dates with date-fns library to assure they get compared correctly (avoiding mistakes with
            //using strict equality operator when comparing date strings
            if(isEqualDateFns(courseItems[i].courseDate, arrayWithAgendaListStructure[j].title)){
                arrayWithAgendaListStructure[j].data.push({
                    courseTitle: courseItems[i].courseSummary,
                    courseStart: courseItems[i].courseStart,
                    courseEnd: courseItems[i].courseEnd,
                    courseURL: courseItems[i].courseURL
                });
            }
        }
    }

    //add an empty object to the data array if there is no course on that day
    //to be able to render something on empty days in the AgendaList
    arrayWithAgendaListStructure.forEach(c =>{
        if(c.data.length === 0) {
            c.data.push({});
        }
    });

    return arrayWithAgendaListStructure;
};

