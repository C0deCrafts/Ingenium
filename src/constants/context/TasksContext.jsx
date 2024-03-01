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
 * the updated values, instead of directly mutating the state variable. For this purpose, shallow copies of the state
 * are created using the '...' spread syntax.
 *
 * ### A reducer function in general takes the following arguments:
 * (add)
 *
 * It offers the following actions for updating the taskListsState state:
 *
 * - 'TOGGLED_TASK_DONE': toggles the task.done property
 * - 'DELETED_TASK':
 * - 'DELETED_LIST':
 * - 'CREATED_TASK':
 * - 'EDITED_TASK':
 * - 'CREATED_LIST':
 *
 * Care is required regarding the Switch Case statement - as each action needs to
 * return a state, so that the cases do not fall through
 * the state needs to be valid - as the Screens using the state depend on the state
 * having the same valid structure after an update.
 *
 * @param taskListsState
 * @param action {object} holding the action type,which is executed, as well as additional data, needed to execute
 *                        the action. For each type the required data is specified in the description of the action.type
 *                        inside the reducer function.
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

            /*
            Destructures the taskId of the task which was toggled, from the action object passed
            to the dispatch function.
            */
            const {taskId} = action;

            /*
            ERROR HANDLING:
            TREATS THE CASE IF NO TASKID WAS PASSED TO THE ACTION OBJECT:
            Checks if the taskId was passed to the action object. If not returns the unchanged state,
            as the action can not be executed without the taskId.
             */
            if(!taskId) {
                console.error("Invalid action object passed to action: 'TOGGLED_TASK_DONE' - taskId is expected");
                return [...taskListsState];
            }

            console.log("INSIDE TASKSREDUCER: action 'TOGGLED_TASK_DONE'");
            console.log("Task which will be updated has the id: ", taskId);

            /*****************1) find list and task which need an update in taskListsState*****************************/
            /*
            Finds the list the task belongs to.
            Find iterates through the taskListsState and returns the first list from the array that
            satisfies the testing condition.

            Testing condition: Find iterates through the tasks of the current list and returns  the first task, where the
            id matches the taskId.

            OUTCOME:
            If a task with the taskId is found within a list, the outer find returns that entire list, which is
            assigned to listToUpdate. If the task is not found in any list, listToUpdate will be undefined.
             */
            const listToUpdate = taskListsState.find(list => list.tasks.find(task => task.id === taskId));

            /*
            ERROR HANDLING:
            TREATS THE CASE IF NO LIST WAS FOUND - if listToUpdate is undefinded.
            Undefined is a falsy value in JavaScript.
            If listToUpdate is undefined (falsy) - !listToUpdate will return true.
            Since the action can not be performed if listToUpdate is undefined, the if-code-block will be
            entered and the action will return the unchanged state.

            This step also verifies, that a task with taskId exists, as the list will be undefined if no task
            could be found. So the task can be saved to a variable taskToUpdate without further verification.
             */
            if(!listToUpdate) {
                console.error("The list or the task could not be found!");
                return [...taskListsState];
            }
            console.log("List which will be updated: ", listToUpdate);

            /*
            Saves the task with taskId to variable taskToUpdate.
             */
            const taskToUpdate = listToUpdate.tasks.find(task => task.id === taskId);


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

            /****5) create a copy of the taskListsState and replace the corresponding list with the updated list**************/
            //create a copy of the taskListsState with map
            //in which the listToUpdate is replaced with newTasksList
            const newTaskListsState = taskListsState.map(tasksList => tasksList.id === listToUpdate.id ? newTasksList : tasksList);
            console.log("The final updated state of action 'TOGGLED_TASK_DONE' is: ", newTaskListsState);

            return newTaskListsState;
        }

        case 'DELETED_TASK': {

            /*
           Destructures the taskId of the task which was toggled, from the action object passed
           to the dispatch function.
            */
            const {taskId} = action;

            /*
            ERROR HANDLING:
            TREATS THE CASE IF NO TASKID WAS PASSED TO THE ACTION OBJECT:
            Checks if the taskId was passed to the action object. If not returns the unchanged state,
            as the action can not be executed without the taskId.
             */
            if(!taskId) {
                console.error("Invalid action object passed to action: 'DELETED TASK' - taskId is expected");
                return [...taskListsState];
            }

            /*****************1) find list and task which need an update in taskListsState*****************************/
            /*
            Finds the list the task belongs to.
            Find iterates through the taskListsState and returns the first list from the array that
            satisfies the testing condition.

            Testing condition: Find iterates through the tasks of the current list and returns  the first task, where the
            id matches the taskId.

            OUTCOME:
            If a task with the taskId is found within a list, the outer find returns that entire list, which is
            assigned to listToUpdate. If the task is not found in any list, listToUpdate will be undefined.
             */
            const listToUpdate = taskListsState.find(list => list.tasks.find(task => task.id === taskId));

            /*
            ERROR HANDLING:
            TREATS THE CASE IF NO LIST WAS FOUND - if listToUpdate is undefinded.
            Undefined is a falsy value in JavaScript.
            If listToUpdate is undefined (falsy) - !listToUpdate will return true.
            Since the action can not be performed if listToUpdate is undefined, the if-code-block will be
            entered and the action will return the unchanged state.
             */
            if(!listToUpdate) {
                console.error("The list or the task could not be found!");
                return [...taskListsState];
            }

            /****2) Create a new Tasks Array by removing the task from listToUpdate with filtering*********/
            const newTasksArray = listToUpdate.tasks.filter(task => task.id !== taskId);

            console.log("Inside 'DELETED_TASK': After filtering the listToUpdate.tasks to newTasksArray: ", newTasksArray)

            /****3) Create a new TasksList object containing the updated TasksArray**************/
            const newTasksList = {
                ...listToUpdate,
                tasks: newTasksArray
            }

            /****5) Create a new taskListsState in which the corresponding list is replaced with the updated list**************/
            /*
            Creates a new taskListsStateArray with map in which the listToUpdate is replaced with newTasksList.

            Iterates through the original taskListsState array using the map method. Applies a function to each tasksList,
            which checks if the current tasksList's id matches the id of the listToUpdate.
            If the condition is true, it replaces the current tasksList with the newTasksList. If the condition is false
            the current tasksList is kept unchanged.
             */
            const newTaskListsState = taskListsState.map(tasksList => tasksList.id === listToUpdate.id ? newTasksList : tasksList);
            console.log("The final updated state of action 'DELETED_TASK' is: ", newTaskListsState);


            return newTaskListsState;
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}



