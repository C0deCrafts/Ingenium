import {createStackNavigator} from "@react-navigation/stack";
import {
    CompletedTasks,
    CreateList,
    Inbox,
    TasksMain
} from "../../screens";
import {useTabContext} from "../context/TabContext";
import {useCallback} from "react";
import {useFocusEffect} from "@react-navigation/native";
import CreateTaskStack from "./CreateTaskStack";
import ListTasksStack from "./ListTasksStack";

const Stack = createStackNavigator();
function TaskStack({ navigation }){
    const { currentRoute } = useTabContext();

    useFocusEffect(
        useCallback(() => {
            if (currentRoute === "Notification_Tab") {
                navigation.navigate('Inbox_Stack');
            }
        }, [currentRoute, navigation])
    );
    //console.log(currentRoute + "ist nicht TAB sondern Drawer also Taskstack")
    return (
        <Stack.Navigator initialRouteName="Task_Stack"
                         screenOptions={{
                             headerShown: false
                         }}
        >
            <Stack.Screen name="Task_Stack" component={TasksMain} />
            <Stack.Screen name="Inbox_Stack" component={Inbox}/>
            <Stack.Screen name="ListTasks_Stack" component={ListTasksStack}/>
            <Stack.Screen name="CreateTask_Stack" component={CreateTaskStack}/>
            <Stack.Screen name="CreateList_Stack" component={CreateList}/>
            <Stack.Screen name="CompletedTasks_Stack" component={CompletedTasks}/>
        </Stack.Navigator>
    )
}

export default TaskStack;