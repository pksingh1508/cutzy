import { Alert, Modal, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "../commonUi/CustomButton";
import * as Location from "expo-location";
import { LinearGradient } from "expo-linear-gradient";
import MapView, { Marker } from "react-native-maps";

interface Props {
  lat: number;
  lgt: number;
  setLat: (x: number) => void;
  setLgt: (x: number) => void;
}

const ChooseLocation = ({ lat, lgt, setLat, setLgt }: Props) => {
  const [visible, setVisible] = useState(false);
  const [coordinate, setCoordinate] = useState({
    latitude: lat !== 0.0 ? lat : 26.716442,
    longitude: lgt !== 0.0 ? lgt : 83.448663
  });

  // useEffect to set the latitude and longitude when user select on map
  useEffect(() => {
    setLat(coordinate.latitude);
    setLgt(coordinate.longitude);
  }, [coordinate]);

  const useCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Location permission is required");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    if (location) {
      setLat(location.coords.latitude);
      setLgt(location.coords.longitude);
    }
  };

  const goMapPicker = () => {
    setVisible(true);
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Latitude : {lat}</Text>
        <Text style={styles.text}>Longitude : {lgt}</Text>
      </View>
      <View style={styles.btnContainer}>
        <CustomButton
          title="Use current location"
          onPress={useCurrentLocation}
          customStyle={{
            width: "47%"
          }}
          textStyle={{
            fontSize: 15,
            fontFamily: "pop-r"
          }}
        />
        <CustomButton
          title="Choose on map"
          onPress={goMapPicker}
          customStyle={{
            width: "47%"
          }}
          textStyle={{
            fontSize: 15,
            fontFamily: "pop-r"
          }}
        />
      </View>
      <Modal
        animationType="slide"
        visible={visible}
        onRequestClose={() => setVisible(!visible)}
      >
        <View style={{ flex: 1 }}>
          <View>
            <MapView
              style={styles.map}
              mapType="hybrid"
              initialRegion={{
                latitude: 26.716442,
                longitude: 83.448663,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              }}
            >
              <Marker
                draggable
                coordinate={coordinate}
                onDragEnd={(e) => setCoordinate(e.nativeEvent.coordinate)}
              />
            </MapView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  container: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#9499a5",
    paddingVertical: 12,
    paddingHorizontal: 10,
    gap: 10
  },
  text: {
    fontSize: 16,
    fontFamily: "pop-m"
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%"
  },
  map: {
    height: "100%",
    width: "100%"
  }
});
export default ChooseLocation;
