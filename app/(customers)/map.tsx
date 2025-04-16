import { Alert, Button, Platform, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useRef } from "react";
import Colors from "@/constants/Colors";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const MapPage = () => {
  const [location, setLocation] =
    React.useState<Location.LocationObject | null>(null);
  const userLat = location?.coords.latitude || 26.716442;
  const userLgt = location?.coords.longitude || 83.448663;

  // get the user location from the device using expo-location
  useEffect(() => {
    getCurrentUserLocation();
  }, []);

  const getCurrentUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
      console.log("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    console.log("location", location);
  };

  // get all the shop locations from the database

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        // mapType={Platform.OS === "android" ? "standard" : "mutedStandard"}
        mapType="hybrid"
        initialRegion={{
          latitude: userLat || 26.716442,
          longitude: userLgt || 83.448663,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}
      >
        <Marker
          coordinate={{
            latitude: userLat,
            longitude: userLgt
          }}
          title="Your Current Location"
        />
      </MapView>
      <View style={{ flex: 1, position: "absolute" }}>
        <Text>Hello</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  map: {
    width: "100%",
    height: "100%"
  }
});
export default MapPage;
