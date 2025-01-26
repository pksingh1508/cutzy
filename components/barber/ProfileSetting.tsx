import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomTabMenu from "../commonUi/CustomTabMenu";
import AwesomeAlert from "react-native-awesome-alerts";
import { useClerk } from "@clerk/clerk-expo";
import { router } from "expo-router";

const ProfileSetting = () => {
  const { signOut } = useClerk();
  const settingHandler = () => {};
  const editProfileHandler = () => {};
  const addBarberHandler = () => {};
  const updateBarberHandler = () => {};
  const logoutHandler = async () => {};
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 45 }}>
      <View style={styles.container}>
        <CustomTabMenu
          name="Settings"
          onPress={settingHandler}
          icon="settings"
          iconBackgroundColor="#15a56e"
        />
        <CustomTabMenu
          name="Edit Profile"
          onPress={editProfileHandler}
          icon="people-alt"
          iconBackgroundColor="#397cea"
        />
        <CustomTabMenu
          name="Add Barber"
          onPress={addBarberHandler}
          icon="add-circle"
          iconBackgroundColor="#2e2523"
        />
        <CustomTabMenu
          name="Update Barber"
          onPress={updateBarberHandler}
          icon="update"
          iconBackgroundColor="#ca79dc"
        />
        <CustomTabMenu
          name="Logout"
          onPress={logoutHandler}
          icon="logout"
          iconBackgroundColor="#de0032"
        />
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
