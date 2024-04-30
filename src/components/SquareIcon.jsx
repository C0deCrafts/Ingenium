import {View, StyleSheet} from "react-native";
import Icon from "./Icon";
import {SIZES} from "../constants/styleSettings";

/**
 * ### SquareIcon Component
 *
 * Renders an icon inside a square background with customizable colors.
 * This component relies on the Icon component to render the icon.
 * The icons are sourced from the 'icon.js' file.
 * It is typically used for displaying customizable icons in the Tasks section of the application.
 *
 * It accepts a name, a color and a background color.
 *
 * @param {string | any} name - The name of the icon to be displayed inside the square.
 * @param {string} color - The color of the icon. Default is "white".
 * @param {string} backgroundColor - The background color of the square behind the icon.
 * @param {boolean} isUserIcon - Optional. Specifies if the icon is a user icon.
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
        backgroundColor: backgroundColor, // use prop for backgroundColor
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