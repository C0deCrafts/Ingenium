import {createStackNavigator} from "@react-navigation/stack";
import {EditTaskDetails, ListTasks} from "../../screens";
const Stack = createStackNavigator();

function ListTasksStack(){
    return (
        <Stack.Navigator initialRouteName="ListTasks_Screen"
                         screenOptions={{
                             headerShown: false
                         }}
        >
            <Stack.Screen name="ListTasks_Screen" component={ListTasks}/>
            <Stack.Screen name="EditTaskDetails_Screen" component={EditTaskDetails}/>
        </Stack.Navigator>
    )
}

export default ListTasksStack;