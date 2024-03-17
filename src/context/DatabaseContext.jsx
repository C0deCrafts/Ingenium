import {createContext, useContext, useEffect, useState} from "react";
import {localDatabase} from "../databases/localDatabase";
import {COLOR} from "../constants/styleSettings";

// Create a context for the database operations
const DatabaseContext = createContext();

// Custom hook to access the database context
export const useDatabase = () => useContext(DatabaseContext);

// Database provider component responsible for managing database state and operations
export const DatabaseProvider = ({children}) => {
    // State variables to manage lists, tasks, loading status, database readiness, and errors
    const [lists, setLists] = useState([]) // State variable to store task lists
    const [tasks, setTasks] = useState([]); // State variable to store tasks
    const [isLoading, setIsLoading] = useState(false); // State variable to indicate loading status - NOT SURE IF WE USE AND NEED IT??
    const [isDbReady, setIsDbReady] = useState(false); // State variable to indicate database readiness
    const [error, setError] = useState(null); // State variable to store errors - MAYBE WE CAN USE IT FOR ALERT PEOPLE IF SOMEWHERE IS AN ERROR


    // Function to initialize the database and load initial data
    const initializeDatabase = async () => {
        setIsLoading(true);
        try {
            //await localDatabase().debugDB();
            await localDatabase().createTable();
            console.log("Datenbank und Tabellen wurden erfolgreich initialisiert.");

            console.log("Sicherstellung, dass die 'Ingenium'-Liste existiert.");
            await ensureListExists("Ingenium", "HAT", COLOR.ICONCOLOR_CUSTOM_BLUE); // Ensure a default list exists

            await loadLists();
            console.log("Alle Listen wurden erfolgreich geladen.");

            setIsDbReady(true);
        } catch (err) {
            setError(err.message);
            console.log("Fehler im DatabaseContext - initializeDatabase():", err);
        } finally {
            setIsLoading(false);
        }
    }

    // Function to add a new list to the database - OPTIMIZED -> I DON'T KNOW IF WE NEED - BUT WITH performance.now() WE CAN SHOW THE PERFORMANCE FOR DEBUGGING
    const loadLists = async () => {
        // Entferne setIsLoading Aufrufe hier, falls das Laden der Listen schnell erfolgt
        // und die UI nicht direkt beeinflusst wird, um unnötige Rerenders zu vermeiden. (laut Chat GPT - muss noch geprüft werden ob das Sinn macht?)
        try {
            const start = performance.now();

            const loadedLists = await localDatabase().getTaskLists();
            const listsArray = [...loadedLists];
            setLists(listsArray);

            const loadedTasks = await localDatabase().getTasks();
            const tasksArray = [...loadedTasks];

            //console.log("INSIDE LOADLISTS:", tasksArray);

            setTasks(tasksArray);

            //console.log("LOAD LISTS IN DBCONTEXT: Loaded lists:", loadedLists); // Nur für Debugging-Zwecke
            //console.log("LOAD LISTS IN DBCONTEXT: Loaded tasks:", loadedTasks); // Nur für Debugging-Zwecke

            const end = performance.now();
            console.log(`Das Laden der Listen dauerte ${end - start} Millisekunden.`);
        } catch (err) {
            setError(err.message);
            console.error("Fehler beim Laden der Listen:", err);
        }
    };

    // Function to ensure that a default list exists
    const ensureListExists = async (listName, iconName, iconBackgroundColor) => {
        const lists = await localDatabase().getTaskLists();
        const listExists = lists.some(list => list.listName === listName);
        if (!listExists) {
            await localDatabase().insertTaskList({listName, iconName, iconBackgroundColor});
            console.log(`Liste '${listName}' wurde erstellt.`);
        } else {
            console.log(`Die Liste '${listName}' existiert bereits.`);
        }
    };

    // Function to add a new list to the database
    const addList = async (list) => {
        try {
            await localDatabase().insertTaskList(list);
            await loadLists();
            console.log("Liste erfolgreich hinzugefügt");
        } catch (err) {
            setError(err.message);
            console.error("Fehler beim Hinzufügen der Liste:", err.message);
        }
    };

    // Function to add a new task to a list
    const addTask = async (task) => {
        try {
            await localDatabase().insertTaskInList(task);
            await loadLists();
            console.log("Task erfolgreich hinzugefügt");
        } catch (err) {
            setError(err.message);
            console.error("Fehler beim Hinzufügen des Tasks:", err);
        }
    }

    // Function to delete a list from the database
    const deleteList = async (listId) => {
        try {
            await localDatabase().deleteTaskList(listId);
            await loadLists();
            console.log("Liste erfolgreich gelöscht");
        } catch (err) {
            setError(err.message);
            console.error("Fehler beim Löschen der Liste:", err);
        }
    };

    // Function to delete a task from the database
    const deleteTask = async (taskId) => {
        try {
            await localDatabase().deleteTask(taskId);
            await loadLists();
            console.log("Task erfolgreich gelöscht");
        } catch (err) {
            setError(err.message);
            console.error("Fehler beim Löschen des Tasks:", err);
        }
    };

    // Function to update isDone property of a task from the database
    const updateTaskIsDone = async (taskId, isDone) => {
        try {
            await localDatabase().updateTaskIsDone(taskId, isDone);
            await loadLists();
            console.log("Task isDone erfolgreich getogglet");
        } catch (err) {
            setError(err.message);
            console.error("Fehler beim togglen von isDone:", err);
        }
    };

    // Function to update editable properties of a task from the database
    const updateTask = async (task) => {
        try {
            await localDatabase().updateTask(task);
            await loadLists();
            console.log(`Task: ${task.taskTitle} - aus Liste mit Id: ${task.listId} erfolgreich upgedatet`);
        } catch (err) {
            setError(err.message);
            console.error(`Fehler beim updated der properties von Task: ${task.taskTitle} `, err);
        }
    };

    // useEffect to initialize the database when the component mounts
    useEffect(() => {
                initializeDatabase();
    }, []);


    // useEffect to log updated lists for debugging purposes
    useEffect(() => {
        const dataString = JSON.stringify(lists, null, 2); // Convert lists to a string for logging
        //console.log("Aktualisierte Listen: ", dataString);
    }, [lists]); // This effect depends on the `lists` state variable and triggers on every change

    // Provide the database context and its operations to the child components
    return (
        <DatabaseContext.Provider value={{isDbReady, lists, tasks, addTask, loadLists, addList, deleteList, deleteTask, updateTaskIsDone, updateTask, isLoading, error}}>
            {children}
        </DatabaseContext.Provider>
    );

}