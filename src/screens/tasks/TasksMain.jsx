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
            <CustomButton title={"List tasks"} onPressFunction={()=>{navigation.navigate("ListTasks_Stack")}}/>
            <CustomButton title={"Inbox Stack"} onPressFunction={()=>{navigation.navigate("Inbox_Stack")}}/>
            <CustomButton title={"Completed Task"} onPressFunction={()=>{navigation.navigate("CompletedTasks_Stack")}}/>
            <CustomButton title={"CreateTask Stack"} onPressFunction={()=>{navigation.navigate("CreateTask_Stack")}}/>
            <CustomButton title={"Create List"} onPressFunction={()=>{navigation.navigate("CreateList_Stack")}}/>
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