import {createDrawerNavigator} from '@react-navigation/drawer';
import {Contact, ProfileSettings, Settings} from "../../screens";
import BottomTabNavigator from "../tab/BottomTabNavigator";
import CustomDrawerContent from "./CustomDrawerContent";
import {useNavContext} from "../context/NavContext";

const Drawer = createDrawerNavigator();

function DrawerNavigation() {
    const {drawerEnabled} = useNavContext();

    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props}/>}
                          screenOptions={() => ({
                              headerShown: false, // disable default header
                              swipeEnabled: drawerEnabled,
                          })}
        >
            {/* Wenn keine spezifischen Aktionen bei Fokus benötigt werden, können die listeners entfernt werden */}
            <Drawer.Screen name="Dashboard_Drawer" component={BottomTabNavigator} />
            <Drawer.Screen name="Timetable_Drawer" component={BottomTabNavigator} />
            <Drawer.Screen name="Task_Drawer" component={BottomTabNavigator}/>
            {/* Direkte Navigation zu spezifischen Screens ohne Zustandsaktualisierung für Tabs */}
            <Drawer.Screen name="ProfileSettings_Drawer" component={ProfileSettings} />
            <Drawer.Screen name="Settings_Drawer" component={Settings} />
            <Drawer.Screen name="Contact_Drawer" component={Contact} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigation;