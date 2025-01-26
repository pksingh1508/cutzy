import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import ProfileSetting from "@/components/barber/ProfileSetting";

const Profile = () => {
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
      <View style={styles.imageBox}>
        <View style={styles.image}>
          <Image
            source={require("../../assets/images/barber.jpeg")}
            width={30}
            height={30}
          />
        </View>
        <View>
          <Text style={styles.name}>Pawan Kumar</Text>
          <Text style={styles.phone}>+91-7275996676</Text>
        </View>
      </View>
      <ProfileSetting />
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
  image: {
    width: 180,
    height: 180,
    borderRadius: "50%",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center"
  },
  imageBox: {
    width: "100%",
    alignItems: "center",
    paddingTop: 20
  },
  name: {
    fontSize: 24,
    fontFamily: "pop-m",
    textAlign: "center"
  },
  phone: {
    fontSize: 18,
    fontFamily: "pop-r",
    textAlign: "center"
  }
});
export default Profile;
