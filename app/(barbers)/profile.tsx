import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import ProfileSetting from "@/components/barber/ProfileSetting";
import { useUserData } from "@/store/useUserData";
import Colors from "@/constants/Colors";

const Profile = () => {
  const { username, phone } = useUserData();
  return (
    <View style={styles.container}>
      <View style={styles.imageBox}>
        <View style={styles.image}>
          <Image source={require("../../assets/images/barber.png")} />
        </View>
        <View>
          <Text style={styles.name}>{username}</Text>
          <Text style={styles.phone}>{phone}</Text>
        </View>
      </View>
      <ProfileSetting />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%"
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: "50%",
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
