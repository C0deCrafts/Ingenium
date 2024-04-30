import {Text, TouchableOpacity, StyleSheet, View, Image} from 'react-native';
import * as WebBrowser from "expo-web-browser"
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useNavContext } from "../context/NavContext";
import {DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import Icon from "../../components/Icon";
import {ICONS} from "../../constants/icons";
import {useTheme} from "../../context/ThemeContext";
import {useAuth} from "../../context/AuthContext";
import {useState} from "react";
import LoadingComponent from "../../components/LoadingComponent";

const CustomDrawerContent = ({navigation}) => {
    const insets = useSafeAreaInsets();
    const { theme } = useTheme();
    const isDarkMode = theme === DARKMODE;

    const [loading, setLoading] = useState(false);

    const {logout, token} = useAuth();

    const { currentRoute, navigateAndSetSelectedTab } = useNavContext();
    const styles = getStyles(insets);

    const handleLogout = async () => {
        //Schließe den Drawer
        //löst hoffentlich das Problem, dass manchmal der Drawer geöffnet ist, wenn man sich schnell
        //auslogged und wieder einlogged
        //muss ausreichend getestet werden - der Fehler tritt nur sehr selten auf
        setLoading(true);
        navigation.closeDrawer();
        setTimeout(async ()=> {
            await logout();
            setLoading(false)
        }, 250);
    }

    if (loading) {
        return (
            <LoadingComponent message={"Du wirst gerade ausgelogged..."}/>
        );
    }

    return (
        <View style={isDarkMode ? styles.drawerContainerDark : styles.drawerContainerLight}>
            <View style={styles.drawerHeader}>
                <TouchableOpacity onPress={navigation.closeDrawer}>
                    <Icon name={ICONS.CLOSE.INACTIVE}
                          size={SIZES.CLOSE_BUTTON_ICON_SIZE}
                          color={isDarkMode ? DARKMODE.ICONCOLOR_INACTIVE : LIGHTMODE.ICONCOLOR_INACTIVE}
                    />
                </TouchableOpacity>
            </View>
            <DrawerContentScrollView contentContainerStyle={styles.drawerContent}>
                {/* benutzerdefinierten Drawer-Items zur navigation zwischen Drawer und Tab */}
                <View style={isDarkMode ? styles.drawerSectionDark : styles.drawerSectionLight}>
                    <TouchableOpacity onPress={() => navigateAndSetSelectedTab('Dashboard_Tab')}
                                      style={currentRoute === 'Dashboard_Tab'
                                          ? isDarkMode ? styles.drawerItemsSelectedDark : styles.drawerItemsSelectedLight
                                          : isDarkMode ? styles.drawerItemsDark : styles.drawerItemsLight
                    }
                    >
                        <Icon name={currentRoute === 'Dashboard_Tab' ? ICONS.DASHBOARD.ACTIVE : ICONS.DASHBOARD.INACTIVE}
                              size={SIZES.DRAWER_ICONS_SIZE}
                              color={isDarkMode ? DARKMODE.ICONCOLOR_INACTIVE : LIGHTMODE.ICONCOLOR_INACTIVE}

                        />
                        <Text style={currentRoute === 'Dashboard_Tab' ?
                            isDarkMode ? styles.drawerItemTextSelectedDark : styles.drawerItemTextSelectedLight :
                            isDarkMode ? styles.drawerItemTextDark : styles.drawerItemTextLight}>Dashboard</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigateAndSetSelectedTab('Timetable_Tab')}
                                      style={currentRoute === 'Timetable_Tab'
                                          ? isDarkMode ? styles.drawerItemsSelectedDark : styles.drawerItemsSelectedLight
                                          : isDarkMode ? styles.drawerItemsDark : styles.drawerItemsLight
                    }
                    >
                        <Icon name={currentRoute === 'Timetable_Tab' ? ICONS.TIMETABLE.ACTIVE : ICONS.TIMETABLE.INACTIVE}
                              size={SIZES.DRAWER_ICONS_SIZE}
                              color={isDarkMode ? DARKMODE.ICONCOLOR_INACTIVE : LIGHTMODE.ICONCOLOR_INACTIVE}/>
                        <Text style={currentRoute === 'Timetable_Tab' ?
                            isDarkMode ? styles.drawerItemTextSelectedDark : styles.drawerItemTextSelectedLight :
                            isDarkMode ? styles.drawerItemTextDark : styles.drawerItemTextLight}>Stundenplan</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigateAndSetSelectedTab('Task_Tab')}
                                      style={currentRoute === 'Task_Tab'
                                          ? isDarkMode ? styles.drawerItemsSelectedDark : styles.drawerItemsSelectedLight
                                          : isDarkMode ? styles.drawerItemsDark : styles.drawerItemsLight
                    }
                    >
                        <Icon name={currentRoute === 'Task_Tab' ? ICONS.TASKS.ACTIVE : ICONS.TASKS.INACTIVE}
                              size={SIZES.DRAWER_ICONS_SIZE}
                              color={isDarkMode ? DARKMODE.ICONCOLOR_INACTIVE : LIGHTMODE.ICONCOLOR_INACTIVE}/>
                        <Text style={currentRoute === 'Task_Tab' ?
                            isDarkMode ? styles.drawerItemTextSelectedDark : styles.drawerItemTextSelectedLight :
                            isDarkMode ? styles.drawerItemTextDark : styles.drawerItemTextLight}>Aufgaben</Text>
                    </TouchableOpacity>

                    {/* Drawer-Items zur navigation zu einzelnen screens */}
                    <TouchableOpacity onPress={() => navigateAndSetSelectedTab('ProfileSettings_Drawer')}
                                      style={currentRoute === 'ProfileSettings_Drawer'
                                              ? isDarkMode ? styles.drawerItemsSelectedDark : styles.drawerItemsSelectedLight
                                              : isDarkMode ? styles.drawerItemsDark : styles.drawerItemsLight
                    }
                    >
                        <Icon name={currentRoute === 'ProfileSettings_Drawer' ? ICONS.ACCOUNT_SETTINGS.ACTIVE : ICONS.ACCOUNT_SETTINGS.INACTIVE}
                              size={SIZES.DRAWER_ICONS_SIZE}
                              color={isDarkMode ? DARKMODE.ICONCOLOR_INACTIVE : LIGHTMODE.ICONCOLOR_INACTIVE}/>
                        <Text style={currentRoute === 'ProfileSettings_Drawer' ?
                            isDarkMode ? styles.drawerItemTextSelectedDark : styles.drawerItemTextSelectedLight :
                            isDarkMode ? styles.drawerItemTextDark : styles.drawerItemTextLight}>Profil bearbeiten</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigateAndSetSelectedTab('Settings_Drawer')}
                                      style={currentRoute === 'Settings_Drawer'
                                              ? isDarkMode ? styles.drawerItemsSelectedDark : styles.drawerItemsSelectedLight
                                              : isDarkMode ? styles.drawerItemsDark : styles.drawerItemsLight
                    }
                    >
                        <Icon name={currentRoute === 'Settings_Drawer' ? ICONS.SETTINGS.ACTIVE : ICONS.SETTINGS.INACTIVE}
                              size={SIZES.DRAWER_ICONS_SIZE}
                              color={isDarkMode ? DARKMODE.ICONCOLOR_INACTIVE : LIGHTMODE.ICONCOLOR_INACTIVE}/>
                        <Text style={currentRoute === 'Settings_Drawer' ?
                            isDarkMode ? styles.drawerItemTextSelectedDark : styles.drawerItemTextSelectedLight :
                            isDarkMode ? styles.drawerItemTextDark : styles.drawerItemTextLight}>Einstellungen</Text>
                    </TouchableOpacity>
                </View>
                <View style={isDarkMode ? styles.drawerSectionDark : styles.drawerSectionLight}>
                    <TouchableOpacity onPress={() => WebBrowser.openBrowserAsync("https://ilias.ingenium.co.at/")} style={isDarkMode ? styles.drawerItemsDark : styles.drawerItemsLight}>
                        <Icon name={ICONS.LINK.ACTIVE}
                              size={SIZES.DRAWER_ICONS_SIZE}
                              color={isDarkMode ? DARKMODE.ICONCOLOR_INACTIVE : LIGHTMODE.ICONCOLOR_INACTIVE}/>
                        <Text style={isDarkMode ? styles.drawerItemTextDark : styles.drawerItemTextLight}>ILIAS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => WebBrowser.openBrowserAsync("https://www.ingenium.co.at/")} style={isDarkMode ? styles.drawerItemsDark : styles.drawerItemsLight}>
                        <Icon name={ICONS.LINK.ACTIVE}
                              size={SIZES.DRAWER_ICONS_SIZE}
                              color={isDarkMode ? DARKMODE.ICONCOLOR_INACTIVE : LIGHTMODE.ICONCOLOR_INACTIVE}/>
                        <Text style={isDarkMode ? styles.drawerItemTextDark : styles.drawerItemTextLight}>Ingenium Education</Text>
                    </TouchableOpacity>
                </View>
                <View style={isDarkMode ? styles.drawerSectionDark : styles.drawerSectionLight}>
                    <TouchableOpacity onPress={() => navigateAndSetSelectedTab('Contact_Drawer')}
                                      style={currentRoute === 'Contact_Drawer'
                                          ? isDarkMode ? styles.drawerItemsSelectedDark : styles.drawerItemsSelectedLight
                                          : isDarkMode ? styles.drawerItemsDark : styles.drawerItemsLight
                    }
                    >
                        <Icon name={currentRoute === 'Contact_Drawer' ? ICONS.CONTACT.ACTIVE : ICONS.CONTACT.INACTIVE}
                              size={SIZES.DRAWER_ICONS_SIZE}
                              color={isDarkMode ? DARKMODE.ICONCOLOR_INACTIVE : LIGHTMODE.ICONCOLOR_INACTIVE}/>
                        <Text style={currentRoute === 'Contact_Drawer' ?
                            isDarkMode ? styles.drawerItemTextSelectedDark : styles.drawerItemTextSelectedLight :
                            isDarkMode ? styles.drawerItemTextDark : styles.drawerItemTextLight}>Kontakt</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleLogout} style={isDarkMode ? styles.drawerItemsDark : styles.drawerItemsLight}>
                        <Icon name={ICONS.LOGOUT.ACTIVE}
                              size={SIZES.DRAWER_ICONS_SIZE}
                              color={isDarkMode ? DARKMODE.ICONCOLOR_INACTIVE : LIGHTMODE.ICONCOLOR_INACTIVE}/>
                        <Text style={isDarkMode ? styles.drawerItemTextDark : styles.drawerItemTextLight}>Abmelden</Text>
                    </TouchableOpacity>
                </View>
            </DrawerContentScrollView>
            <View style={styles.footer}>
                <Image source={require("../../assets/images/Ingenium_Schriftzug.png")}
                       style={{ width: '100%', height: 40}}
                       resizeMode={"contain"}
                />
            </View>

        </View>
    );
};

export default CustomDrawerContent;

function getStyles(insets) {
    return StyleSheet.create({
        drawerContainerLight: {
            flex: 1,
            backgroundColor: LIGHTMODE.BACKGROUNDCOLOR,
            paddingTop: insets.top + 30,
        },
        drawerContainerDark: {
            flex: 1,
            backgroundColor: DARKMODE.BACKGROUNDCOLOR,
            paddingTop: insets.top + 30,
        },
        drawerHeader: {
            marginHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT,
        },
        drawerContent: {
            flex: 1,
            marginHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT,
        },
        drawerSectionLight: {
            backgroundColor: LIGHTMODE.BOX_COLOR,
            marginBottom: 30,
            borderRadius: SIZES.BORDER_RADIUS
        },
        drawerSectionDark: {
            backgroundColor: DARKMODE.BOX_COLOR,
            marginBottom: 30,
            borderRadius: SIZES.BORDER_RADIUS
        },
        drawerItemsLight: {
            flexDirection: "row",
            paddingVertical: 12,
            paddingHorizontal: 10,
            borderBottomWidth: 1,
            borderBottomColor: LIGHTMODE.BACKGROUNDCOLOR
        },
        drawerItemsDark: {
            flexDirection: "row",
            paddingVertical: 12,
            paddingHorizontal: 10,
            borderBottomWidth: 1,
            borderBottomColor: DARKMODE.BACKGROUNDCOLOR
        },
        drawerItemsSelectedLight: {
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 12,
            paddingHorizontal: 10,
            borderLeftWidth: 5,
            borderLeftColor: LIGHTMODE.ICONCOLOR_ACTIVE,
            borderBottomWidth: 1,
            borderBottomColor: LIGHTMODE.BACKGROUNDCOLOR
        },
        drawerItemsSelectedDark: {
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 12,
            paddingHorizontal: 10,
            borderLeftWidth: 5,
            borderLeftColor: DARKMODE.ICONCOLOR_ACTIVE,
            borderBottomWidth: 1,
            borderBottomColor: DARKMODE.BACKGROUNDCOLOR
        },
        drawerItemTextLight: {
            fontSize: SIZES.DRAWER_LABEL_SIZE,
            marginLeft: 10,
            color: LIGHTMODE.TEXT_COLOR
        },
        drawerItemTextDark: {
            fontSize: SIZES.DRAWER_LABEL_SIZE,
            marginLeft: 10,
            color: DARKMODE.TEXT_COLOR
        },
        drawerItemTextSelectedLight: {
            fontSize: SIZES.DRAWER_LABEL_SIZE,
            marginLeft: 10,
            color: LIGHTMODE.TEXT_COLOR
        },
        drawerItemTextSelectedDark: {
            fontSize: SIZES.DRAWER_LABEL_SIZE,
            marginLeft: 10,
            color: DARKMODE.TEXT_COLOR
        },
        footer: {
            alignItems: 'center',
            paddingBottom: 35,
            marginHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT
        }
    })
}