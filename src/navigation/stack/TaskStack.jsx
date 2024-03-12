import {createStackNavigator} from "@react-navigation/stack";
import {
    CompletedTasks,
    CreateList, CreateTask, CreateTaskDetails, EditTask, EditTaskDetails,
    Inbox, ListTasks,
    TasksMain
} from "../../screens";
import {useTabContext} from "../context/TabContext";

const Stack = createStackNavigator();

//inbox evt?? navigationRef.navigate('Timetable_Tab', { screen: 'Timetable_Stack' });

function TaskStack() {
    const {drawerEnabled, setDrawerEnabled} = useTabContext();

    //console.log("??" +drawerEnabled);

    return (
        <Stack.Navigator initialRouteName="Task_Stack"
                         screenOptions={{
                             headerShown: false,
                             animationEnabled: false,
                             gestureEnabled: true
                         }}

        >
            <Stack.Screen name="Task_Stack" component={TasksMain}
                          listeners={{
                              focus: () => {
                                  return setDrawerEnabled(true);
                              }
                          }}
            />
            <Stack.Screen name="Inbox_Stack" component={Inbox}
                          listeners={{
                              focus: () => {
                                  return setDrawerEnabled(false);
                              }
                          }}
            />
            <Stack.Screen name="ListTasks_Screen" component={ListTasks}
                          listeners={{
                              focus: () => {
                                  return setDrawerEnabled(false);
                              }
                          }}

            />
            <Stack.Screen name="EditTask_Screen" component={EditTask}
                          listeners={{
                              focus: () => {
                                  return setDrawerEnabled(false);
                              }
                          }}
            />
            <Stack.Screen name="EditTaskDetails_Screen" component={EditTaskDetails}
                          listeners={{
                              focus: () => {
                                  return setDrawerEnabled(false);
                              }
                          }}
            />
            <Stack.Screen name="CreateTask_Screen" component={CreateTask}
                          listeners={{
                              focus: () => {
                                  return setDrawerEnabled(false);
                              }
                          }}
            />
            <Stack.Screen name="CreateTaskDetails_Screen" component={CreateTaskDetails}
                          listeners={{
                              focus: () => {
                                  return setDrawerEnabled(false);
                              }
                          }}
            />
            <Stack.Screen name="CreateList_Stack" component={CreateList}
                          listeners={{
                              focus: () => {
                                  return setDrawerEnabled(false);
                              }
                          }}
            />
            <Stack.Screen name="CompletedTasks_Stack" component={CompletedTasks}
                          listeners={{
                              focus: () => {
                                  return setDrawerEnabled(false);
                              }
                          }}
            />
        </Stack.Navigator>
    )
}

export default TaskStack;