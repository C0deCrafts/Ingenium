import {createStackNavigator} from '@react-navigation/stack';
import {Login, NoAccount} from "../screens";

/*
Die Komponente akzeptiert die folgenden Requisiten:Stack.Navigator

id
Optionale eindeutige ID für den Navigator. Dies kann mit navigation.getParent verwendet werden, um in einem untergeordneten Navigator auf diesen Navigator zu verweisen.

initialRouteName
Der Name der Route, die beim ersten Laden des Navigators gerendert werden soll.

screenOptions
Standardoptionen für die Bildschirme im Navigato
*/
function LoginNavigation() {
    const LoginStack = createStackNavigator();

    return (
        <LoginStack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
            <LoginStack.Screen name="Login" component={Login}/>
            <LoginStack.Screen name="NoAccount" component={NoAccount}/>
        </LoginStack.Navigator>
    )
}

export default LoginNavigation;