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

    /**
     * Check if the course prop received has no keys.
     * The days without courses have an empty course object. For those
     * the check defaults to true and an empty course object is rendered.
     */
    if(Object.keys(course).length === 0) {
        return (
            <View style={[styles.courseContainer, isDarkMode ? styles.courseContainerDark : styles.courseContainerLight]}>
                <View style={isDarkMode ? styles.noCourseContainerDark : styles.noCourseContainerLight}>
                    <Text style={[isDarkMode ? styles.textDark : styles.textLight]}>Heute keine Kurse</Text>
                    <Image source={require('../../assets/images/sleeping-sloth.png')}/>
                </View>
            </View>
        );
    }


    return (
        <View style={[styles.courseContainer, isDarkMode ? styles.courseContainerDark : styles.courseContainerLight]}>
            <View style={styles.courseColorBlock}>
                <Text style={styles.courseTitle}>{course.courseTitle}</Text>
            </View>
            <View style={[styles.courseDescriptionContainer, isDarkMode? styles.containerDark : styles.containerLight]}>
                <View style={styles.courseTimeContainer}>
                    <Text style={isDarkMode? styles.textDark : styles.textLight}>{course.courseStart}-</Text>
                    <Text style={isDarkMode? styles.textDark : styles.textLight}>{course.courseEnd}</Text>
                </View>
                <TouchableOpacity style={styles.courseLinkContainer} onPress={() => handleOpenCourseLink(course.courseURL)}>
                    <Icon color={isDarkMode? styles.textDark : styles.textLight} size={24} name={ICONS.LINK.INACTIVE}/>
                    <Text style={[isDarkMode? styles.textDark: styles.textLight, styles.textUnderline]}>Auf ILIAS ansehen</Text>
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
    courseColorBlock: {
        width: '100%',
        padding: 15,
        backgroundColor: COLOR.BUTTONCOLOR,
        borderTopRightRadius: SIZES.BORDER_RADIUS,
        borderTopLeftRadius: SIZES.BORDER_RADIUS,
    },
    courseTitle: {
        color: DARKMODE.TEXT_COLOR,
        fontWeight: SIZES.BUTTON_LABEL_WEIGHT,
        fontSize: SIZES.SCREEN_TEXT_NORMAL
    },
    courseDescriptionContainer: {
        flex: 1,
        padding: 15,
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
        paddingTop: SIZES.SPACING_VERTICAL_DEFAULT,
        flexDirection: "row",
        columnGap: 10,
    },
    textLight: {
        color: LIGHTMODE.TEXT_COLOR,
        fontSize: SIZES.SCREEN_TEXT_NORMAL
    },
    textDark: {
        color: DARKMODE.TEXT_COLOR,
        fontSize: SIZES.SCREEN_TEXT_NORMAL
    },
    textUnderline: {
        textDecorationLine: "underline",
    },
    noCourseContainerLight: {
        backgroundColor: LIGHTMODE.BOX_COLOR,
        borderRadius: SIZES.BORDER_RADIUS,
        flex: 1,
        padding: 15,
        flexDirection: "row",
        alignItems: "center"
    },
    noCourseContainerDark: {
        backgroundColor: DARKMODE.BOX_COLOR,
        borderRadius: SIZES.BORDER_RADIUS,
        flex: 1,
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
    }
});