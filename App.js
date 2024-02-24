import 'react-native-gesture-handler';
import AppNavigation from "./src/navigation/AppNavigation";
import {ThemeProvider} from "./src/constants/context/ThemeContext";
import {TasksProvider} from "./src/constants/context/TasksContext";

export default function App() {
    return (
        <ThemeProvider>
            <TasksProvider>
                <AppNavigation/>
            </TasksProvider>
        </ThemeProvider>
    );
}
