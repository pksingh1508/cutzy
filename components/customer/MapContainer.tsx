import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { supabase } from "@/utils/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import useNearByShopStore from "@/store/useNearByShopData";
import CustomLoading from "../commonUi/CustomLoading";

const MapContainer = () => {
  const [location, setLocation] =
    React.useState<Location.LocationObject | null>(null);
  const userLat = location?.coords.latitude || 26.716442;
  const userLgt = location?.coords.longitude || 83.448663;
  const [data, setData] = useState<any>([]);
  const { setNearbyShops } = useNearByShopStore();
  const [isLoading, setIsLoading] = useState(false);

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
  };

  // get all the shop locations from the database
  useEffect(() => {
    fetchAllNearByShops();
  }, []);

  const fetchAllNearByShops = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.rpc("get_nearby_shops", {
        input_lat: userLat,
        input_lgt: userLgt,
        distance_meters: 10000
      });
      if (error) {
        Alert.alert("Error fetching nearby shops", error.message);
        console.log("Error fetching nearby shops", error.message);
      }
      if (data) {
        setData(data);
        setNearbyShops(data);
      }
    } catch (err: string | any) {
      Alert.alert("Something went wrong", err.message);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <CustomLoading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        mapType="hybrid"
        initialRegion={{
          latitude: userLat || 26.716442,
          longitude: userLgt || 83.448663,
          latitudeDelta: 0.036,
          longitudeDelta: 0.036
        }}
      >
        {data.map((shop: any, index: number) => (
          <Marker
            coordinate={{
              latitude: shop.location.lat,
              longitude: shop.location.lgt
            }}
            key={index}
            title={shop.shop_name}
          />
        ))}
        <Marker
          coordinate={{
            latitude: userLat,
            longitude: userLgt
          }}
          title="Your Current Location"
          pinColor="green"
          description="You are here"
        />
      </MapView>
    </SafeAreaView>
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
export default MapContainer;
