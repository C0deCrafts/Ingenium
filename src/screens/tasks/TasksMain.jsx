import {Text, View, StyleSheet, SafeAreaView} from "react-native";
import CustomDrawerHeader from "../../components/CustomDrawerHeader";
import {COLOR} from "../../constants/styleSettings";
import CustomButton from "../../components/CustomButton";

function TasksMain({navigation}){
    return (
        <SafeAreaView  style={styles.container}>
            <CustomDrawerHeader title="Aufgaben" onPress={()=> navigation.openDrawer()}/>
            <View style={styles.content}>
                <Text>Aufgaben</Text>
            </View>
            <CustomButton title={"Alle"} onPressFunction={()=>{navigation.navigate("ListTasks_Screen")}}/>
            <CustomButton title={"Inbox"} onPressFunction={()=>{navigation.navigate("Inbox_Stack")}}/>
            <CustomButton title={"Erledigt"} onPressFunction={()=>{navigation.navigate("CompletedTasks_Stack")}}/>
            <CustomButton title={"Neue Aufgabe"} onPressFunction={()=>{navigation.navigate("CreateTask_Screen")}}/>
            <CustomButton title={"Neue Liste"} onPressFunction={()=>{navigation.navigate("CreateList_Stack")}}/>
        </SafeAreaView>
    )
}

export default TasksMain;

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