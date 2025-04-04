import React from "react";
import { Stack } from "expo-router";

const AdditionalLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#cdd0d8"
        },
        headerTitleStyle: {
          color: "#3a82f7",
          fontFamily: "pop-m",
          fontSize: 23
        }
      }}
    >
      <Stack.Screen
        name="addServices"
        options={{
          title: "Add Services"
        }}
      />
      <Stack.Screen
        name="addBarber"
        options={{
          title: "Add Barber"
        }}
      />
      <Stack.Screen
        name="editProfile"
        options={{
          title: "Edit Profile"
        }}
      />
      <Stack.Screen
        name="updateBarber"
        options={{
          title: "Update Barber"
        }}
      />
    </Stack>
  );
};

export default AdditionalLayout;
