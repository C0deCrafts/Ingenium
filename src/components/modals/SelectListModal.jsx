import {View, StyleSheet, Text, ScrollView,Dimensions} from 'react-native';
import {forwardRef, Fragment, useCallback} from 'react';
import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import {DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import CustomBoxButton from "../buttons/CustomBoxButton";
import {useTheme} from "../../context/ThemeContext";
import {useDatabase} from "../../context/DatabaseContext";

/**
 * ### SelectListModal Component
 *
 * This component displays a modal bottom sheet containing a selectable list.
 * The list items are rendered using CustomBoxButton component.
 * The appearance of the modal and list items are determined by the current theme (dark/light).
 *
 * @param {Function} onSelect - Function to handle item selection from the list
 * @param {Function} ref - Forwarded ref function
 * @returns {JSX.Element} - SelectListModal component
 *
 * @example
 * // Create a ref to access the SelectListModal component's methods
 * const selectListModalRef = useRef(null);
 * // Define a function to handle item selection from the list
 * const handleSelect = (selectedItem) => {
 *     console.log("Selected item:", selectedItem);
 *     // Additional logic for handling selected item
 * };
 * //Render the SelectListModal component
 * <SelectListModal ref={selectListModalRef} onSelect={handleSelect} />
 */
const SelectListModal = forwardRef(({onSelect}, ref) => {
    const {theme} = useTheme();
    const isDarkMode = theme === DARKMODE;
    const {lists} = useDatabase();

    // Determine screen height
    const {height: screenHeight} = Dimensions.get('window');
    const modalHeight = screenHeight * 0.6; // 60% of screen height
    // Adjust box height to fit modal height
    const listBoxMaxHeight = modalHeight - 150;
    const snapPoints = [modalHeight];

    // This code renders a backdrop for the bottom sheet modal, which darkens the background when the modal is opened for a better user experience.
    const renderBackdrop = useCallback(
        (props) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
            />
        ),
        []
    );

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            backgroundStyle={isDarkMode ? {backgroundColor: DARKMODE.BACKGROUNDCOLOR} : {backgroundColor: LIGHTMODE.BACKGROUNDCOLOR}}
            handleIndicatorStyle={isDarkMode ? {backgroundColor: DARKMODE.BACKGROUNDCOLOR} : {backgroundColor: LIGHTMODE.BACKGROUNDCOLOR}}
        >
            <View style={styles.contentContainer}>
                <Text style={isDarkMode ? styles.containerHeadlineDark : styles.containerHeadlineLight}>Liste auswählen</Text>
                <View style={[isDarkMode ? styles.listBoxDark : styles.listBoxLight, { maxHeight: listBoxMaxHeight }]}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {lists.map((list, index) => (
                            <Fragment key={list.listId}>
                                <CustomBoxButton
                                    buttonTextLeft={list.listName}
                                    iconName={list.iconName}
                                    iconBoxBackgroundColor={list.iconBackgroundColor}
                                    iconColor={"white"}
                                    showForwardIcon={false}
                                    onPress={() => onSelect(list)}
                                    isUserIcon={true}
                                />
                                {/* Füge einen Trenner hinzu, außer nach dem letzten Element */}
                                {index !== lists.length - 1 && (
                                    <View style={isDarkMode ? styles.separatorDark : styles.separatorLight}/>
                                )}
                            </Fragment>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </BottomSheetModal>
    );
});

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
    },
    containerHeadlineLight: {
        color: LIGHTMODE.TEXT_COLOR,
        fontSize: SIZES.SCREEN_HEADER,
        fontWeight: SIZES.SCREEN_HEADER_WEIGHT,
        padding: 20
    },
    containerHeadlineDark: {
        color: DARKMODE.TEXT_COLOR,
        fontSize: SIZES.SCREEN_HEADER,
        fontWeight: SIZES.SCREEN_HEADER_WEIGHT,
        padding: 20
    },
    listBoxLight: {
        backgroundColor: LIGHTMODE.BOX_COLOR,
        marginHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT,
        padding: 10,
        borderRadius: SIZES.BORDER_RADIUS,
    },
    listBoxDark: {
        backgroundColor: DARKMODE.BOX_COLOR,
        marginHorizontal: SIZES.SPACING_HORIZONTAL_DEFAULT,
        padding: 10,
        borderRadius: SIZES.BORDER_RADIUS,
    },
    separatorLight: {
        height: 1,
        backgroundColor: LIGHTMODE.BACKGROUNDCOLOR,
        marginHorizontal: 10,
    },
    separatorDark: {
        height: 1,
        backgroundColor: DARKMODE.BACKGROUNDCOLOR,
        marginHorizontal: 10,
    },
});

export default SelectListModal;