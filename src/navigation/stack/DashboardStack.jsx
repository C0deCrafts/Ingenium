import {createStackNavigator} from "@react-navigation/stack";
import {Dashboard} from "../../screens";
const Stack = createStackNavigator();

function DashboardStack(){
    return (
        <Stack.Navigator initialRouteName="Dashboard_Stack"
                         screenOptions={{
                             headerShown: false
                         }}
        >
            <Stack.Screen name="Dashboard_Stack" component={Dashboard} />
        </Stack.Navigator>
    )
}

export default DashboardStack;