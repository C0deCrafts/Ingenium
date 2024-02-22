import {Text, View, StyleSheet, SafeAreaView} from "react-native";
import CustomDrawerHeader from "../../components/CustomDrawerHeader";
import {COLOR} from "../../constants/styleSettings";

function Tasks({navigation}){
    return (
        <SafeAreaView  style={styles.container}>
            <CustomDrawerHeader title="Aufgaben" onPress={()=> navigation.openDrawer()}/>
            <View style={styles.content}>
                <Text>Aufgaben</Text>
            </View>
        </SafeAreaView>
    )
}

export default Tasks;

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