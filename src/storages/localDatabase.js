import * as SQLite from "expo-sqlite";
import * as FileSystem from 'expo-file-system';
import * as Sharing from "expo-sharing";

let dbInstance = null; // Initialize database instance variable

/* ### Update to new SQLite Version
* Key Changes with the New SQLite Version:
* - getDatabase(): Opens the database asynchronously using SQLite.openDatabaseAsync.
* - runAsync(): Executes write operations such as INSERT, UPDATE, DELETE asynchronously.
* - getAllAsync(): Retrieves all entries from the database asynchronously, ideal for displaying data.
*/
export const localDatabase = () => {

    /**
     * Opens or returns a reference to the SQLite database asynchronously.
     * @returns {Promise<*>}
     */
    const getDatabase = async () => {
        //console.log("getDatabase wird aufgerufen");
        const dbName = "ingeniumLocalDb.db"
        if (!dbInstance){
            dbInstance = await SQLite.openDatabaseAsync(dbName) // Opens the database if it's not already opened
            console.log("Datenbankinstanz erstellt:", dbInstance);
        } else {
            //console.log("Verwende vorhandene Datenbankinstanz");
        }
        return dbInstance;
    }

    /**
     * Creates tables if they do not exist in the database.
     * @returns {Promise<void>}
     */
    const createTable = async () => {
        const db = await getDatabase(); // Get database instance
        const sqlTaskLists = `CREATE TABLE IF NOT EXISTS taskLists(
                    listId INTEGER PRIMARY KEY AUTOINCREMENT,
                    listName TEXT NOT NULL,
                    iconName TEXT NOT NULL, 
                    iconBackgroundColor TEXT NOT NULL
        )`; // SQL query to create taskLists table

        const sqlTasks = `CREATE TABLE IF NOT EXISTS tasks (
                      taskId INTEGER PRIMARY KEY AUTOINCREMENT,
                      listId INTEGER NOT NULL,
                      taskTitle TEXT NOT NULL,
                      taskNotes TEXT,
                      dueDate TEXT,
                      creationDate TEXT,
                      imageURL TEXT,
                      url TEXT,
                      isDone INTEGER,
                      doneDate TEXT,
                      shared INTEGER,
                      reminder INTEGER,
                      FOREIGN KEY (listId) REFERENCES taskLists(listId)
        )`; // SQL query to create tasks table

        const args = []; // No arguments for table creation

        try {
            await db.runAsync(sqlTaskLists,args);
            await db.runAsync(sqlTasks,args)
            console.log("Tabellen 'tasks', 'taskLists' wurden erfolgreich erstellt. ")
        } catch (err){
            console.log("Fehler beim Erstellen der Tabellen: ", err);
        }
    };

    /**
     * Inserts a new task list into the database.
     * @param list - prop containing list details.
     * @returns {Promise<void>}
     */
    const insertTaskList = async (list) => {
        const db = await getDatabase();
        const sql = `INSERT INTO taskLists(
                    listName, 
                    iconName, 
                    iconBackgroundColor
        ) VALUES (?, ?, ?);`

        const args = [list.listName, list.iconName, list.iconBackgroundColor];

        try {
            await db.runAsync(sql,args);
            console.log("Liste wurde erfolgreich in die Tabelle 'taskLists' gespeichert")
        } catch (err){
            console.log("Fehler beim Speichern der Liste: ", err);
        }
    }

    /**
     * Function to insert a new task into a task list.
     * @param task - prop containing task
     * @returns {Promise<void>}
     */
    const insertTaskInList = async (task) => {
        const db = await getDatabase();

        const sql = `INSERT INTO tasks (
                    listId,
                    taskTitle,
                    taskNotes,
                    dueDate,
                    creationDate,
                    imageURL,
                    url,
                    isDone,
                    shared,
                    reminder
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

        const args = [task.listId, task.taskTitle, task.taskNotes, task.dueDate, task.creationDate, task.imageURL, task.url,
            task.isDone ? 1: 0, // Convert boolean to integer for SQLite
            task.shared ? 1 : 0, // Convert boolean to integer for SQLite
            task.reminder ? 1 : 0 // Convert boolean to integer for SQLite
        ];

        try {
            await db.runAsync(sql, args);
            console.log("Task wurde erfolgreich in die Liste gespeichert")
        } catch (err) {
            console.log("Error beim Einfügen des Tasks: ", err)
        }
    }

    /**
     * Function to get all task lists from the database.
     * @returns {Promise<*>}
     */
    const getTaskLists = async () => {
        const db = await getDatabase();
        const sql = `SELECT * FROM taskLists`;

        try {
            return await db.getAllAsync(sql);
        } catch (err) {
            console.log("Fehler beim Abrufen der Tasklisten: ", err);
            return [];
        }
    }

    /**
     * Function to get all tasks from the database.
     * @returns {Promise<*>}
     */
    const getTasks = async () => {
        const db = await getDatabase();
        const sql = `SELECT * FROM tasks`;

        try {
            return db.getAllAsync(sql);
        } catch (err) {
            console.log("Fehler beim Abrufen der Tasks: ", err)
            return [];
        }
    }

    /**
     * Function to delete a task list from the database.
     * @param listId
     * @returns {Promise<void>}
     */
    const deleteTaskList = async (listId) => {
        const db = await getDatabase();
        const deleteTasksSql = `DELETE FROM tasks WHERE listId = ?;`
        const deleteListSql = `DELETE FROM taskLists WHERE listId = ?;`
        const args = [listId];

        try {
            await db.runAsync(deleteTasksSql, args);
            await db.runAsync(deleteListSql, args);
            console.log("Taskliste wurde erfolgreich gelöscht!")
        } catch (err) {
            console.log("Fehler beim Löschen der Taskliste: ", err)
        }
    }

    /**
     * Function to delete a task from the database
     * @param taskId
     * @returns {Promise<void>}
     */
    const deleteTask = async (taskId) => {
        const db = await getDatabase();
        const deleteTasksSql = `DELETE FROM tasks WHERE taskId = ?;`
        const args = [taskId];

        try {
            db.runAsync(deleteTasksSql,args)
            console.log("Task wurde erfolgreich gelöscht!")
        } catch (err) {
            console.log("Fehler beim Löschen des Tasks: ", err)
        }
    }

    /**
     * Function to toggle isDone of a task from the database
     * @param taskId
     * @param isDone
     * @returns {Promise<void>}
     */
    const updateTaskIsDone = async (taskId, isDone) => {
        const db = await getDatabase();

        //for testing:
        //const currentDate = new Date();
        //ab -30 wird gelöscht
        //currentDate.setDate(currentDate.getDate()-2);
        //const manipulatedDate = currentDate.toISOString();
        //const updateTaskIsDoneSql = `UPDATE tasks SET isDone = ?, doneDate = ? WHERE taskId = ?;`
        //const args = [isDone === 0 ? 1 : 0, manipulatedDate, taskId];

        // for real system
        const currentDate = new Date().toISOString();
        const updateTaskIsDoneSql = `UPDATE tasks SET isDone = ?, doneDate = ? WHERE taskId = ?;`
        const args = [isDone === 0 ? 1 : 0, currentDate, taskId];

        try {
            await db.runAsync(updateTaskIsDoneSql,args);
            console.log("Task erledigt - Task-Status wurde erfolgreich aktualisiert")
        } catch (err) {
            console.log("Fehler beim Aktualisieren des Task-Status: ", err)
        }
    }

    /**
     * Function to delete completed task where doneDate > 30 days from the database.
     * @returns {Promise<void>}
     */
    const deleteOldCompletedTasks = async () => {
        const db = await getDatabase();
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

        const deleteOldTasksSql = `DELETE FROM tasks WHERE isDone = 1 AND doneDate < ?;`;
        const args = [thirtyDaysAgo];

        try {
            await db.runAsync(deleteOldTasksSql, args);
            console.log("Abgeschlossene Tasks die älter als 30 Tage sind, wurden in der Datenbank gelöscht")
        } catch (err) {
            console.log("Fehler beim Löschen alter abgeschlossener Aufgaben: ", err)
        }
    };


    /**
     * Function to edit a task from the database
     * @param task
     * @returns {Promise<void>}
     */
    const updateTask = async (task) => {
        const db = await getDatabase();
        const updateTaskSql = `UPDATE tasks SET
            listId = ?,
            taskTitle = ?,
            taskNotes = ?,
            dueDate = ?,
            imageURL = ?,
            url = ?,
            shared = ?,
            reminder = ?
            WHERE taskId = ?;`
        const args = [task.listId, task.taskTitle, task.taskNotes, task.dueDate, task.imageURL, task.url, task.shared, task.reminder, task.taskId];

        try {
            db.runAsync(updateTaskSql, args);
            console.log("Task wurde erfolgreich aktualisiert!")
        } catch (err) {
            console.log("Fehler beim Aktualisieren des Tasks: ", err)
        }
    }

    /**
     * Function to debug the database by sharing the database file.
     * @returns {Promise<void>}
     */
    const debugDB = async () => {
        console.log(FileSystem.documentDirectory);
        await Sharing.shareAsync(FileSystem.documentDirectory + "SQLite/ingeniumLocalDb.db")
    }

    return {
        getDatabase,
        createTable,
        insertTaskList,
        insertTaskInList,
        getTaskLists,
        getTasks,
        deleteTaskList,
        deleteTask,
        updateTaskIsDone,
        updateTask,
        deleteOldCompletedTasks,
        debugDB
    }
}