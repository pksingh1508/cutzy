import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import CustomTabMenu from "@/components/commonUi/CustomTabMenu";
import SwitchToggle from "react-native-switch-toggle";
import { useState } from "react";

const Settings = () => {
  const [notificationEnabled, setNotificationEnabled] = useState(false);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          "rgba(205,208,216,255)",
          "rgba(216,221,229,255)",
          "rgba(193,196,212,255)"
        ]}
        style={styles.background}
      />

      <View style={styles.content}>
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <CustomTabMenu
              name="Notifications"
              icon="notifications"
              iconBackgroundColor="#FF9500"
              onPress={() => {}}
              loading
            />
          </View>
          <SwitchToggle
            switchOn={notificationEnabled}
            onPress={() => setNotificationEnabled(!notificationEnabled)}
            circleColorOff="#fff"
            circleColorOn="#fff"
            backgroundColorOn="#4CD964"
            backgroundColorOff="#e9e9ea"
            containerStyle={styles.toggleContainer}
            circleStyle={styles.toggleCircle}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%"
  },
  content: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 15,
    marginBottom: 15
  },
  settingLeft: {
    flex: 1
  },
  toggleContainer: {
    width: 50,
    height: 30,
    borderRadius: 25,
    paddingHorizontal: 0,
    paddingVertical: 8
  },
  toggleCircle: {
    width: 26,
    height: 26,
    borderRadius: 13
  }
});

export default Settings;
