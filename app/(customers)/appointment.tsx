import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

const AppointmentPage = () => {
  return (
    <View style={styles.container}>
      <Text>AppointmentPage</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  }
});
export default AppointmentPage;
