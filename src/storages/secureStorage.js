import * as SecureStore from "expo-secure-store";

// secure storage
export const saveSecurely = async (key, value) => {
    try{
        const jsonValue = JSON.stringify(value);
        await SecureStore.setItemAsync(key, value);
    }catch (err){
        console.error("Error saving data in secure store: ", err);
    }
}

export const loadSecurely = async (key) => {
    try{
        const jsonValue = await SecureStore.getItemAsync(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    }catch (err){
        console.error("Error loading data from secure store: ", err);
    }
}

export const deleteSecurely = async (key) => {
    return await SecureStore.deleteItemAsync(key);
}