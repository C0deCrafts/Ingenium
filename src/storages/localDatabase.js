import * as SQLite from "expo-sqlite";
import * as FileSystem from 'expo-file-system';
import * as Sharing from "expo-sharing";

let dbInstance = null; // Initialize database instance variable

export const localDatabase = () => {
    const readOnly = false; // Set database to read-write mode

    /**
     * Function to get the database instance.
     * It ensures we have only one connection to the database throughout the app.
     *
     * This function follows the <u>Singleton</u> pattern for our database connection.
     * The Singleton pattern means we create and use only one instance of something across our app.
     * Here's how it works:
     * - If we've already set up our database connection before (if `dbInstance` is not empty), we don't make a new one. We use the one we already have.
     * - If it's our first time asking for the database connection (so, `dbInstance` is empty), we create it and then keep it for later.
     * Doing this makes sure we don't waste resources by making new connections all the time.
     * Instead, we have just one connection that we use over and over, making our app work better and faster.
     * @returns {Promise<*>}
     */
    const getDatabase = async () => {
        //console.log("getDatabase wird aufgerufen");
        const dbName = "ingeniumLocalDb.db"
        if (!dbInstance){
            dbInstance = SQLite.openDatabase(dbName)
            //console.log("Datenbankinstanz erstellt:", dbInstance);
        } else {
            //console.log("Verwende vorhandene Datenbankinstanz");
        }
        return dbInstance;
    }

    /**
     * Function to create tables in the database if they don't exist.
     * It creates tables for task lists and tasks.
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

        await db.transactionAsync(async tx => {
            await tx.executeSqlAsync(sqlTaskLists,args); // Execute query to create taskLists table
            await tx.executeSqlAsync(sqlTasks, args); // Execute query to create tasks table
        },readOnly); // Read-write transaction
    };

    /**
     * Function to insert a new task list into the database.
     * @param list
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

        await db.transactionAsync(async tx => {
            await tx.executeSqlAsync(sql,args)
        },readOnly)
    }

    /**
     * Function to insert a new task into a task list.
     * @param task
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

        await db.transactionAsync(async tx => {
            await tx.executeSqlAsync(sql,args)
        },readOnly)
    }

    /**
     * Function to get all task lists from the database.
     * @returns {Promise<*>}
     */
    const getTaskLists = async () => {
        const db = await getDatabase();
        const sql = `SELECT * FROM taskLists`;

        const args = [];

        let resultData;

        await db.transactionAsync(async tx => {
            const result = await tx.executeSqlAsync(sql,args);
            resultData = result.rows;
        },readOnly);

        return resultData;
    }

    /**
     * Function to get all tasks from the database.
     * @returns {Promise<*>}
     */
    const getTasks = async () => {
        const db = await getDatabase();
        const sql = `SELECT * FROM tasks`;

        const args = [];

        let resultData;

        await db.transactionAsync(async tx => {
            const result = await tx.executeSqlAsync(sql,args);
            resultData = result.rows;
        },readOnly);

        return resultData;
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

        await db.transactionAsync(async tx => {
            await tx.executeSqlAsync(deleteTasksSql, args); // Lösche zuerst alle zugehörigen Tasks
            await tx.executeSqlAsync(deleteListSql, args); // Lösche dann die Liste
        },readOnly)
    }

    /**
     * Function to delete a task from the database
     */
    const deleteTask = async (taskId) => {
        const db = await getDatabase();
        const deleteTasksSql = `DELETE FROM tasks WHERE taskId = ?;`
        const args = [taskId];

        await db.transactionAsync(async tx => {
            await tx.executeSqlAsync(deleteTasksSql, args); // Lösche den Task
        },readOnly)
    }

    /**
     * Function to toggle isDone of a task from the database
     */
    const updateTaskIsDone = async (taskId, isDone) => {
        const db = await getDatabase();
        const currentDate = new Date().toISOString();

        //for testing:
        /*const currentDate = new Date();
        currentDate.setDate(currentDate.getDate()-30);
        const updateDate = currentDate.toISOString();*/

        const updateTaskIsDoneSql = `UPDATE tasks SET isDone = ?, doneDate = ? WHERE taskId = ?;`

        const args = [isDone === 0 ? 1 : 0, currentDate, taskId];

        //for testing:
        /*const args = [isDone === 0 ? 1 : 0, updateDate, taskId];*/

        await db.transactionAsync(async tx => {
            await tx.executeSqlAsync(updateTaskIsDoneSql, args); // Update isDone property
        },readOnly)
    }

    /**
     * Function to delete completed task where dueDate > 30 days from the database.
     * @returns {Promise<void>}
     */
    const deleteOldCompletedTasks = async () => {
        const db = await getDatabase();
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
        const deleteOldTasksSql = `DELETE FROM tasks WHERE isDone = 1 AND doneDate < ?;`;
        const args = [thirtyDaysAgo];

        await db.transactionAsync(async tx => {
            await tx.executeSqlAsync(deleteOldTasksSql, args);
        }, readOnly);
    };


    /**
     * Function to edit a task from the database
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

        await db.transactionAsync(async tx => {
            await tx.executeSqlAsync(updateTaskSql, args);
        },readOnly)
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