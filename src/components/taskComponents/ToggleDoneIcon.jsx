import {ICONS} from "../../constants/icons";
import {DARKMODE, LIGHTMODE} from "../../constants/styleSettings";
import Icon from "../Icon";
import {useTheme} from "../../context/ThemeContext";

/**
 * Renders a  toggle Icon changes its visual state between a filled circle and an outlined circle.
 *
 * - To display a filled circle, set the `isDone` prop to `true`.
 * - To display an outlined circle, set the `isDone` prop to `false`.
 *
 * The Icon also changes its opacity:
 * - To display the Icon with opacity 0.2 set 'isActivated' to 'true'.
 * - To display the Icon with opacity 1 set 'isActivated' to 'false'.
 *
 * @param isDone {boolean} Determines whether the circle is filled or outlined.
 * @param isActivated {boolean} Determines whether the icon has opacity or not.
 */

function ToggleDoneIcon({isDone, isActivated}) {
    const { theme } = useTheme();
    const isDarkMode = theme === DARKMODE;

    const lightModeColor = isActivated ? LIGHTMODE.TEXT_COLOR_OPAQUE : LIGHTMODE.TEXT_COLOR;
    const darkModeColor = isActivated ? DARKMODE.TEXT_COLOR_OPAQUE : DARKMODE.TEXT_COLOR;

    return (
        <Icon name={isDone  ? ICONS.TASKICONS.CIRCLE_DONE : ICONS.TASKICONS.CIRCLE}
              color={isDarkMode ? darkModeColor : lightModeColor}
              size={20}/>
    );
}

export default ToggleDoneIcon;
