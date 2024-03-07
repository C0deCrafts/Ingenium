import * as SQLite from "expo-sqlite";
import {useEffect} from "react";

export const localDatabase = () => {
    const db = SQLite.openDatabase("ingeniumLocalDB.db");

    useEffect(() => {
        initDB();
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

    return {
        getLists,
        insertList,
    }

}