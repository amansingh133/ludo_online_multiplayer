import AsyncStorage from "@react-native-async-storage/async-storage";

const reduxStorage = {
  setItem: async (key, value) => {
    await AsyncStorage.setItem(key, value);
    return true;
  },
  getItem: async (key) => {
    const value = await AsyncStorage.getItem(key);
    return value;
  },
  removeItem: async (key) => {
    await AsyncStorage.removeItem(key);
  },
};

export default reduxStorage;
