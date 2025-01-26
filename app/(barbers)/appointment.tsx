import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const Appointment = () => {
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
      <Text>Appointment</Text>
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
  }
});
export default Appointment;
