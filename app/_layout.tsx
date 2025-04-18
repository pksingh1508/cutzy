import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  }
};

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error("Missing Publishable Key. Please set the Key.");
}

// Prevent the Splash Screen from the auto-hiding
SplashScreen.preventAutoHideAsync();
// SplashScreen.setOptions({
//   duration: 3000,
//   fade: true
// });

const MainLayout = () => {
  const [loaded] = useFonts({
    "park-r": require("../assets/fonts/Parkinsans-Regular.ttf"),
    "park-m": require("../assets/fonts/Parkinsans-Medium.ttf"),
    "park-b": require("../assets/fonts/Parkinsans-Bold.ttf"),
    "pop-r": require("../assets/fonts/Poppins-Regular.ttf"),
    "pop-m": require("../assets/fonts/Poppins-Medium.ttf"),
    "pop-b": require("../assets/fonts/Poppins-Bold.ttf")
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return;

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="(auth)"
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="(barbers)"
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="(customers)"
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="(routes)"
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="additionalPath"
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="additionalPathCustomer"
            options={{
              headerShown: false
            }}
          />
        </Stack>
        <StatusBar style="dark" />
        <Toast />
      </ClerkLoaded>
    </ClerkProvider>
  );
};

export default MainLayout;
