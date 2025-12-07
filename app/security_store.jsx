import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const isWeb = Platform.OS === "web";

export const Storage = {
  async getItem(key) {
    if (isWeb) {
      return await localStorage.getItem(key);
    } else {
      return await SecureStore.getItemAsync(key);
    }
  },

  async setItem(key, value) {
    if (isWeb) {
      return await localStorage.setItem(key, value);
    } else {
      return await SecureStore.setItemAsync(key, value);
    }
  },

  async deleteItemAsync(key) {
    if (isWeb) {
      return await localStorage.removeItem(key);
    } else {
      return await SecureStore.deleteItemAsync(key);
    }
  },
};