import {createStackNavigator} from "@react-navigation/stack";
import {CreateTask, CreateTaskDetails, Dashboard} from "../../screens";
const Stack = createStackNavigator();

function CreateTaskStack(){
    return (
        <Stack.Navigator initialRouteName="CreateTask_Screen"
                         screenOptions={{
                             headerShown: false
                         }}
        >
            <Stack.Screen name="CreateTask_Screen" component={CreateTask}/>
            <Stack.Screen name="CreateTaskDetails_Screen" component={CreateTaskDetails}/>
        </Stack.Navigator>
    )
}

export default CreateTaskStack;