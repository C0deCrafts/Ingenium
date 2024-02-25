import {Text, View, StyleSheet, Modal} from "react-native";
import CustomButton from "./CustomButton";


function AddTaskModal({onCloseModal, onCreateTask, onCreateList, visible}) {
    return (

            <Modal
                visible={visible}
                animationType={"slide"}
            >
                <View style={styles.contentContainer}>
                    <View style={styles.buttonContainer}>
                        <CustomButton title={"Neue Liste"} onPressFunction={onCreateList}/>
                        <CustomButton title={"Neue Aufgabe"} onPressFunction={onCreateTask}/>
                        {/**/}
                        <CustomButton title={"Schließen"} onPressFunction={onCloseModal}/>
                    </View>
                </View>
            </Modal>

    );
}

export default AddTaskModal;

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "flex-end",

    },
    buttonContainer: {
        rowGap: 20,
        width: '50%',
        //add insets instead of padding
        paddingBottom: 200
    }
});