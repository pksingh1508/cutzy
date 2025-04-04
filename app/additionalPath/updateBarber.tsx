import {
  ActivityIndicator,
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { useUserData } from "@/store/useUserData";
import CustomButton from "@/components/commonUi/CustomButton";
import { barberDeletedSuccessToast } from "@/Toasts/allToast";
import AwesomeAlert from "react-native-awesome-alerts";

const UpdateBarbers = () => {
  const { phone } = useUserData();
  const [barbers, setBarbers] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [show, setShow] = useState(false);

  // fetch all the barber for the database on first render
  useEffect(() => {
    getAllBarbers();
  }, []);

  // function to fetch all the barbers from the database
  const getAllBarbers = async () => {
    setFetching(true);
    try {
      // get the shops id from the phone number
      const { data: shopData, error: shopError } = await supabase
        .from("shops")
        .select("id")
        .eq("phone", phone);
      if (shopError) {
        Alert.alert(
          "Error",
          "Failed to fetch shop id. Please try again later."
        );
        return;
      }
      if (shopData.length === 0) {
        Alert.alert("Error", "No shop found for this phone number.");
        return;
      }
      const shopId = shopData[0].id;
      // get all the barbers using the shop id
      const { data, error } = await supabase
        .from("barbers")
        .select("*")
        .eq("shops_id", shopId);
      if (error) {
        Alert.alert(
          "Error",
          "Failed to fetch barbers. Please try again later."
        );
        return;
      }
      setBarbers(data);
      //   console.log(data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch barbers. Please try again later.");
    } finally {
      setFetching(false);
    }
  };

  // used to delete the barber using their id
  const deleteBarberHandler = async (id: number) => {
    setLoading(true);
    try {
      const { error } = await supabase.from("barbers").delete().eq("id", id);
      if (error) {
        Alert.alert(
          "Error",
          "Failed to delete barber. Please try again later."
        );
        return;
      }
      getAllBarbers();
      barberDeletedSuccessToast();
      setShow(false);
    } catch (error) {
      Alert.alert("Error", "Failed to delete barber. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{
            marginTop: 20,
            alignSelf: "center",
            justifyContent: "center"
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={barbers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={{ fontSize: 25, fontFamily: "park-m" }}>
              {item.name}
            </Text>
            <Text style={{ fontSize: 16, fontFamily: "pop-m" }}>
              {item.phone}
            </Text>
            <Text style={{ fontSize: 16, fontFamily: "pop-m" }}>
              Experience : {item.experience} years.
            </Text>
            <CustomButton
              title="Delete"
              onPress={() => setShow(!show)}
              loading={loading}
              customStyle={{
                width: "30%",
                alignSelf: "flex-end",
                backgroundColor: "#ff4d4d",
                paddingVertical: 7
              }}
              textStyle={{
                fontSize: 17
              }}
            />

            {/* awesome alert */}
            <AwesomeAlert
              show={show}
              showProgress={false}
              title="Delete Barber"
              message="Are you sure want to Delete!"
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={false}
              showCancelButton={true}
              showConfirmButton={true}
              cancelText="Cancel"
              confirmText="Delete"
              confirmButtonColor="#DD6B55"
              onCancelPressed={() => {
                setShow(false);
              }}
              onConfirmPressed={deleteBarberHandler.bind(null, item.id)}
              // styling
              contentContainerStyle={{
                backgroundColor: "#d1d5de",
                paddingHorizontal: 20
              }}
              titleStyle={{
                fontStyle: 25,
                fontFamily: "pop-m"
              }}
              messageStyle={{
                fontStyle: 17,
                fontFamily: "pop-m"
              }}
              cancelButtonStyle={{
                paddingHorizontal: 30,
                paddingVertical: 10
              }}
              cancelButtonColor="#ccc"
              cancelButtonTextStyle={{
                fontSize: 16,
                fontFamily: "pop-r",
                color: "black"
              }}
              confirmButtonStyle={{
                paddingHorizontal: 30,
                paddingVertical: 10
              }}
              confirmButtonTextStyle={{
                fontSize: 16,
                fontFamily: "pop-m"
              }}
            />
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyItemContainer}>
            <Text
              style={{
                fontSize: 18,
                textAlign: "center",
                fontFamily: "park-m",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              No barbers found for this shop.
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8e9fd",
    paddingTop: 10
  },
  itemContainer: {
    backgroundColor: "#f4f4ff",
    padding: 12,
    marginVertical: 9,
    marginHorizontal: 16,
    borderRadius: 8,
    borderColor: "#fffefe",
    borderWidth: 1
  },
  emptyItemContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default UpdateBarbers;
