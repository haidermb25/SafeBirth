import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Navigation from "./Navigations/Navigation";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NameProvider } from "./Api/ContextApi";

export default function App() {
  useEffect(() => {
    const clearAsyncStorageOnFirstLaunch = async () => {
      try {
        const isFirstTime = await AsyncStorage.getItem("isFirstLaunch");
        if (!isFirstTime) {
          await AsyncStorage.clear();
          await AsyncStorage.setItem("isFirstLaunch", "true");
        }
      } catch (error) {
        console.error("Error clearing async storage:", error);
      }
    };

    clearAsyncStorageOnFirstLaunch();
  }, []);
  return (
    <NameProvider>
      <Navigation />
      <Toast />
    </NameProvider>
  );
}
