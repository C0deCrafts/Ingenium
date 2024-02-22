import React from 'react';
import {Text, TouchableOpacity, StyleSheet, SafeAreaView, View, Image, Linking} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useTabContext } from "../context/TabContext";
import {COLOR, SIZES} from "../../constants/styleSettings";
import Icon from "../../components/Icon";
import {ICONS} from "../../constants/icons";

const CustomDrawerContent = ({navigation}) => {
    const { currentRoute, navigateAndSetSelectedTab } = useTabContext();

    return (
        <SafeAreaView style={styles.drawerContainer}>
            <View style={styles.drawerHeader}>
                <TouchableOpacity onPress={navigation.closeDrawer}>
                    <Icon name={ICONS.CLOSE.INACTIVE}
                          size={SIZES.CLOSE_BUTTON_ICON_SIZE}
                          color={COLOR.ICONCOLOR_INACTIVE}
                    />
                </TouchableOpacity>
            </View>
            <DrawerContentScrollView contentContainerStyle={styles.drawerContent}>
                {/* benutzerdefinierten Drawer-Items zur navigation zwischen Drawer und Tab */}
                <View style={styles.drawerSection}>
                    <TouchableOpacity onPress={() => navigateAndSetSelectedTab('Dashboard_Tab')}
                                      style={currentRoute === 'Dashboard_Tab' ? styles.drawerItemsSelected : styles.drawerItems}
                    >
                        <Icon name={currentRoute === 'Dashboard_Tab' ? ICONS.DASHBOARD.ACTIVE : ICONS.DASHBOARD.INACTIVE}
                              size={SIZES.DRAWER_ICONS_SIZE}
                              color={COLOR.ICONCOLOR_INACTIVE}

                        />
                        <Text style={currentRoute === 'Dashboard_Tab' ? styles.drawerItemTextSelected : styles.drawerItemText}>Dashboard</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigateAndSetSelectedTab('Timetable_Tab')}
                                      style={currentRoute === 'Timetable_Tab' ? styles.drawerItemsSelected : styles.drawerItems}
                    >
                        <Icon name={currentRoute === 'Timetable_Tab' ? ICONS.TIMETABLE.ACTIVE : ICONS.TIMETABLE.INACTIVE}
                              size={SIZES.DRAWER_ICONS_SIZE}
                              color={COLOR.ICONCOLOR_INACTIVE}/>
                        <Text style={currentRoute === 'Timetable_Tab' ? styles.drawerItemTextSelected : styles.drawerItemText}>Stundenplan</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigateAndSetSelectedTab('Notification_Tab')}
                                      style={currentRoute === 'Notification_Tab' ? styles.drawerItemsSelected : styles.drawerItems}
                    >
                        <Icon name={currentRoute === 'Notification_Tab' ? ICONS.NOTIFICATION.ACTIVE : ICONS.NOTIFICATION.INACTIVE}
                              size={SIZES.DRAWER_ICONS_SIZE}
                              color={COLOR.ICONCOLOR_INACTIVE}/>
                        <Text style={currentRoute === 'Notification_Tab' ? styles.drawerItemTextSelected : styles.drawerItemText}>Aufgaben</Text>
                    </TouchableOpacity>

                    {/* Drawer-Items zur navigation zu einzelnen screens */}
                    <TouchableOpacity onPress={() => navigateAndSetSelectedTab('ProfileSettings_Drawer')}
                                      style={currentRoute === 'ProfileSettings_Drawer' ? styles.drawerItemsSelected : styles.drawerItems}
                    >
                        <Icon name={currentRoute === 'ProfileSettings_Drawer' ? ICONS.ACCOUNT_SETTINGS.ACTIVE : ICONS.ACCOUNT_SETTINGS.INACTIVE}
                              size={SIZES.DRAWER_ICONS_SIZE}
                              color={COLOR.ICONCOLOR_INACTIVE}/>
                        <Text style={currentRoute === 'ProfileSettings_Drawer' ? styles.drawerItemTextSelected : styles.drawerItemText}>Profil bearbeiten</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigateAndSetSelectedTab('Settings_Drawer')}
                                      style={currentRoute === 'Settings_Drawer' ? styles.drawerItemsSelected : styles.drawerItems}
                    >
                        <Icon name={currentRoute === 'Settings_Drawer' ? ICONS.SETTINGS.ACTIVE : ICONS.SETTINGS.INACTIVE}
                              size={SIZES.DRAWER_ICONS_SIZE}
                              color={COLOR.ICONCOLOR_INACTIVE}/>
                        <Text style={currentRoute === 'Settings_Drawer' ? styles.drawerItemTextSelected : styles.drawerItemText}>Einstellungen</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.drawerSection}>
                    <TouchableOpacity onPress={() => Linking.openURL("https://ilias.ingenium.co.at/")} style={styles.drawerItems}>
                        <Icon name={ICONS.LINK.ACTIVE}
                              size={SIZES.DRAWER_ICONS_SIZE}
                              color={COLOR.ICONCOLOR_INACTIVE}/>
                        <Text style={styles.drawerItemText}>ILIAS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL("https://www.ingenium.co.at/")} style={styles.drawerItems}>
                        <Icon name={ICONS.LINK.ACTIVE}
                              size={SIZES.DRAWER_ICONS_SIZE}
                              color={COLOR.ICONCOLOR_INACTIVE}/>
                        <Text style={styles.drawerItemText}>Ingenium Education</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.drawerSection}>
                    <TouchableOpacity onPress={() => navigateAndSetSelectedTab('Contact_Drawer')}
                                      style={currentRoute === 'Contact_Drawer' ? styles.drawerItemsSelected : styles.drawerItems}
                    >
                        <Icon name={currentRoute === 'Contact_Drawer' ? ICONS.CONTACT.ACTIVE : ICONS.CONTACT.INACTIVE}
                              size={SIZES.DRAWER_ICONS_SIZE}
                              color={COLOR.ICONCOLOR_INACTIVE}/>
                        <Text style={currentRoute === 'Contact_Drawer' ? styles.drawerItemTextSelected : styles.drawerItemText}>Kontakt</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {}} style={styles.drawerItems}>
                        <Icon name={ICONS.LOGOUT.ACTIVE}
                              size={SIZES.DRAWER_ICONS_SIZE}
                              color={COLOR.ICONCOLOR_INACTIVE}/>
                        <Text style={styles.drawerItemText}>Abmelden</Text>
                    </TouchableOpacity>
                </View>
            </DrawerContentScrollView>
            <View style={styles.footer}>
                <Image source={require("../../assets/images/Ingenium_Schriftzug.png")}
                       style={{ width: '100%', height: 40 }}
                       resizeMode={"center"}
                />
            </View>

        </SafeAreaView>
    );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
    drawerContainer: {
        flex: 1,
        backgroundColor: COLOR.BACKGROUNDCOLOR,
    },
    drawerHeader: {
        paddingTop: 35,
        marginHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT,
    },
    drawerContent: {
        flex: 1,
        //justifyContent: "center",
        marginHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT,
    },
    drawerSection: {
        backgroundColor: COLOR.BOX_COLOR,
        marginBottom: 30,
        borderRadius: SIZES.BORDER_RADIUS
    },
    drawerItems: {
        flexDirection: "row",
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLOR.BACKGROUNDCOLOR
    },
    drawerItemsSelected: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderLeftWidth: 5,
        borderLeftColor: COLOR.ICONCOLOR_ACTIVE,
        borderBottomWidth: 1,
        borderBottomColor: COLOR.BACKGROUNDCOLOR
    },
    drawerItemText: {
        fontSize: SIZES.DRAWER_LABEL_SIZE,
        marginLeft: 10,
    },
    drawerItemTextSelected: {
        fontSize: SIZES.DRAWER_LABEL_SIZE,
        marginLeft: 10,
    },
    footer: {
        alignItems: 'center',
        paddingBottom: 35
    }
});