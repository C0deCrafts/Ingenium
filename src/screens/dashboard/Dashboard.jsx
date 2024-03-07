import {Text, View, StyleSheet, ScrollView} from "react-native";
import CustomDrawerHeader from "../../components/buttons/CustomDrawerHeader";
import {DARKMODE, LIGHTMODE} from "../../constants/styleSettings";
import {useTheme} from "../../context/ThemeContext";
import {localDatabase} from "../../databases/localDatabase";
import {useCallback, useEffect, useState} from "react";
import {useFocusEffect} from "@react-navigation/native";

function Dashboard({navigation}){
    const { theme } = useTheme();
    const isDarkMode = theme === DARKMODE;

    const {getLists} = localDatabase();
    const [lists, setLists] = useState([]);

    useFocusEffect(
        useCallback(() => {
            loadLists();
        }, [])
    );

        const loadLists = async () => {
            const result = await getLists();
            setLists(result[0].rows)
        };

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
                    </View>
                ))}
            </ScrollView>
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