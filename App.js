import 'react-native-gesture-handler';
import AppNavigation from "./src/navigation/AppNavigation";
import {ThemeProvider} from "./src/context/ThemeContext";
import {TasksProvider} from "./src/context/TasksContext";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {localDatabase} from "./src/databases/localDatabase";

export default function App() {
    const {getLists} = localDatabase();
    return (
        <ThemeProvider>
            <GestureHandlerRootView style={{flex: 1}}>
                <BottomSheetModalProvider>
                    <TasksProvider>
                        <AppNavigation/>
                    </TasksProvider>
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
        </ThemeProvider>
    );
}
