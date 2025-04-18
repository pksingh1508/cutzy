import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import React from "react";
import useNearByShopStore from "@/store/useNearByShopData";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import { router } from "expo-router";

const NearByBarber = () => {
  const { nearbyShops } = useNearByShopStore();
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 40 }}>
      {nearbyShops.length === 0 && (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          No nearby shops found
        </Text>
      )}
      <Text style={styles.heading}>Nearby Shops</Text>
      {nearbyShops.length > 0 && (
        <FlatList
          data={nearbyShops}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.singleShopContainer}
              onPress={() =>
                router.push(
                  `../additionalPathCustomer/${item.id}?shop_name=${item.shop_name}&isOpen=${item.isOpen}`
                )
              }
            >
              <Text style={{ fontSize: 18 }}>{item.shop_name}</Text>
              <Text>Phone : {item.phone}</Text>
              <Text>Status : {item.isOpen ? "Open" : "Closed"}</Text>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  singleShopContainer: {
    padding: 15,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    marginHorizontal: 15,
    backgroundColor: Colors.background100,
    borderRadius: 10,
    marginVertical: 10
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10
  }
});
export default NearByBarber;
