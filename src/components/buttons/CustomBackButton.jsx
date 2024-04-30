import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {ICONS as ICON} from "../../constants/icons";
import Icon from "../Icon";
import {DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import {useTheme} from "../../context/ThemeContext";
import {useSafeAreaInsets} from "react-native-safe-area-context";

/**
 * ## CustomBackButton Component
 *
 * This component represents a custom back button used in stack navigation headers.
 * It allows users to navigate back to the previous screen when pressed.
 * The appearance of the button is determined by the current theme (dark/light).
 * It can optionally be extended to hold either:
 * - a title to the right side of the back button
 * - a custom element to the right side of the back button
 * Only one of these options should be chosen.
 *
 *
 * **Use without optional title / element**
 * @example
 * ```jsx
 * // Inside your stack navigation header component, use the CustomBackButton component like this:
 *
 * <CustomBackButton onPress={() => navigation.goBack()} />
 * ```
 *
 * **Use with optional title**
 * @example
 * ```jsx
 * //If a title should be displayed on the right of the header, use the CustomBackButton component like this:
 *
 * <CustomBackButton
 *                 onPress={handleGoBack}
 *                 showTitle={true}
 *                 title={"Inbox"}
 *             />
 * ```
 *
 * **Use with optional customElement**
 * @example
 * ```jsx
 * // The optional customElement is used in Screens, where a button is displayed to the right of the back button and
 * // the state in the component controls which button is rendered.
 * // If a custom element should be displayed on the right of the header, use the CustomBackButton component like this:
 *
 * <CustomBackButton
 *                 onPress={handleGoBack}
 *                 showCustomElement={true}
 *                 customElement={<CustomButtonSmall onPressFunction={handleCloseEditingTasks} title={'Fertig'}/>}
 *             />
 *  ```
 *
 * @param {Function} onPress - Function to be called when the button is pressed.
 * @param {boolean} showTitle - Optional flag to determine whether to display a title next to the back button.
 *                             Default is false.
 * @param {string} title - Optional additional title to be displayed on the right edge of the header.
 * @param {boolean} showCustomElement - Optional flag to determine whether to display a clickable icon next to the back button.
 *                             Default is false.
 * @param customElement - Optional additional JSX Element to be displayed on the right edge of the header.
 */
function CustomBackButton({
                              onPress,
                              showTitle = false,
                              title,
                              showCustomElement = false,
                              customElement,
                              backLabel = "Zurück"
                          }) {
    const insets = useSafeAreaInsets();
    const {theme} = useTheme();
    const isDarkMode = theme === DARKMODE;
    const styles = getStyles(insets);


    return (
        <View style={[styles.headerContainer, styles.titleContainer]}>
            <TouchableOpacity style={styles.titleContainer} onPress={onPress}>
                <Icon name={ICON.BACK.ACTIVE}
                      size={SIZES.BACK_BUTTON_ICON_SIZE}
                      color={isDarkMode ? DARKMODE.ICONCOLOR : LIGHTMODE.ICONCOLOR}
                />
                <View>
                    <Text style={isDarkMode ? styles.headerTitleDark : styles.headerTitleLight}>{backLabel}</Text>
                </View>
            </TouchableOpacity>
            {/*optional title will be shown only if showTitle is true and a title was provided*/}
            {showTitle && title &&
                <View style={styles.titleContainerRight}>
                    <Text style={isDarkMode ? styles.headerTitleRightDark : styles.headerTitleRightLight}>{title}</Text>
                </View>
            }
            {/*optional custom Element will be shown only if showCustomElement is true and a customElement was provided*/}
            {showCustomElement && customElement &&
                <View style={styles.titleContainerRight}>
                    {customElement}
                </View>
            }
        </View>
    )
}

export default CustomBackButton;

function getStyles(insets) {
    return StyleSheet.create({
        headerContainer: {
            paddingTop: insets.top + 30,
        },
        titleContainer: {
            flexDirection: "row",
            alignItems: "center",
        },
        headerTitleLight: {
            fontSize: SIZES.BACK_HEADER_FONTSIZE,
            color: LIGHTMODE.DRAWER_HEADER_LABEL_COLOR,
            marginLeft: 5,
        },
        headerTitleDark: {
            fontSize: SIZES.BACK_HEADER_FONTSIZE,
            color: DARKMODE.DRAWER_HEADER_LABEL_COLOR,
            marginLeft: 5,
        },
        titleContainerRight: {
            flex: 1,
            alignItems: "flex-end"
        },
        headerTitleRightLight: {
            fontSize: SIZES.DRAWER_HEADER_FONTSIZE,
            fontWeight: SIZES.DRAWER_HEADER_FONTWEIGHT,
            color: LIGHTMODE.TEXT_COLOR,
        },
        headerTitleRightDark: {
            fontSize: SIZES.DRAWER_HEADER_FONTSIZE,
            fontWeight: SIZES.DRAWER_HEADER_FONTWEIGHT,
            color: DARKMODE.TEXT_COLOR,
        }

    })
}