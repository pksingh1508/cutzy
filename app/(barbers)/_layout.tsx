import React from "react";
import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Text } from "react-native";
import Colors from "@/constants/Colors";

const BarberLayout = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#3a82f7",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#c1c4d4",
          height: 65,
          paddingBottom: 10,
          paddingTop: 10
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginLeft: 4
        },
        tabBarIconStyle: {
          marginBottom: 0
        },
        headerStyle: {
          backgroundColor: "#cdd0d8"
        },
        headerTitleStyle: {
          color: "#3a82f7",
          fontFamily: "pop-m",
          fontSize: 23
        },
        headerTitleAlign: "center",
        tabBarLabel: ({ focused }) => {
          if (!focused) return null;
          let label =
            route.name === "appointment"
              ? "Appointments"
              : route.name === "dashboard"
              ? "Dashboard"
              : route.name === "profile"
              ? "Profile"
              : "";

          return (
            <Text style={{ fontSize: 12, marginLeft: 4, color: "#3a82f7" }}>
              {label}
            </Text>
          );
        },
        tabBarItemStyle: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 4
        }
      })}
    >
      <Tabs.Screen
        name="appointment"
        options={{
          title: "Appointments",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="event" size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="dashboard" size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          )
        }}
      />
    </Tabs>
  );
};

export default BarberLayout;
