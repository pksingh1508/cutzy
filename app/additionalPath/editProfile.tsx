import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import CustomInput from "@/components/commonUi/CustomInput";
import CustomButton from "@/components/commonUi/CustomButton";
import { MaterialIcons } from "@expo/vector-icons";
import ChooseLocation from "@/components/OnBoarding/ChooseLocation";
import { supabase } from "@/utils/supabase";
import { useUserData } from "@/store/useUserData";
import LottieView from "lottie-react-native";
import { router } from "expo-router";

const EditProfile = () => {
  const [shopName, setShopName] = useState("");
  const [lat, setLat] = useState(0.0);
  const [lgt, setLgt] = useState(0.0);
  const [loading, setLoading] = useState(false);
  const { phone } = useUserData();
  const animation = useRef<LottieView>(null);

  const update = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("shops")
        .update({
          shop_name: shopName,
          location: {
            lat: lat,
            lgt: lgt
          }
        })
        .eq("phone", phone)
        .select();
      if (!error) router.back();
    } catch (err) {
      Alert.alert("Error while updating data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function getInitialData() {
      setLoading(true);
      try {
        setLoading(true);
        const { data } = await supabase
          .from("shops")
          .select()
          .eq("phone", phone)
          .single();
        if (data) {
          setShopName(data.shop_name);
          setLat(data.location.lat);
          setLgt(data.location.lgt);
        }
      } catch (err) {
        Alert.alert("Error while getting data");
      } finally {
        setLoading(false);
      }
    }
    getInitialData();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <LinearGradient
          colors={[
            "rgba(205,208,216,255)",
            "rgba(216,221,229,255)",
            "rgba(193,196,212,255)"
          ]}
          style={styles.background}
        />
        <LottieView
          autoPlay
          ref={animation}
          style={{
            width: "30%",
            height: "30%"
          }}
          source={require("../../assets/images/loading.json")}
        />
      </View>
    );
  }

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

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Shop Name</Text>
          <CustomInput
            placeholder="Enter your shop name"
            value={shopName}
            onChange={setShopName}
            inputMode="text"
          />
        </View>
        <View style={{ paddingTop: 15 }}>
          <Text style={styles.label}>Location</Text>
          <ChooseLocation lat={lat} lgt={lgt} setLat={setLat} setLgt={setLgt} />
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <CustomButton title="Update Profile" onPress={update} />
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
    paddingHorizontal: 20,
    paddingTop: 20
  },
  inputContainer: {
    gap: 4
  },
  bottomContainer: {
    padding: 20,
    backgroundColor: "transparent"
  },
  label: {
    fontSize: 17,
    fontFamily: "pop-m"
  }
});

export default EditProfile;
