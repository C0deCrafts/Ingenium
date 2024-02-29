import {useState, createContext, useContext, useReducer} from 'react';
import dummyDataTasks from "../../assets/dummydata/dummyDataTasks";
import {ICONS} from "../icons";
import {COLOR} from "../styleSettings";

/**
Creates a context for all the tasks data, which needs to be shared across the task Screens
providing a shared taskListsState and a dispatch function for triggering state updates based on an action
 */
const TasksContext = createContext(null);

/**
 * **useTasks:** A custom Hook for usage of the context inside the Screens which need to access
 * the taskListsState and the dispatch function to update the state
 */
export const useTasks = () => {
    return useContext(TasksContext);
};

/****TEST DATA***/
//variable initialized with the imported dummydata for taskLists
const taskListsData = dummyDataTasks;

//less data to test the reducer functions
const testData = [
    {
        id: 1,
        title: 'Programmieren',
        icon: ICONS.TASKICONS.CODE,
        color: COLOR.ICONCOLOR_CUSTOM_AQUA,
        tasks: [
            { id: 1, title: 'Webseitenprojekt', notes: 'Interaktive Webseite mit HTML, CSS und JavaScript entwickeln.', dueDate: '2024-03-15', done: true },
            { id: 2, title: 'Algorithmus implementieren', notes: 'Bubble-Sort-Algorithmus in Java implementieren.', dueDate: '2024-03-10', done: false },
        ]
    },
    {
        id: 2,
        title: 'Netzwerktechnik',
        icon: ICONS.TASKICONS.HIERARCHY,
        color: COLOR.ICONCOLOR_CUSTOM_DARKGREEN,
        tasks: [
            { id: 3, title: 'Netzwerktopologie entwerfen', notes: 'Netzwerktopologie für ein kleines Bürogebäude entwerfen.', dueDate: '2024-03-22', done: true },
            { id: 4, title: 'Lernen wie man ACLs implementiert', notes: 'PackettracerÜbungen zu ACLs machen.', dueDate: '2024-03-12', done: false },
        ]
    },
];

/**
 * A TaskProvider Component which needs to be wrapped around the Components which need to access and change the tasksState
 */
export const TasksProvider = ({children}) => {
    /**
     * useReducer Hook
     * ### it returns the following:
     *- the current state
     *- a dispatch function which needs to be called with an action object
     * to trigger the state update defined in the tasksReducer function
     * it takes two arguments:
     * - **reducer**: the tasksReducer function: defines how the state is updated based on the action type passed to dispatch
     * - **initialArg**: the value from which the initial state is calculated
     * the third argument is optional as mentioned in React documentation - IntelliJ expects all three for some reason?
     */
    const [taskListsState, dispatch] = useReducer(
        tasksReducer,
        taskListsData
    );


    //use helper functions for updating the state ??

    return (
        <TasksContext.Provider value={{taskListsState, dispatch}}>
            {children}
        </TasksContext.Provider>
    );
};


/**
 * # TASKSREDUCER
 * The tasksReducer is a reducer function and performs taskListsState updates based on the chosen action.
 *
 * ## PRINCIPLES:
 * - It assumes that each list and each task in the data structure have a unique id.
 * - As immutability of state is required by React and React Native, we always need to return copies of the state, holding
 * the updated values, instead of making direct changes to the state variable.
 *
 * ### A reducer function in general takes the following arguments:
 *
 * It offers the following actions for updating the taskListsState state:
 *
 * - 'TOGGLED_TASK_DONE': toggles the task.done property
 * - 'CREATED_TASK':
 * - 'EDITED_TASK':
 * - 'DELETED_TASK':
 * - 'CREATED_LIST':
 * - 'DELETED_LIST':
 *
 * Care is required regarding the Switch Case statement - as each action needs to
 * return a state, so that the cases do not fall through
 * the state needs to be valid - as the Screens using the state depend on the state
 * having the same valid structure after an update.
 *
 * @param taskListsState
 * @param action
 * @returns {*[]}
 */
function tasksReducer(taskListsState, action) {
    switch (action.type) {
        case 'TOGGLED_TASK_DONE': {
            /**
             * action.type: 'TOGGLED_TASK_DONE:
             * **This action type needs toggles the task.done property (if true set to false and vice versa)**
             *
             * **It requires the following arguments passed to dispatch:**
             *
             * dispatch({
             *             type: 'toggled_task_done',
             *             taskId: taskId,
             *         })
             *
             * HOW THE UPDATE IS ACHIEVED:
             * All lists in the taskListsState need to stay the same accept the list holding the task which was toggled.
             * This list will be replaced, with an updated list.
             *
             * Steps to achieve this, by adhering to the principle of immutability of arrays stored in state:
             *
             * 1) find list and task which need an update in taskListsState
             * --> if not found, log an error & return unchanged state
             *
             * 2) create a copy of the task which needs an update, and toggle its property done --> updated task
             *
             * 3) create a copy of the tasksArray,and replace the task with the updated task --> updated tasks array
             *
             * 4) create a copy of the list, and replace the tasks array with the updated tasks array --> updated tasksList
             *
             * 5) create a copy of the taskListsState, and replace the list to update with the updated list  --> updated taskListsState
             *
             * Error handling:
             *
             */

            //destructure the taskId of the task which was toggled, from the action object passed to dispatch(action)
            const {taskId} = action;

            //check if task Id was passed to action object
            //if no task Id was passed return the unchanged state
            if(!taskId) {
                console.error("Invalid action object passed to action: 'toggled_task_done' - taskId is expected");
                return [...taskListsState];
            }

            console.log("INSIDE TASKSREDUCER: action toggled_task_done");
            console.log("Task which will be updated has id: ", taskId);

            /*****************1) find list and task which need an update in taskListsState*****************************/
            /*
            Action: Find the list the task belongs to.
            Uses the find method which will return the first list from the array that
            satisfies the testing condition.
            Testing condition: uses the some method, which will check if a task in the lists task array
            has the id we are looking for - if so it returns true.
            Means that the first list whose testing condition returns true, will be assigned to listToUpdate
             */
            const listToUpdate = taskListsState.find(list => {
                return list.tasks.some(task => task.id === taskId);
            });

            //check if a list was found - if not return the unchanged state
            if(!listToUpdate) {
                console.error("The list where the task belongs to could not be found!");
                return [...taskListsState];
            }
            console.log("List which will be updated: ", listToUpdate);

            //find the task which needs to be updated in the list
            const taskToUpdate = listToUpdate.tasks.find(task => task.id === taskId);

            //check if the task was found - if not return the unchanged state
            if(!taskToUpdate) {
                console.error("The task with id {taskId} could not be found", taskId);
                return [...taskListsState];
            }

            /****2) create a copy of the task and toggle the property done*********/
            const newTask = {
                ...taskToUpdate,
                done: !taskToUpdate.done
            }

            /****3) create a copy of the tasksArray,and replace the task with the updated task************************/
            /*create a copy of the tasksArray which needs to be updated and add the newTask, using the map method
            if the taskId is the one we look for > the newTask is returned
            else the same task is kept
             */
            const newTasksArray = listToUpdate.tasks.map(task => task.id === taskId ? newTask : task);

            /****4) create a copy of the list, and replace the tasks array with the updated tasks array**************/
            /*
            create a copy of the list which needs to be updated, using spread syntax
            and change the tasksArray to the updated tasksArray
             */
            const newTasksList = {
                ...listToUpdate,
                tasks: newTasksArray,
            }

            console.log("The updated list - newTasksList: ", newTasksList);

            /****5) create a copy of the taskListsState and replace the list to update with the updated list**************/
            //create a copy of the taskListsState with map
            //in which the listToUpdate is replaced with newTasksList
            const newTaskListsState = taskListsState.map(tasksList => tasksList.id === listToUpdate.id ? newTasksList : tasksList);
            console.log('The final updated state of action toggle_task_done is: ', newTaskListsState);

            return newTaskListsState;
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}



