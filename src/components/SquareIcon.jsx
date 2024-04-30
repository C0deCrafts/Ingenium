import {View, StyleSheet} from "react-native";
import Icon from "./Icon";
import {SIZES} from "../constants/styleSettings";

/**
 * ### SquareIcon Component
 *
 * Renders an Icon based on the provided name, adding a square background with customizable color around the Icon
 * relies on the Icon component and adds background around it.
 * The icons are sourced from the 'icon.js' file.
 * The component is used for displaying customizable Icons in the Tasks Section
 * of the application
 *
 * It accepts a name, a color and a background color.
 *
 * @param name - The name of the icon to be displayed inside the square.
 * @param color - The color of the icon - default "white"
 * @param backgroundColor - The background color of the square behind the icon.
 * @param isUserIcon
 *
 * @example
 * // Inside your component, use the BoxIcon component like this:
 * <SquareIcon
 *   name="example-icon"
 *   color="#FFFFFF"
 *   backgroundColor="#0080FF"
 * />
 */

function SquareIcon({name, color="white", backgroundColor, isUserIcon}) {
    const containerStyle = {
        ...styles.square,
        backgroundColor: backgroundColor, // Verwendung der Prop für die Hintergrundfarbe
    };

    return (
        <View style={containerStyle}>
            <Icon name={name} size={SIZES.SQUARE_ICON_SIZE} color={color} isUserIcon={isUserIcon}/>
        </View>
    );
}

export default SquareIcon;

const styles = StyleSheet.create({
    square: {
        height: 35,
        width: 35,
        borderRadius: SIZES.BORDER_RADIUS,
        justifyContent: "center",
        alignItems: "center"
    }
});