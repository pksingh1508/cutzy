import React from "react";
import { Tabs } from "expo-router";
import {
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons
} from "@expo/vector-icons";
import { Text } from "react-native";
import Colors from "@/constants/Colors";

const CustomerLayout = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#3a82f7",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: Colors.background,
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
          backgroundColor: Colors.background
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
            route.name === "map"
              ? "Map"
              : route.name === "appointment"
              ? "Appointments"
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
        name="map"
        options={{
          title: "Map",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="map-marker-radius-outline"
              size={size}
              color={color}
            />
          )
          // headerShown: false
        }}
      />
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

export default CustomerLayout;
