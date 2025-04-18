import React from "react";
import { Stack } from "expo-router";
import Colors from "@/constants/Colors";

const AdditionalLayoutCustomer = () => {
  return (
    <Stack>
      <Stack.Screen
        name="[shop_id]"
        options={{
          title: "Shop Details",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: Colors.background
          },
          headerTintColor: "#000",
          headerTitleStyle: {
            fontWeight: "bold"
          }
        }}
      />
      <Stack.Screen
        name="chooseBarber"
        options={{
          title: "Choose Barber",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: Colors.background
          },
          headerTintColor: "#000",
          headerTitleStyle: {
            fontWeight: "bold"
          }
        }}
      />
    </Stack>
  );
};

export default AdditionalLayoutCustomer;
