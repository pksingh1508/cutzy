import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CustomTabMenu from "../commonUi/CustomTabMenu";
import AwesomeAlert from "react-native-awesome-alerts";
import { useClerk } from "@clerk/clerk-expo";
import { router } from "expo-router";

const LogoutTab = () => {
  const { signOut } = useClerk();
  const [show, setShow] = useState(false);
  const logoutHandler = () => {
    setShow(!show);
  };
  const confirmHandler = async () => {
    // logout and navigate to the login page
    try {
      await signOut();
      router.replace("/(auth)/login");
    } catch (err) {
      Alert.alert("Error while logout, Try again.");
    }
    setShow(false);
  };
  return (
    <>
      <CustomTabMenu
        name="Logout"
        onPress={logoutHandler}
        icon="logout"
        iconBackgroundColor="#de0032"
        isLeftIcon
      />
      <AwesomeAlert
        show={show}
        showProgress={false}
        title="Log-Out"
        message="Are you sure to Logout!"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Cancel"
        confirmText="Logout"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {
          setShow(false);
        }}
        onConfirmPressed={confirmHandler}
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
    </>
  );
};

const styles = StyleSheet.create({});
export default LogoutTab;
