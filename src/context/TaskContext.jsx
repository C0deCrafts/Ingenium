import {createContext, useContext, useEffect, useState} from "react";

const TaskContext = createContext({});

export const useTask = () => useContext(TaskContext);

export const TaskProvider = ({children}) => {
    const [taskDetails, setTaskDetails] = useState({});

    const updateTaskDetails = (details) => {
        /*
        Der Code prevDetails => ({ ...prevDetails, ...details })
        in React verwendet den aktuellen Zustand (prevDetails),
        kopiert alle seine Werte und fügt dann neue oder geänderte Werte aus details hinzu.
        Das Ergebnis ist ein aktualisierter Zustand, der alle alten Werte behält,
        die nicht geändert wurden, und neue Werte hinzufügt oder bestehende Werte aktualisiert.
        */
        setTaskDetails(prevDetails => ({
            ...prevDetails, ...details
        }))
    }
    // Debugging: Zeige den aktuellen Zustand, wenn er sich ändert
    /*useEffect(() => {
        console.log("==============TaskContext: ", taskDetails);
    }, [taskDetails]);*/


    return (
        <TaskContext.Provider value={{taskDetails, updateTaskDetails}}>
            {children}
        </TaskContext.Provider>
    )
}