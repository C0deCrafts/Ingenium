import {View, StyleSheet } from "react-native";
import Icon from "./Icon";
import {SIZES} from "../constants/styleSettings";

/**
 * ### BoxIcon Component
 *
 * This component represents a box-shaped icon container with an icon inside.
 * It provides a visual representation of an icon within a box.
 *
 * @param {string} name - The name of the icon to be displayed inside the box.
 * @param {string} color - The color of the icon.
 * @param {string} backgroundColor - The background color of the icon's box.
 *
 * @example
 * // Inside your component, use the BoxIcon component like this:
 * <BoxIcon
 *   name="example-icon"
 *   color="#FFFFFF"
 *   backgroundColor="#0080FF"
 * />
 */
function BoxIcon({name, color, backgroundColor }){
    const containerStyle = {
        ...styles.iconBox,
        backgroundColor: backgroundColor, // Verwendung der Prop für die Hintergrundfarbe
    };

    return (
        <View style={containerStyle}>
            <Icon name={name} color={color} size={25}/>
        </View>
    )
}

export default BoxIcon;

const styles = StyleSheet.create({
    iconBox: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: SIZES.BORDER_RADIUS,
        width: 35,
        height: 35
    }
})