import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import React, { useState } from "react";
import CustomInput from "@/components/commonUi/CustomInput";
import CustomButton from "@/components/commonUi/CustomButton";
import { addBarberErrorToast, addBarberSuccessToast } from "@/Toasts/allToast";
import { supabase } from "@/utils/supabase";
import { useUserData } from "@/store/useUserData";
import { router } from "expo-router";
import Colors from "@/constants/Colors";

const AddBarber = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [experience, setExperience] = useState("");
  const [bio, setBio] = useState("");
  const { phone } = useUserData();

  const submitHandler = async () => {
    setLoading(true);
    try {
      // check if all fields are filled
      if (!name || !phone || !experience || !bio) {
        addBarberErrorToast();
        setLoading(false);
        return;
      }
      // get the shop id
      const { data, error: Error } = await supabase
        .from("shops")
        .select("id")
        .eq("phone", phone);
      if (Error) {
        alert("Error fetching shop id");
        setLoading(false);
        return;
      }
      // insert the barber into the database
      const { error } = await supabase.from("barbers").insert([
        {
          name,
          phone: phoneNumber,
          shops_id: data[0].id,
          bio,
          isAvailable: false,
          experience: parseInt(experience)
        }
      ]);
      if (error) {
        alert("Error adding barber");
        setLoading(false);
        return;
      }
      // show success toast and move to the profile Tab
      addBarberSuccessToast();
      router.canGoBack() && router.back();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style={{ gap: 14, padding: 18 }}>
          <View style={styles.gaps}>
            <Text style={styles.label}>Barber Name</Text>
            <CustomInput
              placeholder="Enter Barber name"
              value={name}
              onChange={setName}
              inputMode="text"
            />
          </View>
          <View style={styles.gaps}>
            <Text style={styles.label}>Phone</Text>
            <CustomInput
              placeholder="Enter Phone Number"
              value={phoneNumber}
              onChange={setPhoneNumber}
              inputMode="decimal"
            />
          </View>
          <View style={styles.gaps}>
            <Text style={styles.label}>Experience</Text>
            <CustomInput
              placeholder="Enter Experience"
              value={experience}
              onChange={setExperience}
              inputMode="decimal"
            />
          </View>
          <View style={styles.gaps}>
            <Text style={styles.label}>Bio</Text>
            <CustomInput
              placeholder="About Barber"
              value={bio}
              onChange={setBio}
              inputMode="text"
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.submitBtn}>
        <CustomButton
          title="Submit"
          onPress={submitHandler}
          loading={loading}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  label: {
    fontSize: 20,
    fontFamily: "park-m"
  },
  submitBtn: {
    alignItems: "center",
    paddingBottom: 14,
    marginHorizontal: 14
  },
  scrollView: {
    paddingTop: 10,
    marginBottom: 18
  },
  gaps: {
    gap: 7
  }
});
export default AddBarber;
