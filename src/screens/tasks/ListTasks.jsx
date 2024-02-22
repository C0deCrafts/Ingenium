import {Text, View, StyleSheet, SafeAreaView} from "react-native";
import CustomButton from "../../components/CustomButton";


function ListTasks({navigation}){

    return (
        <SafeAreaView  style={styles.container}>
            <View style={styles.content}>
                <Text>List Tasks</Text>
            </View>
            <CustomButton title={"Punkte im falschen Screen, ist dann im Overlay"} onPressFunction={()=>{navigation.push("EditTask_Screen")}}/>
        </SafeAreaView>
    )
}

export default ListTasks;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})