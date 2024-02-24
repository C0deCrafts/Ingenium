import {Text, View, StyleSheet} from "react-native";
import CustomDrawerHeader from "../../components/CustomDrawerHeader";
import {DARKMODE, LIGHTMODE} from "../../constants/styleSettings";
import CustomButton from "../../components/CustomButton";
import {useTheme} from "../../constants/context/ThemeContext";
import {useSafeAreaInsets} from "react-native-safe-area-context";

function TasksMain({navigation}) {
    const insets = useSafeAreaInsets();
    const {theme} = useTheme();
    const isDarkMode = theme === DARKMODE;
    const styles = getStyles(insets);

    return (

            <View style={isDarkMode ? styles.containerDark : styles.containerLight}>
                {/*DrawerHeader for Tasks*/}
                <CustomDrawerHeader title="Aufgaben" onPress={() => navigation.openDrawer()}/>
                {/*Current View*/}
                <View style={isDarkMode ? styles.contentDark : styles.contentLight}>
                    {/*Tasks*/}

                    {/*CompletedTasks and Inbox*/}

                    {/*TaskLists*/}
                </View>
            </View>
    )
}

export default TasksMain;



function getStyles(insets)  {
    return StyleSheet.create({
        containerLight: {
            flex: 1,
            backgroundColor: LIGHTMODE.BACKGROUNDCOLOR
        },
        containerDark: {
            flex: 1,
            backgroundColor: DARKMODE.BACKGROUNDCOLOR
        },
        contentLight: {
            flex: 1,
            backgroundColor: LIGHTMODE.BACKGROUNDCOLOR,
            justifyContent: 'center',
            alignItems: 'center',
        },
        contentDark: {
            flex: 1,
            backgroundColor: DARKMODE.BACKGROUNDCOLOR,
            justifyContent: 'center',
            alignItems: 'center',
        },
        textLight: {
            color: LIGHTMODE.TEXT_COLOR,
        },
        textDark: {
            color: DARKMODE.TEXT_COLOR,
        }
    })
}
