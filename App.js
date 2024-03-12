import 'react-native-gesture-handler';
import AppNavigation from "./src/navigation/AppNavigation";
import {ThemeProvider} from "./src/context/ThemeContext";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {DatabaseProvider} from "./src/context/DatabaseContext";

export default function App() {
    return (
        <ThemeProvider>
            <GestureHandlerRootView style={{flex: 1}}>
                <BottomSheetModalProvider>
                    <DatabaseProvider>
                        <AppNavigation/>
                    </DatabaseProvider>
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
        </ThemeProvider>
    );
}
