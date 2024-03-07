import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TaskStack from "../stack/TaskStack";
import DashboardStack from "../stack/DashboardStack";
import TimetableStack from "../stack/TimetableStack";
import {useTabContext} from "../context/TabContext";
import Icon from "../../components/Icon";
import {ICONS} from "../../constants/icons";
import {DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import {useTheme} from "../../context/ThemeContext";

const Tab = createBottomTabNavigator();

/**
 * ### BottomTabNavigator Component
 *
 * This component creates a bottom tab navigator using React Navigation.<p>
 * It includes tabs for tasks, dashboard, and timetable.
 *
 * @returns {JSX.Element} - The rendered bottom tab navigator
 *
 * @example
 * // Import the BottomTabNavigator component
 * import BottomTabNavigator from "../../navigation/tab/BottomTabNavigator";
 * // Inside your component's render method, use the BottomTabNavigator component like this:
 * <BottomTabNavigator />
 * // This will render the bottom tab navigator with tabs for tasks, dashboard, and timetable.
 *
 * @description
 * The BottomTabNavigator component sets up a bottom tab navigator using React Navigation. It consists of several tabs, each with its own configuration.
 *
 * ## Configuration:
 * - `initialRouteName`: Specifies the initial tab to be displayed.
 * - `screenOptions`: Configures the appearance of the tab bar.
 *
 * ## Tab Screens:
 * - `Timetable_Tab`: Displays "TimetableStack".
 * - `Dashboard_Tab`: Displays "DashboardStack".
 * - `Notification_Tab`: Displays "TaskStack" and opens the Inbox screen directly on top of the Task screen.
 *
 * ## Tab Screen Options:
 * - `tabBarLabel`: Specifies the label text for the tab.
 * - `tabBarBadge`: Displays a badge with a numerical value indicating notifications.
 * - `tabBarIcon`: Renders an icon for the tab.
 */
function ButtonTabNavigator() {
    const { theme } = useTheme();
    const isDarkMode = theme === DARKMODE;

    const {navigateAndSetSelectedTab} = useTabContext();

    const badge = 3; //notification symbol + wert

    return (
        <Tab.Navigator initialRouteName="Dashboard_Tab" screenOptions={{
            headerShown: false,
            tabBarStyle: {
                backgroundColor: isDarkMode ? DARKMODE.BACKGROUNDCOLOR : LIGHTMODE.BACKGROUNDCOLOR,
                borderTopWidth: 0, //border IOS
                elevation: 0, //border Android
                //height: SIZES.BOTTOM_TAB_BAR_HEIGHT
                marginBottom: SIZES.BOTTOM_TAB_BAR_HEIGHT,
            },
            tabBarLabelStyle: {
              fontSize: SIZES.BOTTOM_TAB_LABEL_SIZE,
            },
            tabBarActiveTintColor: isDarkMode ? DARKMODE.ICONCOLOR_ACTIVE : LIGHTMODE.ICONCOLOR_ACTIVE,
            tabBarInactiveTintColor: isDarkMode ? DARKMODE.ICONCOLOR_INACTIVE : LIGHTMODE.ICONCOLOR_INACTIVE,
        }}>
            <Tab.Screen name="Timetable_Tab"
                        component={TimetableStack}
                        listeners={{
                            focus: () => {
                                navigateAndSetSelectedTab("Timetable_Tab", "Timetable_Stack")
                            },
                        }}
                        options={{
                            tabBarLabel: "Stundenplan",
                            tabBarIcon: ({color, size, focused}) => (
                                <Icon name={focused ? ICONS.TIMETABLE.ACTIVE : ICONS.TIMETABLE.INACTIVE}
                                      size={size}
                                      color={color}
                                />
                            ),
                        }}
            />
            <Tab.Screen name="Dashboard_Tab"
                        component={DashboardStack}
                        listeners={{
                            focus: () => {
                                navigateAndSetSelectedTab("Dashboard_Tab", "Dashboard_Stack")
                            },
                        }}
                        options={{
                            tabBarLabel: "Dashboard",
                            tabBarIcon: ({color, size, focused}) => (
                                <Icon name={focused ? ICONS.DASHBOARD.ACTIVE : ICONS.DASHBOARD.INACTIVE}
                                      size={size}
                                      color={color}
                                />
                            ),
                        }}
            />
            <Tab.Screen name="Notification_Tab"
                        component={TaskStack}
                        listeners={{
                            focus: () => {
                                navigateAndSetSelectedTab("Notification_Tab", "Task_Stack")
                            },
                        }}
                        options={{
                            tabBarLabel: "Mitteilung",
                            tabBarBadge: badge,
                            tabBarIcon: ({color, size, focused}) => (
                                <Icon name={focused ? ICONS.NOTIFICATION.ACTIVE : ICONS.NOTIFICATION.INACTIVE}
                                      size={size}
                                      color={color}
                                />
                            ),
                        }}
            />
        </Tab.Navigator>
    )
}


export default ButtonTabNavigator;