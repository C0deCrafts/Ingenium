import {Text, View, StyleSheet, Image, TouchableOpacity} from "react-native";
import {COLOR, DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import {memo} from "react";
import {useTheme} from "../../context/ThemeContext";
import * as Linking from "expo-linking";
import Icon from "../Icon";
import {ICONS} from "../../constants/icons";

/**
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function CourseItemForAgenda(props) {
    //import theme for light and darkmode
    const { theme } = useTheme();
    const isDarkMode = theme === DARKMODE;

    const {course} = props;

    const handleOpenCourseLink = async (courseURL) => {
        //canOpenURL checks if the given URL can be opened, the Promise resolves either to true or false
        const supportedURL = await Linking.canOpenURL(courseURL);
        //if it resolves to true, the website is opened, else an error is printed
        if(supportedURL) {
            await Linking.openURL(courseURL);
        } else  {
            console.error("Error opening course link.");
        }
    }


    return (
        course &&
        <View style={[styles.courseContainer, isDarkMode ? styles.courseContainerDark : styles.courseContainerLight]}>
            <View style={[styles.courseDescriptionContainer, isDarkMode? styles.containerDark : styles.containerLight]}>
                <View style={styles.titleTimeContainer}>
                    <Text style={styles.courseTitle}
                          numberOfLines = {2}
                          ellipsizeMode={ "tail"}>
                        {course.courseTitle}
                    </Text>
                    <View style={styles.courseTimeContainer}>
                        <Text style={isDarkMode ? styles.textDark : styles.textLight}>{course.courseStart}-</Text>
                        <Text style={isDarkMode ? styles.textDark : styles.textLight}>{course.courseEnd}</Text>
                    </View>
                </View>
                <TouchableOpacity style={[styles.courseLinkContainer, isDarkMode? styles.backGroundDark:styles.backGroundLight]}
                                  onPress={() => handleOpenCourseLink(course.courseURL)}>
                    <Text style={[isDarkMode? styles.textDark: styles.textLight, styles.linkText]}>
                        Details
                    </Text>
                    <Icon color={isDarkMode ? DARKMODE.TEXT_COLOR : LIGHTMODE.TEXT_COLOR} size={SIZES.SCREEN_TEXT_SMALL + 2} name={ICONS.FORWARD.ACTIVE}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

// memo is used to skip unnecessary rendering of course items, to optimize the Agenda list where the item is output
// the component will only rerender when the props (item passed to it) change.
export default memo(CourseItemForAgenda);

const styles = StyleSheet.create({
    courseContainer: {
      flex:1,
      paddingBottom: SIZES.SPACING_VERTICAL_DEFAULT,
    },
    courseContainerLight: {
        backgroundColor: LIGHTMODE.BACKGROUNDCOLOR,
    },
    courseContainerDark: {
        backgroundColor: DARKMODE.BACKGROUNDCOLOR,
    },
    courseTitle: {
        color: DARKMODE.TEXT_COLOR,
        fontWeight: SIZES.BUTTON_LABEL_WEIGHT,
        fontSize: SIZES.SCREEN_TEXT_NORMAL
    },
    courseDescriptionContainer: {
        flex: 1,
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    containerLight: {
        backgroundColor: LIGHTMODE.BOX_COLOR,
        borderBottomLeftRadius: SIZES.BORDER_RADIUS,
        borderBottomRightRadius: SIZES.BORDER_RADIUS
    },
    containerDark: {
        backgroundColor: DARKMODE.BOX_COLOR,
        borderBottomLeftRadius: SIZES.BORDER_RADIUS,
        borderBottomRightRadius: SIZES.BORDER_RADIUS
    },
    courseTimeContainer: {
        flexDirection: "row",
    },
    courseLinkContainer: {
        flexDirection: "row",
        height: 80,
        width: 80,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center"
    },
    titleTimeContainer: {
        width: '60%',
        height: '100%',
        justifyContent: "space-between"
    },
    backGroundDark: {
        backgroundColor: DARKMODE.BACKGROUNDCOLOR,
    },
    backGroundLight: {
        backgroundColor: LIGHTMODE.BACKGROUNDCOLOR
    },
    textLight: {
        color: LIGHTMODE.TEXT_COLOR,
        fontSize: SIZES.SCREEN_TEXT_SMALL,
    },
    textDark: {
        color: DARKMODE.TEXT_COLOR,
        fontSize: SIZES.SCREEN_TEXT_SMALL,
    },
    linkText: {
        fontSize: SIZES.SCREEN_TEXT_SMALL,
        paddingLeft: 5
    }
});