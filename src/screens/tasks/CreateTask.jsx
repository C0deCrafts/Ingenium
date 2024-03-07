import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Keyboard,
    InputAccessoryView,
    TouchableOpacity,
} from "react-native";
import {useTheme} from "../../context/ThemeContext";
import {COLOR, DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import CustomBackButton from "../../components/buttons/CustomBackButton";
import CustomButton from "../../components/buttons/CustomButton";
import {useRef, useState} from "react";
import CustomBoxButton from "../../components/buttons/CustomBoxButton";
import {ICONS} from "../../constants/icons";
import SelectListModal from "../../components/modals/SelectListModal";

//ACHTUNG: Hier wäre optional super, wenn wir keinen Speichern und Abbrechen Button benötigen würden
//und das stattdessen mit der Tastatur lösen könnten - leider ist das bis jetzt noch nicht möglich

function CreateList({navigation}) {
    const {theme} = useTheme();
    const isDarkMode = theme === DARKMODE;

    //Eine ID, die verwendet wird, um dies mit angegebenen TextInput(s) zu verknüpfen.InputAccessoryView
    const inputAccessoryViewID = 'uniqueID';

    // Reference for the select list modal
    const selectListModalRef = useRef(null);

    // State variables for the title, notes, and selected list
    const [title, setTitle] = useState('');
    const [notes, setNotes] = useState('');
    const [selectedList, setSelectedList] = useState("Ingenium");

    /*
    * Function to handle pressing the select list modal button
    * When the user clicks on the "Liste" button, this function is triggered,
    * which opens the select list modal.
    */
    const handlePresentModalPress = () => {
        Keyboard.dismiss();
        selectListModalRef.current?.present();
    }

    /*
    * Function to handle the selection of a list from the modal
    * When a list is selected from the modal, this function is called.
    * It updates the selectedList state with the chosen list name,
    * and then dismisses the modal.
    */
    const handleListSelection = (buttonTextLeft) => {
        setSelectedList(buttonTextLeft);
        //console.log("list name: " + buttonTextLeft)
        selectListModalRef.current?.dismiss(); // Closes the modal
    };

    // Function to navigate to the edit task details screen
    const navigateToAddTaskDetails = () => {
        // Dismiss the keyboard and navigate to the edit task details screen
        Keyboard.dismiss();
        navigation.navigate("CreateTaskDetails_Screen");
        // Optional: Pass additional props like title and notes to the EditTaskDetails screen for further use
        // navigation.navigate("EditTaskDetails_Screen", {title, notes});
    };
    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <View style={isDarkMode ? styles.containerDark : styles.containerLight}>
            {/* Custom back button */}
            <CustomBackButton onPress={handleGoBack}/>
            <View style={isDarkMode ? styles.contentDark : styles.contentLight}>
                {/* Header */}
                <Text style={[isDarkMode ? styles.textDark : styles.textLight, styles.header]}>
                    Aufgabe hinzufügen
                </Text>
                {/* Spacing */}
                <View style={styles.spacing}></View>
                {/* Input fields for title and notes */}
                <View style={isDarkMode ? styles.textInputBoxesDark : styles.textInputBoxesLight}>
                    <View style={[styles.textInputBox,
                        isDarkMode ? styles.borderDark : styles.borderLight]}>
                        <TextInput
                            placeholder={"Titel"}
                            placeholderTextColor={isDarkMode ? DARKMODE.PLACEHOLDER_TEXTCOLOR : LIGHTMODE.PLACEHOLDER_TEXTCOLOR}
                            style={isDarkMode ? styles.inputDark : styles.inputLight}
                            selectionColor={isDarkMode ? DARKMODE.CURSOR_COLOR : LIGHTMODE.CURSOR_COLOR}
                            onChangeText={(title) => setTitle(title)}
                            value={title}
                            keyboardAppearance={isDarkMode ? "dark" : "light"}
                            returnKeyType="done"
                        />
                    </View>
                    <View style={isDarkMode ? styles.textInputBoxNotesDark : styles.textInputBoxNotesLight}>
                        <TextInput placeholder={"Notizen"}
                                   placeholderTextColor={isDarkMode ? DARKMODE.PLACEHOLDER_TEXTCOLOR : LIGHTMODE.PLACEHOLDER_TEXTCOLOR}
                                   style={isDarkMode ? styles.inputDarkNotes : styles.inputLightNotes}
                                   selectionColor={isDarkMode ? DARKMODE.CURSOR_COLOR : LIGHTMODE.CURSOR_COLOR}
                                   maxLength={1000}
                                   multiline={true}
                                   scrollEnabled={true}
                                   onChangeText={(notes) => setNotes(notes)}
                                   value={notes}
                                   inputAccessoryViewID={inputAccessoryViewID}
                                   keyboardAppearance={isDarkMode ? "dark" : "light"}
                        />
                        {/* Custom keyboard button */}
                        <InputAccessoryView nativeID={inputAccessoryViewID}>
                            <TouchableOpacity onPress={() => Keyboard.dismiss()}
                                              style={isDarkMode ? styles.keyboardButtonDark : styles.keyboardButtonLight}>
                                <Text style={styles.keyboardButtonLabel}>Fertig</Text>
                            </TouchableOpacity>
                        </InputAccessoryView>
                    </View>
                </View>
                {/* Spacing */}
                <View style={styles.spacing}></View>
                {/* Custom box buttons for selecting list and navigating to edit task details */}
                <View>
                    <CustomBoxButton
                        buttonTextLeft={"Liste"}
                        buttonTextRight={selectedList}
                        iconBoxBackgroundColor={COLOR.ICONCOLOR_CUSTOM_BLUE}
                        iconName={ICONS.TASKICONS.LIST}
                        iconColor={COLOR.BUTTONLABEL}
                        onPress={handlePresentModalPress}
                        showForwardIcon={true}
                        extraPadding={10}
                    />
                    <View style={styles.spacing}></View>
                    <CustomBoxButton
                        buttonTextLeft={"Details"}
                        buttonTextRight={""}
                        iconBoxBackgroundColor={COLOR.ICONCOLOR_CUSTOM_BLUE}
                        iconName={ICONS.TASKICONS.CURVED_LINE}
                        iconColor={COLOR.BUTTONLABEL}
                        onPress={navigateToAddTaskDetails}
                        showForwardIcon={true}
                        extraPadding={10}
                    />
                </View>
                {/* Optional buttons for saving and canceling */}
                <View style={styles.buttonBox}>
                    <View style={styles.buttonOne}>
                        <CustomButton title={"Speichern"}
                                      onPressFunction={() => console.log("Speichern gedrückt - Titel: " + title + ", Notizen: " + notes + ", Ausgewählte Liste: " + selectedList)}/>
                    </View>
                    <View style={styles.buttonTwo}>
                        <CustomButton title={"Abbrechen"} onPressFunction={() => handleGoBack()}/>
                    </View>
                </View>
            </View>
            {/* Select list modal */}
            <SelectListModal
                ref={selectListModalRef}
                onSelect={handleListSelection} // Prop for the callback function
            />
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
        //fontSize: SIZES.SCREEN_TEXT_NORMAL,
    },
    textDark: {
        color: DARKMODE.TEXT_COLOR,
        //fontSize: SIZES.SCREEN_TEXT_NORMAL,
    },
    // Spacing between elements
    spacing: {
        marginVertical: SIZES.SPACES_VERTICAL_BETWEEN_BOXES,
    },
    // Text input box styles for light and dark mode
    textInputBoxesLight: {
        backgroundColor: LIGHTMODE.BOX_COLOR,
        borderRadius: SIZES.BORDER_RADIUS
    },
    textInputBoxesDark: {
        backgroundColor: DARKMODE.BOX_COLOR,
        borderRadius: SIZES.BORDER_RADIUS
    },
    // Title input box styles for light and dark mode
    textInputBox: {
        paddingVertical: SIZES.SPACING_HORIZONTAL_DEFAULT,
    },
    // Notes input box styles for light and dark mode
    textInputBoxNotesLight: {
        padding: SIZES.SPACING_HORIZONTAL_DEFAULT,
    },
    textInputBoxNotesDark: {
        padding: SIZES.SPACING_HORIZONTAL_DEFAULT
    },
    // Border styles for light and dark mod
    borderLight: {
        borderBottomWidth: 1,
        borderColor: LIGHTMODE.BACKGROUNDCOLOR,
        marginHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT
    },
    borderDark: {
        borderBottomWidth: 1,
        borderColor: DARKMODE.BACKGROUNDCOLOR,
        marginHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT
    },
    // Title input styles for light and dark mode
    inputLight: {
        fontSize: SIZES.TEXTINPUT_SIZE,
        color: LIGHTMODE.TEXTINPUT_COLOR,
        textAlign: "left",
    },
    inputDark: {
        fontSize: SIZES.TEXTINPUT_SIZE,
        color: DARKMODE.TEXTINPUT_COLOR,
        textAlign: "left",
    },
    // Notes input styles for light and dark mode
    inputLightNotes: {
        fontSize: SIZES.TEXTINPUT_SIZE,
        color: LIGHTMODE.TEXTINPUT_COLOR,
        textAlign: "left",
        height: 100,
    },
    inputDarkNotes: {
        fontSize: SIZES.TEXTINPUT_SIZE,
        color: DARKMODE.TEXTINPUT_COLOR,
        textAlign: "left",
        height: 100,
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
    },
    keyboardButtonLight: {
        backgroundColor: LIGHTMODE.BUTTONCOLOR,
        borderBottomWidth: 1,
        borderColor: LIGHTMODE.BACKGROUNDCOLOR,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    keyboardButtonDark: {
        backgroundColor: DARKMODE.BUTTONCOLOR,
        borderBottomWidth: 1,
        borderColor: DARKMODE.BACKGROUNDCOLOR,
        paddingHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT,
        paddingVertical: 10
    },
    keyboardButtonLabel: {
        fontSize: SIZES.BUTTON_LABEL_SIZE,
        color: COLOR.BUTTONLABEL,
        textAlign: "right",
    }
})