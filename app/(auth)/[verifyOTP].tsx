import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  isClerkAPIResponseError,
  useSignIn,
  useSignUp
} from "@clerk/clerk-expo";
import { OtpInput } from "react-native-otp-entry";

const VerifyOTPPage = () => {
  const { verifyOTP, signin } = useLocalSearchParams<{
    verifyOTP: string;
    signin: string;
  }>();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const { signIn } = useSignIn();
  const { signUp, setActive } = useSignUp();
  const [showTimer, setShowTimer] = useState(true);
  const [second, setSecond] = useState(90);

  const verifyHandler = async () => {
    if (signin === "true") {
      await verifySignIn();
    } else {
      await verifyCode();
    }
  };

  // This function is used to verify the logged user.
  const verifySignIn = async () => {
    if (!code || code.length !== 6) {
      Alert.alert("Error", "Please enter a valid 6-digit verification code.");
      return;
    }

    setLoading(true); // Start loading
    try {
      await signIn?.attemptFirstFactor({
        strategy: "phone_code",
        code
      });

      await setActive!({ session: signIn!.createdSessionId });
      Alert.alert("Success", "Sign-in successful!");
      // Redirect to main application or home page
      router.replace("/");
    } catch (err) {
      console.log("Error while verifying sign-in", err);
      if (isClerkAPIResponseError(err)) {
        Alert.alert("Error", err.errors[0].message);
      } else {
        Alert.alert("Error", "An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // This function is used to verify the new user.
  const verifyCode = async () => {
    if (!code || code.length !== 6) {
      Alert.alert("Error", "Please enter a valid 6-digit verification code.");
      return;
    }

    setLoading(true); // Start loading
    try {
      await signUp?.attemptPhoneNumberVerification({
        code
      });

      await setActive!({ session: signUp!.createdSessionId });
      Alert.alert("Success", "Verification successful! You are now signed up.");
      // Redirect to main application or home page
      router.replace("/");
    } catch (err) {
      console.error(
        "Error while verifying code:",
        JSON.stringify(err, null, 2)
      );
      if (isClerkAPIResponseError(err)) {
        Alert.alert("Error", err.errors[0].message);
      } else {
        Alert.alert("Error", "An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  //This function is used to resend the code to the user
  const resendCode = async () => {
    const cleanedNumber = verifyOTP.replace(/\D/g, "");
    const e164PhoneNumber = `+91${cleanedNumber}`;
    try {
      // start the timer
      setShowTimer(true);
      setSecond(90);

      if (signin === "true") {
        const { supportedFirstFactors } = await signIn!.create({
          identifier: e164PhoneNumber // Ensure verifyOTP is in E.164 format
        });

        const firstPhoneFactor = supportedFirstFactors?.find(
          (factor) => factor.strategy === "phone_code"
        );

        if (!firstPhoneFactor) {
          throw new Error("Phone authentication not supported");
        }

        const { phoneNumberId } = firstPhoneFactor;

        await signIn!.prepareFirstFactor({
          strategy: "phone_code",
          phoneNumberId
        });
        Alert.alert("Success", "Verification code resent successfully.");
      } else {
        // Ensure verifyOTP is in E.164 format
        const cleanedNumber = verifyOTP.replace(/\D/g, "");
        const e164PhoneNumber = `+91${cleanedNumber}`; // Adjust the country code as needed

        await signUp!.create({
          phoneNumber: e164PhoneNumber
        });
        const res = await signUp!.preparePhoneNumberVerification();
        console.log("Resend code response: ", res);
        Alert.alert("Success", "Verification code resent successfully.");
      }
    } catch (err) {
      console.log("Error:", JSON.stringify(err, null, 2));
      if (isClerkAPIResponseError(err)) {
        Alert.alert("Error", err.errors[0].message);
      } else {
        Alert.alert("Error", "An unexpected error occurred. Please try again.");
      }
    } finally {
      // Stop loading state if applicable
      // setLoading(false); // Uncomment if you have a loading state
    }
  };

  // This is for showing the timer for the resend button
  useEffect(() => {
    const myid = setInterval(() => {
      setSecond((prevSecond) => {
        if (prevSecond <= 1) {
          clearInterval(myid);
          setShowTimer(false);
          return 0;
        }
        return prevSecond - 1;
      });
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(myid);
  }, [resendCode]);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: "Verify OTP",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "park-b",
            fontSize: 20
          }
        }}
      />
      <View style={styles.content}>
        <View style={styles.topText}>
          <Text style={styles.heading1}>Check your phone!</Text>
          <Text style={styles.smallHeading}>We've sent 6 digit code to</Text>
          <Text style={styles.smallHeading}>+91{verifyOTP}</Text>
        </View>
        <View style={{ marginTop: 25 }}>
          <OtpInput
            numberOfDigits={6}
            onTextChange={(text) => setCode(text)}
            type="numeric"
            placeholder="******"
            autoFocus={true}
            blurOnFilled={true}
          />
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={verifyHandler} disabled={loading}>
            {loading ? (
              <View style={styles.indicator}>
                <ActivityIndicator size="small" color="#0000ff" />
                <Text style={styles.btnText}>Verifying...</Text>
              </View>
            ) : (
              <Text style={styles.btnText}>Verify OTP</Text>
            )}
          </TouchableOpacity>
        </View>
        <View>
          {showTimer ? (
            <View>
              <Text style={styles.second}>{second}</Text>
            </View>
          ) : (
            <TouchableOpacity
              onPress={resendCode}
              style={[styles.btnContainer, { marginTop: 14 }]}
            >
              <Text style={styles.btnText}>Resend OTP</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffefe"
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    marginBottom: 20
  },
  content: {
    paddingHorizontal: 20,
    gap: 9
  },
  topText: {
    gap: 6
  },
  heading1: {
    fontSize: 23,
    fontFamily: "park-b",
    textAlign: "center"
  },
  smallHeading: {
    textAlign: "center",
    fontFamily: "pop-m",
    fontSize: 15
  },
  btnContainer: {
    borderWidth: 1,
    borderColor: "#9499a5",
    paddingVertical: 10,
    borderRadius: 23,
    backgroundColor: "#f2c54e",
    marginTop: 35
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
  second: {
    fontSize: 25,
    fontFamily: "pop-m",
    textAlign: "center"
  }
});

export default VerifyOTPPage;
