import {Text, View, StyleSheet, SafeAreaView} from "react-native";
import CustomButton from "../../components/CustomButton";

function ListTasks({navigation}){

    return (
        <SafeAreaView  style={styles.container}>
            <View style={styles.content}>
                <Text>List Tasks</Text>
            </View>
            <CustomButton title={"Details"} onPressFunction={()=>{navigation.navigate("EditTaskDetails_Screen")}}/>
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