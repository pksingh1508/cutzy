import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CustomInput from "../commonUi/CustomInput";
import CustomButton from "../commonUi/CustomButton";
import { supabase } from "@/utils/supabase";
import { useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";

const UserOnBoarding = () => {
  const [userName, setUserName] = useState("");
  const { user } = useUser();
  const phone = user?.primaryPhoneNumber?.phoneNumber;
  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    // username, phone, role, isPro, isOnboarding
    try {
      setLoading(true);
      // create user
      const { error } = await supabase.from("users").insert([
        {
          username: userName,
          phone: phone,
          role: "customer",
          isPro: false,
          isOnboarded: true
        }
      ]);
      if (error) {
        Alert.alert("Error while creating the user", error.message);
        return;
      }
      Alert.alert("user created successfully");
      // clear the input
      setUserName("");
      router.replace("/");
    } catch (err) {
      console.log("error from server", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>UserName</Text>
        <CustomInput
          placeholder="Enter your name"
          value={userName}
          onChange={setUserName}
          inputMode="text"
        />
      </View>
      <View style={styles.submitBtn}>
        <CustomButton
          title="Submit"
          onPress={submitHandler}
          loading={loading}
        />
      </View>
    </View>
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
export default UserOnBoarding;
