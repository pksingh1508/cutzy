import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import CustomTabMenu from "../commonUi/CustomTabMenu";
import LogoutTab from "./LogoutTab";
import { router } from "expo-router";

const ProfileSetting = () => {
  const addServicesHandler = () => {
    router.push("/additionalPath/addServices");
  };
  const editProfileHandler = () => {
    router.push("/additionalPath/editProfile");
  };
  const addBarberHandler = () => {
    router.push("/additionalPath/addBarber");
  };
  const updateBarberHandler = () => {
    router.push("/additionalPath/updateBarber");
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 45 }}>
      <View style={styles.container}>
        <CustomTabMenu
          name="Edit Profile"
          onPress={editProfileHandler}
          icon="people-alt"
          iconBackgroundColor="#397cea"
          isLeftIcon
        />
        <CustomTabMenu
          name="Add Barber"
          onPress={addBarberHandler}
          icon="add-circle"
          iconBackgroundColor="#2e2523"
          isLeftIcon
        />
        <CustomTabMenu
          name="Add Services"
          onPress={addServicesHandler}
          icon="cleaning-services"
          iconBackgroundColor="#15a56e"
          isLeftIcon
        />
        <CustomTabMenu
          name="Delete Barber"
          onPress={updateBarberHandler}
          icon="update"
          iconBackgroundColor="#ca79dc"
          isLeftIcon
        />
        <LogoutTab />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    gap: 15
  }
});
export default ProfileSetting;
