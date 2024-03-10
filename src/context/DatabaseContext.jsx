import {createContext, useContext, useEffect, useState} from "react";
import {localDatabase} from "../databases/localDatabase";

const DatabaseContext = createContext();

export const useDatabase = () => useContext(DatabaseContext);

export const DatabaseProvider = ({children}) => {
    const [lists, setLists] = useState([]);
    const [isLoading, setIsLoading] = useState(false); //evtl. einen Loadingscreen anzeigen lassen für bessere Usability
    const [error, setError] = useState(null); // error speichern

    //FUNKTIONIERT
    const initializeDatabase = async () => {
        try {
            //await localDatabase().debugDB();
            //console.log("Versuche, die Datenbanktabelle zu erstellen...");
            await localDatabase().createTable(); // Warten, bis die Datenbank erstellt ist
            //console.log("Datenbank wurde erstellt");
            //console.log("Versuche, Listen zu laden...");
            await initializePermanentList();
            await loadLists(); // Laden der Listen nach erfolgreicher Erstellung der Datenbank
            //console.log("Liste wurde erstellt");
        } catch (err) {
            setError(err.message);
            console.log("Fehler:", err);
        } finally {
            setIsLoading(false);
        }
    }

    //Füge Ingenium hinzu
    const initializePermanentList = async () => {
        const lists = await localDatabase().getTaskLists();
        const listNames = lists.map(list => list.listName); // Extrahiere alle Listennamen

        if (!listNames.includes("Ingenium")) {
            // Wenn "Ingenium" nicht in den Listennamen enthalten ist, erstellen Sie die Liste
            await localDatabase().insertTaskList({listName: "Ingenium", iconName: "HAT", iconBackgroundColor: "#009FE3"});
            console.log("Liste 'Ingenium' wurde erstellt.");
        } else {
            console.log("Die Liste 'Ingenium' existiert bereits.");
        }
    };
    // Methode zum Laden der Listen
    //FUNKTIONIERT
    const loadLists = async () => {
        setIsLoading(true);
        try {
            const loadedLists = await localDatabase().getTaskLists();
            //loadedLists.forEach(items => console.log("ITEM: ", items))
            const listsArray = [loadedLists];
            setLists(listsArray)

            const dataString = JSON.stringify(loadedLists, null,2);
            console.log("DATA STRING: ", dataString)
        } catch (err) {
            setError(err.message);
            console.log("ERROR Lists: ", err);
        } finally {
            setIsLoading(false);
        }
    };
    // Methode zum Hinzufügen einer Liste
    //FUNKTIONIERT
    const addList = async (list) => {
        try {
            await localDatabase().insertTaskList(list);
            await loadLists();
        } catch (err) {
            setError(err.message);
        }
    };

    // Methode zum Löschen einer Liste
    //FUNKTIONIERT
    const deleteList = async (listId) => {
        try {
            await localDatabase().deleteTaskList(listId);
            console.log("list deleted")
            await loadLists();
        } catch (err) {
            setError(err.message);
        }
    };


    //FUNKTIONIERT
    const deleteAllLists = async () => {
        try {
            await localDatabase().deleteAllTaskLists();
            console.log("All lists deleted")
            await loadLists(); // Läd die Listen neu, um die UI zu aktualisieren
        } catch (error) {
            setError(error);
        }
    }

    useEffect(() => {
        initializeDatabase().then(r => {
            console.log("UseEffect")
        });
    }, []);


    return (
        <DatabaseContext.Provider value={{lists, loadLists, addList, deleteList, isLoading, deleteAllLists, error/*lists,addList,loadLists,deleteList,deleteAllLists*/}}>
            {children}
        </DatabaseContext.Provider>
    );

}