import {createContext, useContext, useReducer} from 'react';
import dummyDataTasks from "../../assets/dummydata/dummyDataTasks";

/* Improvements:
further improvement of comment structure
adapt the code to reflect the structure of data in the database
error handling in the useTasks hook (if not used in provider? if context null?)
 */

/**
 * Creates a context to manage task data across task screens.
 * Provides a shared state (`taskListsState`) and a dispatch function
 * to trigger state updates based on actions.
 */
const TasksContext = createContext(null);


/**
 * Custom hook to access the tasks context state and the dispatch functions for state updates
 * from components that need to manage tasks.
 */

export const useTasks = () => {
    return useContext(TasksContext);
};


// Initialize task data with imported dummy data
const taskListsData = dummyDataTasks;

/**
 * A TaskProvider Component which needs to be wrapped around the Components which need to access and change the tasksState
 */
export const TasksProvider = ({children}) => {

    /**
     * useReducer Hook
     * ###  - Returns current state and a dispatch function.
     *- the current state
     * - The dispatch function triggers state updates based on the action object
     * passed to it.
     * it takes two arguments:
     * - **reducer**: the tasksReducer function: defines how the state is updated based on the action type passed to dispatch
     * - **initialArg**: the value from which the initial state is calculated
     * the third argument is optional
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
 * The tasksReducer is a reducer function and performs taskListsState updates based on the action passed to it.
 *
 * ## ASSUMPTIONS:
 * - Each list and each task in the data structure must have a unique id.
 * - React requires immutable state updates. This means that state should not be directly mutated, but instead a new state array/object
 * has to be returned. The spread syntax (`...`) is used for shallow copying.
 * Therefore, the reducer always returns:
 *  *   a new state object with updated values instead of mutating the existing state.
 *
 *
 * @param taskListsState  The current state of task lists.
 * @param action {object} An Object containing the action type, which should be executed, as well as additional data, needed to execute
 *                        that specific action. For each action type the required data is specified in the description of the action types
 *                        offered by the reducer function.
 * @returns {*[]}         The updated taskListsState array.
 *
 * The tasksReducer offers the following  action types for updating the taskListsState state:
 *
 * - **'TOGGLED_TASK_DONE':** toggles the task.done property <br>
 * **It requires the following arguments passed to dispatch:**
 *
 * dispatch({
 *             type: 'TOGGLED_TASK_DONE',
 *             taskId: taskId,
 *         });
 *
 * - **'DELETED_TASK':** deletes the task from taskListsState
 *
 * **It requires the following arguments passed to dispatch:**
 *
 * dispatch({
 *             type: 'DELETED_TASK',
 *             taskId: taskId,
 *         });
 *
 * - **'DELETED_LIST':** deletes the list from taskListsState
 *
 * **It requires the following arguments passed to dispatch:**
 *
 * dispatch({
 *              type: 'DELETED_LIST',
 *              tasksListId: tasksListId,
 *          });
 *
 * - **'CREATED_TASK':** adds a new task to chosen list in taskListsState
 * - **'EDITED_TASK':** updates the task in taskListsState
 * - **'CREATED_LIST':** creates a new list in taskListsState
 *
 * Care is required regarding the Switch Case statement - as each action needs to
 * return a state, so that the cases do not fall through
 * the state needs to be valid - as the Screens using the state depend on the state
 * having the same valid structure after an update.
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
             * **All lists in the taskListsState need to stay the same accept the list holding the task which was toggled.
             * This list will be replaced, with an updated list.**
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
             */

            /*
            Destructures the taskId of the task from the action object passed
            to the dispatch function. This is the id of the task which should be set to either done === false or
            done === true. (toggle done property)
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
           Destructures the taskId from the action object passed
           to the dispatch function. This is the id of the task which should be deleted.
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

            /****4) Create a new taskListsState in which the corresponding list is replaced with the updated list**************/
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
        case 'DELETED_LIST': {

            /*
           Destructures the taskListId of the task which was toggled, from the action object passed
           to the dispatch function. This is the id of the list which should be deleted.
            */
            const {tasksListId} = action;

            /*
            ERROR HANDLING:
            TREATS THE CASE IF NO TASKLISTID WAS PASSED TO THE ACTION OBJECT:
            Checks if the taskListId was passed to the action object. If not returns the unchanged state,
            as the action can not be executed without the listId.
             */
            if(!tasksListId) {
                console.error("Invalid action object passed to action: 'DELETED TASK' - tasksListId is expected");
                return [...taskListsState];
            }

            /*****************1) return an updated taskListsState by removing the deleted list with filtering*****************************/
            /**
             * Create and return a new state by filtering out the list with the taskListId.
             * Filter iterates through the taskListsState Array and returns a shallow copy, containing
             * just the taskLists which do not have the given tasksListId.
             */
            return taskListsState.filter(tasksList => tasksList.id !== tasksListId);
        }
        default: {
            throw Error('Unknown action');
        }
    }
}



