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

    const showAllListsHelperFunction = () => {
        console.log("Alle Listen:");

        console.log("LIST ID:",lists[0].listId);

        console.log("Alle Listen:");
        lists.forEach(innerList => {
            innerList.forEach(list => {
                console.log("LIST ID:", list.listId);
                console.log("LIST Name:", list.listName);
                console.log("Icon Name:", list.iconName);
                console.log("Icon Background Color:", list.iconBackgroundColor);
            });
        });
    }

    return (
        <View  style={isDarkMode ? styles.containerDark : styles.containerLight}>
            <CustomDrawerHeader onPress={()=> navigation.openDrawer()}/>
            <View style={isDarkMode ? styles.contentDark : styles.contentLight}>
                <Text style={isDarkMode ? styles.textDark : styles.textLight}>Dashboard</Text>
            </View>
            <ScrollView>
                {lists.flat().map(list => (
                    <View key={list.listId}>
                        <Text>{list.listId}:{list.listName}:{list.iconName}:{list.iconBackgroundColor}</Text>
                        <CustomInputField
                            isUserIcon={true}
                            iconName={list.iconName}
                            iconBoxBackgroundColor={list.iconBackgroundColor}
                            placeholder={list.listName}
                        />
                    </View>
                ))}
            </ScrollView>
            <CustomButton title={"Lösche alle Listen"} onPressFunction={deleteAllLists}/>
            <CustomButton title={"Zeige alle Listen"} onPressFunction={showAllListsHelperFunction}/>
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