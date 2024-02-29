import {View, StyleSheet, Text, ScrollView} from 'react-native';
import React, {forwardRef, Fragment, useCallback, useMemo} from 'react';
import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import {DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import CustomBoxButton from "../buttons/CustomBoxButton";
import {useTheme} from "../../constants/context/ThemeContext";
import {testDataSelectList} from "../../constants/userData";
import {Dimensions} from 'react-native';


const SelectListModal = forwardRef((props, ref) => {
    const {theme} = useTheme();
    const isDarkMode = theme === DARKMODE;
    const testData = testDataSelectList;

    // Bildschirmhöhe ermitteln
    const {height: screenHeight} = Dimensions.get('window');
    const modalHeight = screenHeight * 0.6; // 60% der Bildschirmhöhe
    // Box für die Listenelemente an das ModalHeight anpassen
    const listBoxMaxHeight = modalHeight - 150;

    const snapPoints = [modalHeight];
    // renders
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
                        {testData.map((item, index) => (
                            <Fragment key={item.id}>
                                <CustomBoxButton
                                    buttonTextLeft={item.buttonTextLeft}
                                    iconName={item.iconName}
                                    iconBoxBackgroundColor={item.iconBoxBackgroundColor}
                                    iconColor={item.iconColor}
                                    showForwardIcon={false}
                                    onPress={() => props.onSelect(item.buttonTextLeft)}
                                />
                                {/* Fügen Sie den Border hinzu, außer nach dem letzten Element */}
                                {index !== testData.length - 1 && (
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