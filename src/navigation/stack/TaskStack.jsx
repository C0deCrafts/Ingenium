import {createStackNavigator} from "@react-navigation/stack";
import {Inbox, Tasks} from "../../screens";
import {useTabContext} from "../context/TabContext";
import {useCallback} from "react";
import {useFocusEffect} from "@react-navigation/native";

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
            <Stack.Screen name="Task_Stack" component={Tasks} />
            <Stack.Screen name="Inbox_Stack" component={Inbox}/>
        </Stack.Navigator>
    )
}

export default TaskStack;