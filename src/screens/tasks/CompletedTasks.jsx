import {Text, View, StyleSheet, SafeAreaView} from "react-native";
function CompletedTasks(){

    return (
        <SafeAreaView  style={styles.container}>
            <View style={styles.content}>
                <Text>CompletedTasks</Text>
            </View>
        </SafeAreaView>
    )
}

export default CompletedTasks;

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