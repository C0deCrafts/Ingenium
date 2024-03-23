import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveProfileImage = async (imageUri) => {
    try {
        await AsyncStorage.setItem("storedProfileImage", imageUri);
        console.log("Bild erfolgreich gespeichert");
    } catch (err) {
        console.error("Fehler beim Speichern des Profilbildes: ", err);
    }
};

export const loadProfileImage = async () => {
    try {
        const imageUri = await AsyncStorage.getItem("storedProfileImage");
        if (imageUri !== null) {
            return imageUri;
        }
    } catch (err) {
        console.error("Fehler beim Laden des Profilbildes: ", err);
    }
    return null; // Falls kein Bild gefunden wurde oder ein Fehler aufgetreten ist
};

export const saveThemeMode = async (themeMode) => {
    try {
        await AsyncStorage.setItem('themeMode', themeMode);
        console.log("THEME MODE:", themeMode)
        console.log("Theme-Modus erfolgreich gespeichert");
    } catch (err) {
        console.error("Fehler beim Speichern des Theme-Modus: ", err);
    }
};

export const loadThemeMode = async () => {
    try {
        const themeMode = await AsyncStorage.getItem('themeMode');
        return themeMode != null ? themeMode : null;
    } catch (err) {
        console.error("Fehler beim Laden des Theme-Modus: ", err);
        return null;
    }
};


//helper function
export const logAllStoredData = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys(); // Alle Schlüssel abrufen
        const items = await AsyncStorage.multiGet(keys); // Alle Werte für die Schlüssel abrufen
        console.log('Gespeicherte Daten im AsyncStorage:', items);
    } catch (error) {
        console.error('Fehler beim Abrufen der AsyncStorage Daten:', error);
    }
}