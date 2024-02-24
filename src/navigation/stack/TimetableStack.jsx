import {createStackNavigator} from "@react-navigation/stack";
import {Timetable} from "../../screens";

const Stack = createStackNavigator();

function TimetableStack(){
    return (
        <Stack.Navigator initialRouteName="Timetable_Stack"
                         screenOptions={{
                             headerShown: false,
                             animationEnabled: false,
                             gestureEnabled: true
                         }}
        >
            <Stack.Screen name="Timetable_Stack" component={Timetable} />
        </Stack.Navigator>
    )
}

export default TimetableStack;