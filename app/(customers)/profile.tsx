import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

const ProfilePage = () => {
  return (
    <View style={styles.container}>
      <Text>ProfilePage</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  }
});
export default ProfilePage;
