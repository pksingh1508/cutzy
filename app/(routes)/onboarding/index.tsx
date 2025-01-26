import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { router, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import BarberOnBoarding from "@/components/OnBoarding/BarberOnBoarding";
import { Picker } from "@react-native-picker/picker";
import UserOnBoarding from "@/components/OnBoarding/UserOnBoarding";

const OnboardingPage = () => {
  const [index, setIndex] = useState(0);
  const [role, setRole] = useState("barber");

  const nextHandler = () => {
    setIndex(index + 1);
  };

  const prevHandler = () => {
    setIndex(index - 1);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          "rgba(197,200,213,255)",
          "rgba(255,254,254,255)",
          "rgba(197,200,213,255)"
        ]}
        style={styles.background}
      />
      <Stack.Screen
        options={{
          headerShown: false
        }}
      />
      <SafeAreaView style={styles.safeView}>
        <View style={styles.content}>
          <Text style={styles.necessaryHeading}>
            Fill the Necessary Details.
          </Text>
          {index === 0 && (
            <View>
              <Text style={styles.label}>Choose your role?</Text>
              <View style={styles.picker}>
                <Picker
                  selectedValue={role}
                  mode="dropdown"
                  dropdownIconColor="black"
                  onValueChange={(itemValue, itemIndex) => setRole(itemValue)}
                >
                  <Picker.Item
                    label="Barber"
                    value="barber"
                    fontFamily="pop-m"
                  />
                  <Picker.Item
                    label="Customer"
                    value="customer"
                    fontFamily="pop-m"
                  />
                </Picker>
              </View>
            </View>
          )}
          {index === 1 && role === "barber" && <BarberOnBoarding />}
          {index === 1 && role === "customer" && <UserOnBoarding />}
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            onPress={prevHandler}
            disabled={index === 0}
            style={[
              styles.prevBtn,
              {
                backgroundColor: index === 0 ? "#ccc" : "#f3c553",
                width: index === 1 ? "90%" : "45%",
                display: index === 0 ? "none" : "flex"
              }
            ]}
          >
            <Text style={styles.prevBtnText}>Prev</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={nextHandler}
            style={[
              styles.nextBtn,
              {
                display: index === 1 ? "none" : "flex",
                width: index === 0 ? "90%" : "45%"
              }
            ]}
          >
            <Text style={styles.nextBtnText}>Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export const styles = StyleSheet.create({
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
  safeView: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 25,
    paddingHorizontal: 10
  },
  picker: {
    borderWidth: 1,
    borderColor: "#9499a5",
    borderRadius: 13,
    backgroundColor: "rgba(197,200,213,255)"
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  prevBtn: {
    borderWidth: 1,
    borderColor: "#9499a5",
    backgroundColor: "#f3c553",
    width: "45%",
    paddingVertical: 15,
    borderRadius: 15
  },
  prevBtnText: {
    textAlign: "center",
    fontSize: 17,
    fontFamily: "pop-m"
  },
  nextBtn: {
    borderWidth: 1,
    borderColor: "#9499a5",
    backgroundColor: "#f3c553",
    width: "45%",
    paddingVertical: 15,
    borderRadius: 15
  },
  nextBtnText: {
    textAlign: "center",
    fontSize: 17,
    fontFamily: "pop-m"
  },
  content: {
    paddingHorizontal: 10,
    flex: 1
  },
  necessaryHeading: {
    fontSize: 17,
    fontFamily: "pop-m",
    paddingVertical: 8
  },
  label: {
    fontSize: 15,
    fontFamily: "pop-r"
  }
});
export default OnboardingPage;
