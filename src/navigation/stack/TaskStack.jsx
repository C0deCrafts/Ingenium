import {createStackNavigator} from "@react-navigation/stack";
import {
    CompletedTasks,
    CreateList, CreateTask, CreateTaskDetails, EditTask, EditTaskDetails,
    Inbox, ListTasks,
    TasksMain
} from "../../screens";

const Stack = createStackNavigator();

function TaskStack({navigation}) {
    /*const { currentRoute } = useTabContext();

    useFocusEffect(
        useCallback(() => {
            if (currentRoute === "Notification_Tab") {
                navigation.navigate('Inbox_Stack');
            }
        }, [currentRoute, navigation])
    );*/
    //console.log(currentRoute + "ist nicht TAB sondern Drawer also Taskstack")
    return (
        <Stack.Navigator initialRouteName="Task_Stack"
                         screenOptions={{
                             headerShown: false
                         }}
        >
            <Stack.Screen name="Task_Stack" component={TasksMain}/>
            <Stack.Screen name="Inbox_Stack" component={Inbox}/>
            <Stack.Screen name="ListTasks_Screen" component={ListTasks}/>
            <Stack.Screen name="EditTask_Screen" component={EditTask}/>
            <Stack.Screen name="EditTaskDetails_Screen" component={EditTaskDetails}/>
            <Stack.Screen name="CreateTask_Screen" component={CreateTask}/>
            <Stack.Screen name="CreateTaskDetails_Screen" component={CreateTaskDetails}/>
            <Stack.Screen name="CreateList_Stack" component={CreateList}/>
            <Stack.Screen name="CompletedTasks_Stack" component={CompletedTasks}/>
        </Stack.Navigator>
    )
}

export default TaskStack;