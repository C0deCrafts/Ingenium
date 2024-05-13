import 'react-native-gesture-handler';
import AppNavigation from "./src/navigation/AppNavigation";
import {ThemeProvider} from "./src/context/ThemeContext";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {AuthProvider} from "./src/context/AuthContext";
import {NavProvider} from "./src/context/NavContext";

export default function App() {
    return (
        <ThemeProvider>
            <GestureHandlerRootView style={{flex: 1}}>
                <BottomSheetModalProvider>
                    <AuthProvider>
                        <NavProvider>
                            <AppNavigation/>
                        </NavProvider>
                    </AuthProvider>
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
        </ThemeProvider>
    );
}
