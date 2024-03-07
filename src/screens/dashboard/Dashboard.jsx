import {Text, View, StyleSheet, ScrollView} from "react-native";
import CustomDrawerHeader from "../../components/buttons/CustomDrawerHeader";
import {DARKMODE, LIGHTMODE} from "../../constants/styleSettings";
import {useTheme} from "../../context/ThemeContext";
import {useEffect} from "react";
import CustomInputField from "../../components/inputFields/CustomInputField";
import CustomButton from "../../components/buttons/CustomButton";
import {useDatabase} from "../../context/DatabaseContext";

function Dashboard({navigation}){
    const { theme } = useTheme();
    const isDarkMode = theme === DARKMODE;

    const { lists, loadLists, deleteAllLists} = useDatabase();

    // Lade die Listen sofort, wenn die Seite zum ersten Mal angezeigt wird
    // oder wenn sich loadLists ändert
    useEffect(() => {
        loadLists();
    }, []);

    return (
        <View  style={isDarkMode ? styles.containerDark : styles.containerLight}>
            <CustomDrawerHeader onPress={()=> navigation.openDrawer()}/>
            <View style={isDarkMode ? styles.contentDark : styles.contentLight}>
                <Text style={isDarkMode ? styles.textDark : styles.textLight}>Dashboard</Text>
            </View>
            <ScrollView>
                {lists.map((lists) => (
                    <View key={lists.listId}>
                        <Text>{lists.listId}:{lists.listName}:{lists.iconName}:{lists.iconBackgroundColor}</Text>
                        <CustomInputField
                            isUserIcon={true}
                            iconName={lists.iconName}
                            iconBoxBackgroundColor={lists.iconBackgroundColor}
                            placeholder={lists.listName}
                        />
                    </View>
                ))}
            </ScrollView>
            <CustomButton title={"Lösche alle Listen"} onPressFunction={deleteAllLists}/>
        </View>
    )
}

export default Dashboard;

const styles = StyleSheet.create({
    containerLight: {
        flex: 1,
        backgroundColor: LIGHTMODE.BACKGROUNDCOLOR
    },
    containerDark: {
        flex: 1,
        backgroundColor: DARKMODE.BACKGROUNDCOLOR
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