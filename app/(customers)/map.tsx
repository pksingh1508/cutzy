import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import MapContainer from "@/components/customer/MapContainer";
import NearByBarber from "@/components/customer/NearByBarber";

const MapPage = () => {
  const [isMapView, setIsMapView] = useState(true);

  return (
    <View style={styles.container}>
      {isMapView ? <MapContainer /> : <NearByBarber />}
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => setIsMapView(!isMapView)}
      >
        <FontAwesome5 name="exchange-alt" size={24} color="black" />
      </TouchableOpacity>
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
  },
  buttonContainer: {
    flex: 1,
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: Colors.background,
    padding: 15,
    borderRadius: "50%",
    borderColor: "blue",
    borderWidth: 1
  }
});
export default MapPage;
