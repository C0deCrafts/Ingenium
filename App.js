import 'react-native-gesture-handler';
import AppNavigation from "./src/navigation/AppNavigation";
import {ThemeProvider} from "./src/constants/context/ThemeContext";

export default function App() {
    return (
        <ThemeProvider>
            <AppNavigation/>
        </ThemeProvider>
    );
}
