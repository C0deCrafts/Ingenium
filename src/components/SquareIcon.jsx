import {View, StyleSheet} from "react-native";
import Icon from "./Icon";
import {COLOR, SIZES} from "../constants/styleSettings";

/**
 * ## SquareIcon Component
 *
 * Renders an Icon based on the provided name, adding a square background with customizable color around the Icon
 * relies on the Icon component and adds background around it.
 * The icons are sourced from the 'icon.js' file.
 * The component is used for displaying customizable Icons in the Tasks Section
 * of the application
 *
 * It accepts a name and a color
 *
 * @param name - The name of the icon to display should match one of
 * the names listed in the 'icon.js' file under 'TASKICONS'.
 * @param color - The color of the Icon.
 * @returns {JSX.Element} - A JSX element which renders the Icon.
 *
 * ### Example
 *
 * used to display the icons of a taskList
 * accessing the lists properties 'icon' and 'color'
 *<SquareIcon name={list.icon} color={list.color}/>
 */

function SquareIcon({name, color}) {
    return (
        <View style={[{backgroundColor: color}, styles.square]}>
            <Icon name={name} size={24} color={COLOR.BUTTONLABEL}/>
        </View>
    );
}

export default SquareIcon;

const styles = StyleSheet.create({
    square: {
        height: 32,
        width: 32,
        borderRadius: SIZES.BORDER_RADIUS,
        justifyContent: "center",
        alignItems: "center"
    }
});