import * as SecureStore from "expo-secure-store";

export const saveItem = async (key, value) => {
    try {
        await SecureStore.setItemAsync(key, value);
        console.log(`Saved ${key}`);
    } catch (error) {
        console.error(`Error saving ${key}: `, error);
    }
};

export const getItem = async (key) => {
    try {
        const value = await SecureStore.getItemAsync(key);
        return value;
    } catch (error) {
        console.error(`Error getting ${key}: `, error);
        return null;
    }
};

export const removeItem = async (key) => {
    try {
        await SecureStore.deleteItemAsync(key);
        console.log(`Removed ${key}`);
    } catch (error) {
        console.error(`Error removing ${key}: `, error);
    }
};