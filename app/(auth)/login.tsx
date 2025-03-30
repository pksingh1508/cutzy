import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  isClerkAPIResponseError,
  useSignIn,
  useSignUp
} from "@clerk/clerk-expo";
import { router } from "expo-router";
import { PhoneCodeFactor } from "@clerk/types";
import { LinearGradient } from "expo-linear-gradient";

const LoginPage = () => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const { signUp } = useSignUp();
  const { signIn } = useSignIn();

  // This function is used to send OTP to the user.
  const sendOTP = async () => {
    if (phone.length !== 10) {
      Alert.alert("Error", "Please enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true); // Start loading
    try {
      const cleanedNumber = phone.replace(/\D/g, "");
      const e164PhoneNumber = `+91${cleanedNumber}`;
      await signUp?.create({ phoneNumber: e164PhoneNumber });
      await signUp?.preparePhoneNumberVerification();
      router.push(`/(auth)/${cleanedNumber}?signin=false`);
    } catch (err) {
      if (isClerkAPIResponseError(err)) {
        if (err.errors[0].code === "form_identifier_exists") {
          console.log("User exists, attempting sign in...");
          await trySignIn();
        } else {
          Alert.alert("Error while sending OTP", err.errors[0].message);
        }
      } else {
        Alert.alert("Error", "An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // This function is used to send OTP to verify the logged user.
  const trySignIn = async () => {
    try {
      const cleanedNumber = phone.replace(/\D/g, "");
      const e164PhoneNumber = `+91${cleanedNumber}`;
      const { supportedFirstFactors } = await signIn!.create({
        identifier: e164PhoneNumber
      });
      const firstPhoneFactor = supportedFirstFactors?.find(
        (factor): factor is PhoneCodeFactor => factor.strategy === "phone_code"
      );
      if (!firstPhoneFactor) {
        throw new Error("Phone authentication not supported");
      }
      await signIn!.prepareFirstFactor({
        strategy: "phone_code",
        phoneNumberId: firstPhoneFactor.phoneNumberId
      });
      router.push(`/(auth)/${cleanedNumber}?signin=true`);
    } catch (err) {
      Alert.alert("Failed to initiate sign in", "Please try again.");
      console.log("Error during sign in:", err);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          "rgba(206,210,216,255)",
          "rgba(255,254,254,255)",
          "rgba(197,200,213,255)"
        ]}
        style={styles.background}
      />
      <SafeAreaView style={styles.safeView}>
        <View>
          <Text style={styles.logo}>ZapCut</Text>
          <View>
            <Text style={styles.yourNumberText}>What's your number?</Text>
            <Text style={{ fontFamily: "pop-r" }}>
              Enter your phone number to proceed
            </Text>
          </View>
          <View style={styles.inputView}>
            <Text style={styles.inputText}>+91</Text>
            <TextInput
              placeholder="Enter phone number"
              keyboardType="number-pad"
              maxLength={10}
              value={phone}
              onChangeText={setPhone}
              autoFocus={true}
              style={styles.input}
            />
          </View>
        </View>
        <View>
          <Text style={styles.privacyPolicyText}>
            By continuing, you agree to the T&C and Privacy Policy
          </Text>
          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={sendOTP} disabled={loading}>
              {loading ? (
                <View style={styles.indicator}>
                  <ActivityIndicator size="small" color="#0000ff" />
                  <Text style={styles.btnText}>Sending OTP...</Text>
                </View>
              ) : (
                <Text style={styles.btnText}>Next</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  safeView: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 25,
    paddingHorizontal: 25
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%"
  },
  inputView: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#9499a5",
    borderRadius: 10,
    paddingVertical: 0,
    paddingHorizontal: 10,
    gap: 5,
    marginTop: 10
  },
  inputText: {
    fontSize: 19,
    fontFamily: "pop-m"
  },
  input: {
    fontSize: 19,
    fontFamily: "pop-m"
  },
  btnContainer: {
    borderWidth: 1,
    borderColor: "#9499a5",
    paddingVertical: 10,
    borderRadius: 19,
    backgroundColor: "#f2c54e"
  },
  btnText: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "pop-m"
  },
  indicator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 19
  },
  logo: {
    fontSize: 25,
    fontFamily: "pop-b",
    letterSpacing: 1.1
  },
  yourNumberText: {
    fontSize: 20,
    fontFamily: "pop-m"
  },
  privacyPolicyText: {
    fontFamily: "pop-r",
    fontSize: 12,
    textAlign: "center",
    paddingBlock: 12
  }
});

export default LoginPage;
