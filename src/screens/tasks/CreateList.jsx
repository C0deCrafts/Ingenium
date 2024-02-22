import {Text, View, StyleSheet, SafeAreaView} from "react-native";
function CreateList(){


    return (
        <SafeAreaView  style={styles.container}>
            <View style={styles.content}>
                <Text>Create List</Text>
            </View>
        </SafeAreaView>
    )
}

export default CreateList;

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