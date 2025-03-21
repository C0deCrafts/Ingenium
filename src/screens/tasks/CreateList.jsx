import {useState} from "react";
import {Text, View, StyleSheet, ScrollView, TouchableOpacity, Alert} from "react-native";
import {useTheme} from "../../context/ThemeContext";
import {DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import CustomBackButton from "../../components/buttons/CustomBackButton";
import CustomInputField from "../../components/inputFields/CustomInputField";
import {USER_COLORS, USER_ICONS} from "../../constants/customizationSettings";
import ColorPickerButtons from "../../components/buttons/ColorPickerButtons";
import SquareIcon from "../../components/SquareIcon";
import {useDatabase} from "../../context/DatabaseContext";
import CustomButtonSmall from "../../components/buttons/CustomButtonSmall";

// NOTE: It would be great if we didn't need Save and Cancel buttons
// and could handle this with the keyboard instead - unfortunately, that's not possible yet.

/**
 * CreateList component for creating a new list.
 *
 * @param {object} navigation - Navigation prop object.
 * @returns {JSX.Element} - JSX element representing the CreateList component.
 */
function CreateList({navigation}) {
    const {theme} = useTheme();
    const isDarkMode = theme === DARKMODE;

    // State variables for the form
    const [listName, setListName] = useState("");
    const [iconName, setIconName] = useState("LIST");
    const [iconBackgroundColor, setIconBackgroundColor] = useState(USER_COLORS.ICONCOLOR_CUSTOM_BLUE);

    const {addList} = useDatabase();

    const handleAddList = async () => {
        if(listName.trim()===""){
            Alert.alert("Fehler", "Bitte einen Listennamen eingeben", [{text: "OK"}])
            return;
        }
        await addList({
            listName: listName,
            iconName: iconName,
            iconBackgroundColor: iconBackgroundColor
        });
        navigation.goBack();
    }
    /*
    * Extract icon names and user colors from constants:
    * In JavaScript, we can iterate directly over arrays using map(),
    * but not over objects. So, if we want to iterate over the elements of an
    * object, we need to first convert the keys of that object into an array.
    * We do this with Object.keys(). This gives us an array of keys of the object,
    * which we can then iterate over using map(). This allows us to access
    * each element of the object and use it as we want.
    */
    const userColors = Object.keys(USER_COLORS);
    const userIconNames = USER_ICONS.map((icon) => icon.name);

    const handleChangeIcon = (name) => {
        setIconName(name);
    }
    const handleChangeIconBoxColor = (color) => {
        setIconBackgroundColor(color);
    }
    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <View style={isDarkMode ? styles.containerDark : styles.containerLight}>
            {/* Custom back button */}
            <CustomBackButton onPress={handleGoBack} showCustomElement={true} customElement={
                <CustomButtonSmall title={"Fertig"} onPressFunction={
                    handleAddList
                }/>
            }/>
            <View style={isDarkMode ? styles.contentDark : styles.contentLight}>
                {/* Header */}
                <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.header]}>
                    Neue Liste erstellen
                </Text>
                {/* Spacing */}
                <View style={styles.spacing}>
                    {/* Input field for list name */}
                    <CustomInputField placeholder="Listenname"
                                      keyboardType="default"
                                      onChangeText={setListName}
                                      value={listName}
                                      iconName={iconName}
                                      iconBoxBackgroundColor={iconBackgroundColor}
                                      iconColor="white"
                                      isUserIcon={true}
                                      maxTextInputLength={25}
                    />
                </View>
                {/* Icon selection */}
                <Text style={isDarkMode ? styles.textDark : styles.textLight}>
                    Icon
                </Text>
                <View style={styles.spacing}>
                    {/* Horizontal scroll view for icon selection */}
                    <ScrollView horizontal={true}
                                style={isDarkMode ? styles.scrollContainerDark : styles.scrollContainerLight}
                                showsHorizontalScrollIndicator={false} bounces={true}>
                        {userIconNames.map((iconName) => (
                            <TouchableOpacity key={iconName} onPress={()=> handleChangeIcon(iconName)}>
                                <View key={iconName} style={styles.boxSpacing}>
                                    <SquareIcon
                                        name={iconName}
                                        color={"white"}
                                        backgroundColor={iconBackgroundColor}
                                        isUserIcon={true}
                                    />
                                </View>
                            </TouchableOpacity>
                        ))}
                        {/* Spacer for the last icon button */}
                        <View style={{width: 15, height: '100%'}}></View>
                    </ScrollView>
                </View>
                {/* Color selection */}
                <Text style={isDarkMode ? styles.textDark : styles.textLight}>
                    Farbe
                </Text>
                <View style={styles.spacing}>
                    {/* Horizontal scroll view for color selection */}
                    <ScrollView horizontal={true}
                                style={isDarkMode ? styles.scrollContainerDark : styles.scrollContainerLight}
                                showsHorizontalScrollIndicator={false} bounces={true}>
                        {/* Map through user colors */}
                        {userColors.map((userColor) => (
                            <View key={userColor} style={styles.boxSpacing}>
                                {/* Display color picker button */}
                                <ColorPickerButtons
                                    color={USER_COLORS[userColor]}
                                    onPress={() => handleChangeIconBoxColor(USER_COLORS[userColor])}
                                />
                            </View>
                        ))}
                        {/* Spacer for the last color picker button */}
                        <View style={{width: 15, height: '100%'}}></View>
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}

export default CreateList;

const styles = StyleSheet.create({
    // Container styles for light and dark mode
    containerLight: {
        flex: 1,
        backgroundColor: LIGHTMODE.BACKGROUNDCOLOR,
        paddingHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT
    },
    containerDark: {
        flex: 1,
        backgroundColor: DARKMODE.BACKGROUNDCOLOR,
        paddingHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT
    },
    // Content styles for light and dark mode
    contentLight: {
        flex: 1,
        backgroundColor: LIGHTMODE.BACKGROUNDCOLOR,
        marginTop: SIZES.MARGIN_TOP_FROM_BACKBUTTON_HEADER
    },
    contentDark: {
        flex: 1,
        backgroundColor: DARKMODE.BACKGROUNDCOLOR,
        marginTop: SIZES.MARGIN_TOP_FROM_BACKBUTTON_HEADER
    },
    // Header text styles
    header: {
        fontSize: SIZES.SCREEN_HEADER,
        fontWeight: SIZES.SCREEN_HEADER_WEIGHT,
    },
    // Text styles for light and dark mode
    textLight: {
        color: LIGHTMODE.TEXT_COLOR,
        fontSize: SIZES.SCREEN_TEXT_NORMAL,
    },
    textDark: {
        color: DARKMODE.TEXT_COLOR,
        fontSize: SIZES.SCREEN_TEXT_NORMAL,
    },
    boxSpacing: {
        marginRight: 15,
    },
    // Spacing between elements
    spacing: {
        marginVertical: SIZES.SPACES_VERTICAL_BETWEEN_BOXES,
    },
    // Styles for the horizontal scroll container in light and dark mode
    scrollContainerLight: {
        backgroundColor: LIGHTMODE.INPUT_BOX_COLOR,
        borderRadius: SIZES.BORDER_RADIUS,
        flexDirection: "row",
        padding: 15
    },
    scrollContainerDark: {
        backgroundColor: DARKMODE.INPUT_BOX_COLOR,
        borderRadius: SIZES.BORDER_RADIUS,
        flexDirection: "row",
        padding: 15
    },
    // Button container styles
    buttonBox: {
        flexDirection: "row",
        marginTop: 40
    },
    // Save button styles
    buttonOne: {
        flex: 1,
        marginRight: 10,
        height: 50,
    },
    // Cancel button styles
    buttonTwo: {
        flex: 1,
        height: 50,
        marginLeft: 10
    }
})