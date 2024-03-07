import * as SQLite from "expo-sqlite";
import * as FileSystem from 'expo-file-system';
import {useEffect} from "react";
import * as Sharing from "expo-sharing";

export const localDatabase = () => {
    const db = SQLite.openDatabase("ingeniumLocalDB.db");

    useEffect(() => {
        //initDB();
        debugDB();
    }, []);

    const initDB = () => {
        const sql = `CREATE TABLE IF NOT EXISTS taskLists(
                    listId INTEGER PRIMARY KEY AUTOINCREMENT,
                    listName TEXT NOT NULL,
                    iconName TEXT NOT NULL, 
                    iconBackgroundColor TEXT NOT NULL
        )`;

        db.execAsync([{sql, args: []}], false).then(() => {
            console.log("Database initialized");
        }).catch((error)=>{
            console.log("Error initialize database: ", error);
        })
    }

    const insertList = (list) => {
        const {listName, iconName, iconBackgroundColor} = list;
        const sql = `INSERT INTO taskLists(
                    listName, 
                    iconName, 
                    iconBackgroundColor
        ) VALUES (?, ?, ?);`
        const args = [listName, iconName, iconBackgroundColor];
        return db.execAsync([{ sql, args }], false);
    }
    const getLists = () => {
        const sql = `SELECT * FROM taskLists;`;
        const args = [];
        return db.execAsync([{sql, args}], false);
    };

    const debugDB = async () => {
        console.log(FileSystem.documentDirectory);
        await Sharing.shareAsync(FileSystem.documentDirectory + "SQLite/ingeniumLocalDB.db")
    }

    return {
        getLists,
        insertList,
    }

}