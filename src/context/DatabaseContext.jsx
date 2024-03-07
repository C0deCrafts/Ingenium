import {createContext, useContext, useEffect, useState} from "react";
import {localDatabase} from "../databases/localDatabase";

const DatabaseContext = createContext();

export const useDatabase = () => useContext(DatabaseContext);

export const DatabaseProvider = ({children}) => {
    const [lists, setLists] = useState([]);
    const [isLoading, setIsLoading] = useState(false); //evtl. einen Loadingscreen anzeigen lassen für bessere Usability
    const [error, setError] = useState(null); // error speichern

    const db = localDatabase();

    useEffect(() => {
        const initializeDatabase = async () => {
            try {
                setIsLoading(true);
                //await db.debugDB();
                await db.initDB();
                console.log("Database initialized");
                await loadLists();
                console.log("Liste erfolgreich aus DB geladen");
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false)
            }
        };
        initializeDatabase();
    }, []);

    const loadLists = async () => {
        try {
            const result = await db.getLists();
            console.log("Result: ", result)
            //setLists(result);
            setLists(result[0].rows)
        } catch (error) {
            setError(error);
        }
    };

    const addList = async (list) => {
        try {
            setIsLoading(true);
            await db.insertList(list);
            await loadLists();
            console.log("Liste erfolgreich hinzugefügt")
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }

    const deleteAllLists = async () => {
        try {
            setIsLoading(true);
            await db.deleteAllLists();
            console.log("All lists deleted")
            await loadLists(); // Läd die Listen neu, um die UI zu aktualisieren
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <DatabaseContext.Provider value={{lists,addList,loadLists,deleteAllLists}}>
            {children}
        </DatabaseContext.Provider>
    );

}