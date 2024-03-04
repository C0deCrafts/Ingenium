import {View, StyleSheet, TouchableOpacity} from "react-native";
/**
 * ### ColorPickerButtons Component
 *
 * Renders a button for color selection.
 * This component accepts a color prop to customize the background color of the button.
 * The onPress prop is a function to handle color selection.
 *
 * @param {string} color - The background color of the button.
 * @param {Function} onPress - Function to handle color selection.
 * @returns {JSX.Element} - ColorPickerButtons component
 *
 * @example
 * // Create a state to hold the current color
 * const [currentColor, setCurrentColor] = useState("#FFFFFF");
 *
 * // Define a function to handle color selection
 * const handleColorSelection = (color) => {
 *     console.log("Selected color:", color);
 *     setCurrentColor(color); // Update the current color state
 * };
 *
 * // Render the ColorPickerButtons component with the current color state
 * // and update the color by pressing on the colorpicker button
 * return (
 *     <ColorPickerButtons color={currentColor} onPress={() => handleColorSelection("#000000")} />
 * );
 */
function ColorPickerButtons({color, onPress}){
    const containerStyle = {
        ...styles.colorBox,
        backgroundColor: color, // Using the prop in another component for the background color
    };

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={containerStyle}>
            </View>
        </TouchableOpacity>
    )
}

export default ColorPickerButtons;

const styles = StyleSheet.create({
    colorBox: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 35,
        width: 35,
        height: 35,
    }
})