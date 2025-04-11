import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import CustomInput from "@/components/commonUi/CustomInput";
import CustomButton from "@/components/commonUi/CustomButton";
import ChooseLocation from "@/components/OnBoarding/ChooseLocation";
import { supabase } from "@/utils/supabase";
import { useUserData } from "@/store/useUserData";
import { router } from "expo-router";
import CustomLoading from "@/components/commonUi/CustomLoading";
import Colors from "@/constants/Colors";

const EditProfile = () => {
  const [shopName, setShopName] = useState("");
  const [lat, setLat] = useState(0.0);
  const [lgt, setLgt] = useState(0.0);
  const [loading, setLoading] = useState(false);
  const { phone } = useUserData();

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
    return <CustomLoading />;
  }

  return (
    <View style={styles.container}>
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
    flex: 1,
    backgroundColor: Colors.background
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
