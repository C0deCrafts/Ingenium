import {Text, View, StyleSheet} from "react-native";
import CustomBackButton from "../../components/buttons/CustomBackButton";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {DARKMODE, LIGHTMODE, SIZES} from "../../constants/styleSettings";
import {useTheme} from "../../context/ThemeContext";
import {useTabContext} from "../../navigation/context/TabContext";
import { useEffect } from 'react';

function Inbox(){
    const { theme } = useTheme();
    const isDarkMode = theme === DARKMODE;
    const navigation = useNavigation(); // useNavigation-Hook verwenden
    const { navigateAndSetSelectedTab } = useTabContext(); // Funktion aus Ihrem Kontext holen

    const handleGoBack = () => {
        //fix das Problem, dass bei IOS Wishgeste handleGoBack NICHT aufgerufen wird!!
        //dadurch wird Farbe nicht geändert
        console.log("Navigation goBack wurde in der Inbox aufgerufen")
        //navigation.goBack(); // Zuerst zurück zur vorherigen Seite
        //navigateAndSetSelectedTab('Task_Tab', 'Task_Stack'); // Setzen Sie die Route zurück auf Task_Tab und Task_Stack
        //navigation.goBack();
        navigateAndSetSelectedTab('Task_Tab', 'Task_Stack');
    }

    return (
        <View  style={isDarkMode ? styles.containerDark : styles.containerLight}>
            <CustomBackButton
                onPress={handleGoBack}
                showTitle={true}
                title={"Inbox"}
                backLabel={"Zurück zu Tasks"}
            />
            <View style={isDarkMode ? styles.contentDark : styles.contentLight}>
                <Text style={isDarkMode ? styles.textDark : styles.textLight}>Inbox</Text>
            </View>
        </View>
    )
}

export default Inbox;

const styles = StyleSheet.create({
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
    contentLight: {
        flex: 1,
        backgroundColor: LIGHTMODE.BACKGROUNDCOLOR,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentDark: {
        flex: 1,
        backgroundColor: DARKMODE.BACKGROUNDCOLOR,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textLight: {
        color: LIGHTMODE.TEXT_COLOR,
    },
    textDark: {
        color: DARKMODE.TEXT_COLOR,
    }
})