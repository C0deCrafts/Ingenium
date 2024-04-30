import {Image} from "react-native";
import {USER_ICONS} from "../constants/customizationSettings";

/**
 * ### Icon Component
 *
 * Renders an icon based on the provided name.
 * The icons are sourced from the 'icons.js' file, and the name
 * should correspond to one of the constants defined in that file,
 * follow bei either '.ACTIVE' od '.INACTIVE' to specify the active or
 * inactive state of the icon.
 *
 * This component accepts a name, size and color as props to customize the rendered icon.
 *
 * @param name - The name of the icon to display should match one of the names
 * listed in the 'icons.js' file, followed by either '.ACTIVE' or '.INACTIVE'.
 * It's recommended to use the values from the constants provided in that file
 * @param size - The size of the icon.
 * @param color - The color of the icon
 * @param isUserIcon
 *
 * @example
 * // Import the Icon component
 * import Icon from "../../components/Icon";
 * // Inside your component's render method, use the Icon component like this:
 * <Icon name="DASHBOARD.ACTIVE" size={30} color="blue" />
 * // This will render an active icon named "dashboard" with a size of 30 and a blue color.
 * // Similarly, you can use 'INACTIVE' to render the inactive state of the icon.
 *
 */
function Icon({name, size, color, isUserIcon = false}) {
    const findImage = () => {
        const image = USER_ICONS.find(e => e.name === name);
        return image ? image.image : require("../assets/icons/surprised-outline.png");
    }

    return (
        isUserIcon ?
        <Image source={findImage()} style={{ width: size, height: size, tintColor: color }}/>
        :
        <Image source={name} style={{ width: size, height: size, tintColor: color }}/>
    )
}

export default Icon;