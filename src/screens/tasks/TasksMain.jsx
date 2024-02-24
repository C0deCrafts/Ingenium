import {Text, View, StyleSheet, ScrollView, Dimensions, Pressable, TouchableOpacity} from "react-native";
import CustomDrawerHeader from "../../components/CustomDrawerHeader";
import {COLOR, DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import {useTheme} from "../../constants/context/ThemeContext";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Icon from "../../components/Icon";
import {ICONS} from "../../constants/icons";


function TasksMain({navigation}) {
    const insets = useSafeAreaInsets();
    const {theme} = useTheme();
    const isDarkMode = theme === DARKMODE;
    const styles = getStyles(insets);

    return (
            <View style={[isDarkMode ? styles.containerDark : styles.containerLight]}>
                {/*DrawerHeader for Tasks*/}
                <CustomDrawerHeader title="Aufgaben" onPress={() => navigation.openDrawer()}/>
                {/*Current View*/}
                <View style={[isDarkMode ? styles.contentDark : styles.contentLight, styles.contentContainer]}>
                    {/*Tasks*/}
                    <View style={isDarkMode ? styles.containerDark : styles.containerLight}>
                        <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.header]}>Meine
                        Aufgaben</Text>
                        <ScrollView
                            style={[isDarkMode ? styles.contentBoxDark : styles.contentBoxLight]}
                            showsVerticalScrollIndicator={false}
                        >
                        </ScrollView>
                    </View>

                    {/*CompletedTasks and Inbox*/}
                    <View style={styles.cardButtonContainer}>
                        <TouchableOpacity
                            style={[isDarkMode ? styles.contentBoxDark : styles.contentBoxLight, styles.cardButton]}
                            onPress={() => navigation.navigate("CompletedTasks_Stack")}
                        >
                            <Text style={isDarkMode ? styles.textDark : styles.textLight}>Erledigt</Text>
                            <Icon name={ICONS.TASKICONS.COMPLETED} color={isDarkMode ? DARKMODE.TEXT_COLOR : LIGHTMODE.TEXT_COLOR} size={SIZES.SCREEN_TEXT_NORMAL}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[isDarkMode ? styles.contentBoxDark : styles.contentBoxLight, styles.cardButton]}
                            onPress={() => navigation.navigate("Inbox_Stack")}
                        >
                            <Text style={isDarkMode ? styles.textDark : styles.textLight}>Inbox</Text>
                            <Icon name={ICONS.TASKICONS.INBOX} color={isDarkMode ? DARKMODE.TEXT_COLOR : LIGHTMODE.TEXT_COLOR} size={SIZES.SCREEN_TEXT_NORMAL}/>
                        </TouchableOpacity>
                    </View>

                    {/*TaskLists*/}
                    <View style={isDarkMode ? styles.containerDark : styles.containerLight}>
                        <View style={styles.headerWithIcon}>
                        <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.header]}>
                            Meine Listen
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                console.log('more was pressed')
                            }}
                        >
                            <Icon name={ICONS.TASKICONS.MORE_OUTLINE} size={SIZES.SCREEN_HEADER}
                                  color={isDarkMode ? DARKMODE.TEXT_COLOR : LIGHTMODE.TEXT_COLOR}/>
                        </TouchableOpacity>
                        </View>
                        <ScrollView
                            style={[isDarkMode ? styles.contentBoxDark : styles.contentBoxLight]}
                            showsVerticalScrollIndicator={false}
                        >
                        </ScrollView>
                    </View>
                    {/*Round button for adding Lists and Tasks*/}
                    <TouchableOpacity
                        style={styles.roundButton}
                        onPress={() => console.log("Add new List / Task was pressed")}
                    >
                        <Icon name={ICONS.TASKICONS.ADD} size={40} color={COLOR.BUTTONLABEL} />
                    </TouchableOpacity>
                </View>
            </View>
    )
}

export default TasksMain;

const windowWidth = Dimensions.get("window").width;

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
        contentContainer: {
            //should we set paddings like this?
            paddingTop: insets.top,
            paddingBottom: insets.bottom + 40,
            paddingHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT,
            rowGap: 20
        },
        contentLight: {
            flex: 1,
            backgroundColor: LIGHTMODE.BACKGROUNDCOLOR,
        },
        contentDark: {
            flex: 1,
            backgroundColor: DARKMODE.BACKGROUNDCOLOR,
        },
        textLight: {
            color: LIGHTMODE.TEXT_COLOR,
            fontSize: SIZES.SCREEN_TEXT_NORMAL,
        },
        textDark: {
            color: DARKMODE.TEXT_COLOR,
        },
        header: {
            fontSize: SIZES.SCREEN_HEADER,
            fontWeight: "bold",
            paddingBottom: 5,
        },
        headerWithIcon: {
            flexDirection: "row",
            justifyContent: "space-between",
        },
        contentBoxLight: {
            backgroundColor: LIGHTMODE.BOX_COLOR,
            borderRadius: SIZES.BORDER_RADIUS,
        },
        contentBoxDark: {
            backgroundColor: DARKMODE.BOX_COLOR,
            borderRadius: SIZES.BORDER_RADIUS,
        },
        cardButtonContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            height: 80,
        },
        cardButton: {
            width: '45%',
            justifyContent: "center",
            rowGap: 5,
            padding: 10
        },
        roundButton: {
            height: 60,
            width: 60,
            borderRadius: 30,
            backgroundColor: COLOR.BUTTONCOLOR,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            left: (windowWidth / 2) - 30,
            bottom: insets.bottom,
        }
    })
}
