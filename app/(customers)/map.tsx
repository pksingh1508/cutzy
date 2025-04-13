import { Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import MapView, { Marker } from "react-native-maps";

const MapPage = () => {
  const userLat = 26.716442;
  const userLgt = 83.448663;

  // get the user location

  // get all the shop locations from the database

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        mapType={Platform.OS === "android" ? "standard" : "mutedStandard"}
        initialRegion={{
          latitude: 26.716442,
          longitude: 83.448663,
          latitudeDelta: 1.0,
          longitudeDelta: 0.2
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
