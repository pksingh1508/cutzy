import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import React, { useState } from "react";
import CustomInput from "../commonUi/CustomInput";
import CustomButton from "../commonUi/CustomButton";
import ChooseLocation from "./ChooseLocation";
import { supabase } from "@/utils/supabase";
import { useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";

const BarberOnBoarding = () => {
  const [userName, setUserName] = useState("");
  const [shopName, setShopName] = useState("");
  const [lat, setLat] = useState(0.0);
  const [lgt, setLgt] = useState(0.0);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const phone = user?.primaryPhoneNumber?.phoneNumber;

  const submitHandler = async () => {
    // username, phone, role, isPro, isOnboarding  =  (for user table)
    // shop_name, location, isOpen, phone  =  (for shop Table)
    try {
      setLoading(true);
      // create user
      const { error } = await supabase.from("users").insert([
        {
          username: userName,
          phone: phone,
          role: "barber",
          isPro: false,
          isOnboarded: true
        }
      ]);
      if (error) {
        Alert.alert("Error while onBoarding", error.message);
        return;
      }
      // create a shop to the user
      const { error: Errors } = await supabase.from("shops").insert([
        {
          shop_name: shopName,
          location: { lat: lat, lgt: lgt },
          isOpen: false,
          phone: phone
        }
      ]);
      if (Errors) {
        Alert.alert("Error while creating shops", Errors.message);
        return;
      }
      Alert.alert("User created Successfully");
      // empty all the input data
      setUserName("");
      setShopName("");
      setLat(0.0);
      setLgt(0.0);
      router.replace("/");
    } catch (err) {
      console.log("error from server", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ gap: 10 }}>
          <View>
            <Text style={styles.label}>UserName</Text>
            <CustomInput
              placeholder="Enter your name"
              value={userName}
              onChange={setUserName}
              inputMode="text"
            />
          </View>
          <View>
            <Text style={styles.label}>ShopName</Text>
            <CustomInput
              placeholder="Enter your shop name"
              value={shopName}
              onChange={setShopName}
              inputMode="text"
            />
          </View>
          <View>
            <Text style={styles.label}>Location</Text>
            <ChooseLocation
              lat={lat}
              lgt={lgt}
              setLat={setLat}
              setLgt={setLgt}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.submitBtn}>
        <CustomButton
          title="Submit"
          onPress={submitHandler}
          loading={loading}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  submitBtn: {
    alignItems: "center",
    paddingBottom: 10,
    marginHorizontal: 10
  },
  label: {
    fontSize: 15,
    fontFamily: "pop-r"
  }
});
export default BarberOnBoarding;
