import 'react-native-gesture-handler';
import AppNavigation from "./src/navigation/AppNavigation";
import {ThemeProvider} from "./src/context/ThemeContext";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {DatabaseProvider} from "./src/context/DatabaseContext";
import {AuthProvider} from "./src/context/AuthContext";

// TODO: FIX Problem - if we on the login screen - database load the data
// we want load the data if we are logged in
export default function App() {
    return (
        <ThemeProvider>
            <GestureHandlerRootView style={{flex: 1}}>
                <BottomSheetModalProvider>
                    <AuthProvider>
                        <DatabaseProvider>
                            <AppNavigation/>
                        </DatabaseProvider>
                    </AuthProvider>
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
        </ThemeProvider>
    );
}
