import {useState, createContext, useContext} from 'react';
import dummyDataTasks from "../../assets/dummydata/dummyDataTasks";

/*
A shared context for all the tasks data, which needs to be shared across the task Screens
 */

//Create context for task data
const TasksContext = createContext();

//Create and export a Hook for usage of the context
export const useTasks = () => {
    return useContext(TasksContext);
};

//Create a TaskProvider Component to wrap it around the Components which need the access to the tasksState
export const TasksProvider = ({children}) => {
    //useState is initialized with dummy data for the tasks
    const [taskLists, setTaskLists] = useState(dummyDataTasks);

    //here we could maybe centrally add functions for adding, deleting, updating tasks
    //as well as adding and updating lists
    return (
        <TasksContext.Provider value={{taskLists, setTaskLists}}>
            {children}
        </TasksContext.Provider>
    );

};