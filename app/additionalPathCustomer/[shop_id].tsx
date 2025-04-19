import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import Colors from "@/constants/Colors";
import CustomButton from "@/components/commonUi/CustomButton";
import { supabase } from "@/utils/supabase";
import useBarberStoreData from "@/store/useBarberStoreData";

const SingleShop = () => {
  const { shop_id, shop_name, isOpen } = useLocalSearchParams();
  const isOpenBoolean = isOpen === "true" ? true : false;
  const [totalBarbers, setTotalBarbers] = React.useState(0);
  const { setBarbers } = useBarberStoreData();

  useEffect(() => {
    countAllBarbersInShop();
  }, []);

  const countAllBarbersInShop = async () => {
    try {
      const { data, error } = await supabase
        .from("barbers")
        .select("*")
        .eq("shops_id", shop_id);
      if (error) {
        Alert.alert("Error while fetching total barbers", error.message);
      }
      if (data) {
        setBarbers(data);
        setTotalBarbers(data.length);
      }
    } catch (error) {
      Alert.alert("Error while fetching total barbers");
      return;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentBox}>
        <Text style={[styles.text, { fontSize: 22, fontFamily: "pop-b" }]}>
          Shop is {isOpenBoolean ? "Open" : "Closed"}
        </Text>
        <Text style={styles.text}>Shop Name : {shop_name}</Text>
        <Text style={styles.text}>Rating : 4.5</Text>
        <Text style={styles.text}>Total Barbers : {totalBarbers}</Text>
      </View>
      <View>
        {isOpenBoolean && (
          <CustomButton
            title="Book Now"
            onPress={() => router.navigate(`../additionalPathCustomer/bookNow`)}
            customStyle={{
              marginTop: 20,
              paddingVertical: 15,
              paddingHorizontal: 20,
              borderRadius: 10
            }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
    justifyContent: "space-between"
  },
  contentBox: {
    padding: 15,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    backgroundColor: Colors.background100,
    borderRadius: 10,
    gap: 9
  },
  text: {
    fontSize: 18,
    fontFamily: "pop-m",
    color: Colors.text
  }
});
export default SingleShop;
