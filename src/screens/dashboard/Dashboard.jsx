import {Text, View, StyleSheet, SafeAreaView} from "react-native";
import CustomDrawerHeader from "../../components/CustomDrawerHeader";
import {COLOR} from "../../constants/styleSettings";
function Dashboard({navigation}){

    return (
        <SafeAreaView  style={styles.container}>
            <CustomDrawerHeader onPress={()=> navigation.openDrawer()}/>
            <View style={styles.content}>
                <Text>Dashboard</Text>
            </View>
        </SafeAreaView>
    )
}

export default Dashboard;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        flex: 1,
        backgroundColor: COLOR.BACKGROUNDCOLOR,
        justifyContent: 'center',
        alignItems: 'center',
    },
})