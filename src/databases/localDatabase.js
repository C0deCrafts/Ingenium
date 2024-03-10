import * as SQLite from "expo-sqlite";
import * as FileSystem from 'expo-file-system';
import {useEffect} from "react";
import * as Sharing from "expo-sharing";


let dbInstance = null;

export const localDatabase = () => {

    //const db = SQLite.openDatabase("ingeniumLocalDB.db");
    const readOnly = false;

    /**
     * getDatabase function:
     * This function helps us stick to the "Singleton pattern" for our database connection.
     * The Singleton pattern means we only create and use one single instance of something across our app.
     * Here's how it works:
     * - If we've already set up our database connection before (if `dbInstance` is not empty), we don't make a new one. We use the one we already have.
     * - If it's our first time asking for the database connection (so, `dbInstance` is empty), we create it and then keep it for later.
     * Doing this makes sure we don't waste resources by making new connections all the time.
     * Instead, we have just one connection that we use over and over, making our app work better and faster.
     */
    //FUNKTIONIERT
    const getDatabase = () => {
        //console.log("getDatabase wird aufgerufen");
        const dbName = "ingeniumLocalDB.db"
        if (!dbInstance){
            dbInstance = SQLite.openDatabase(dbName)
            console.log("Datenbankinstanz erstellt:", dbInstance);
        } else {
            console.log("Verwende vorhandene Datenbankinstanz");
        }
        return dbInstance;
    }

    //FUNKTIONIERT
    const createTable = async () => {
        const db = getDatabase();
        const sqlTaskLists = `CREATE TABLE IF NOT EXISTS taskLists(
                    listId INTEGER PRIMARY KEY AUTOINCREMENT,
                    listName TEXT NOT NULL,
                    iconName TEXT NOT NULL, 
                    iconBackgroundColor TEXT NOT NULL
        )`;


        /*
    * Aufgabendaten. Hier ist ein Beispiel für die Struktur:
    * taskID (Primärschlüssel)
    * listID (Fremdschlüssel, um die Aufgabe mit der entsprechenden Taskliste zu verknüpfen)
    * title (Titel der Aufgabe)
    * notes (Notizen zur Aufgabe)
    * dueDate (Fälligkeitsdatum der Aufgabe)
    * creationDate (Erstellungsdatum der Aufgabe)
    * imageURL (URL für Bilder, die der Benutzer hinzufügen kann)
    * url (URL, die der Benutzer extra hinzufügen kann)
    * shared (Boolean-Wert, ob die Aufgabe geteilt wurde)
    * reminder (Boolean-Wert, ob an diese Aufgabe erinnert werden soll)
    */
        const sqlTasks = `CREATE TABLE IF NOT EXISTS tasks (
                      taskId INTEGER PRIMARY KEY AUTOINCREMENT,
                      listId INTEGER NOT NULL,
                      taskTitle TEXT NOT NULL,
                      taskNotes TEXT,
                      dueDate TEXT,
                      creationDate TEXT,
                      imageURL TEXT,
                      url TEXT,
                      shared INTEGER,
                      reminder INTEGER,
                      FOREIGN KEY (listId) REFERENCES taskLists(listId)
        )`;

        const args = [];

        await db.transactionAsync(async tx => {
            await tx.executeSqlAsync(sqlTaskLists,args);
            console.log("Table Task LISTS erstellt")
            await tx.executeSqlAsync(sqlTasks, args);
            console.log("Table Tasks erstellt")
        },readOnly);
    };

    const insertTaskList = async (list) => {
        const db = getDatabase();
        const {listName, iconName, iconBackgroundColor} = list;
        const sql = `INSERT INTO taskLists(
                    listName, 
                    iconName, 
                    iconBackgroundColor
        ) VALUES (?, ?, ?);`
        let resultData;

        const args = [listName, iconName, iconBackgroundColor];
        await db.transactionAsync(async tx => {
            console.log("Öffne INSERT TASK LIST")
            const result = await tx.executeSqlAsync(sql,args)
            console.log("Ergebnis RESULT: ", result)
            //insertedId = result.insertId;
        },readOnly)
        //return resultData;
    }

    const insertTaskInList = async (task) => {
        const db = getDatabase();
        const {listId, taskTitle, taskNotes, dueDate, creationDate, imageURL, url, shared, reminder} = task;
        const sql = `INSERT INTO tasks (
                    listId,
                    taskTitle,
                    taskNotes,
                    dueDate,
                    creationDate,
                    imageURL,
                    url,
                    shared,
                    reminder
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`;
        const args = [listId, taskTitle, taskNotes, dueDate, creationDate, imageURL, url,
            shared ? 1 : 0, // Convert boolean to integer for SQLite
            reminder ? 1 : 0 // Convert boolean to integer for SQLite
        ];

        await db.transactionAsync(async tx => {
            console.log("Öffne INSERT TASK IN LIST")
            const result = await tx.executeSqlAsync(sql,args)
            console.log("Ergebnis RESULT: ", result)
        },readOnly)
    }

    //FUNKTIONIERT
    const getTaskLists = async () => {
        const db = getDatabase();
        const sql = `SELECT * FROM taskLists`;
        const args = [];
        let resultData;

        await db.transactionAsync(async tx => {
            const result = await tx.executeSqlAsync(sql,args);
            //console.log("Ergebnis RESULT: ", result)
            //console.log("Ergebnis: ", result.rows[0]);
            resultData = result.rows;
        },readOnly);
        return resultData;
    }

    //FUNKTIONIERT
    const deleteTaskList = async (listId) => {
        const db = getDatabase();
        const sql = `DELETE FROM taskLists WHERE listId = ?;`
        const args = [listId];

        await db.transactionAsync(async tx => {
            const result = await tx.executeSqlAsync(sql,args);
        },readOnly)
    }

    const deleteAllTaskLists = async () => {
        const db = getDatabase();
        const sql = `DELETE FROM taskLists`;
        const args = [];

        await db.transactionAsync(async tx => {
            await tx.executeSqlAsync(sql,args)
        },readOnly)
    }


        const debugDB = async () => {
            console.log(FileSystem.documentDirectory);
            await Sharing.shareAsync(FileSystem.documentDirectory + "SQLite/ingeniumLocalDB.db")
        }

    return {
        getDatabase,
        createTable,
        insertTaskList,
        insertTaskInList,
        getTaskLists,
        deleteTaskList,
        deleteAllTaskLists,
        debugDB
    }

}