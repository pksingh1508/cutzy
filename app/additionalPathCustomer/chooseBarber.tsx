import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

const ChooseBarber = () => {
  return (
    <View style={styles.container}>
      <Text>ChooseBarber</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  }
});
export default ChooseBarber;
