import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { supabase } from "@/utils/supabase";
import { useUserData } from "@/store/useUserData";
import LottieView from "lottie-react-native";

const MainPage = () => {
  const { isSignedIn } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [role, setRole] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(true); // Loading state
  const { setUserData } = useUserData();
  const animation = useRef<LottieView>(null);

  const redirectUser = async () => {
    if (isSignedIn && user) {
      const phone = user?.primaryPhoneNumber?.phoneNumber;
      console.log("phone", phone);
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("phone", phone)
        .maybeSingle();

      if (error) {
        console.log("server error", error.message);
        Alert.alert("Server Error!", error.message);
        setLoading(false);
        return;
      }

      if (data) {
        setUserData({
          username: data.username,
          phone: data.phone,
          id: data.id,
          isPro: data.isPro
        });
      }

      if (!data) {
        setIsLoggedIn(true);
        setIsOnboarded(false);
      } else {
        setIsLoggedIn(true);
        setIsOnboarded(data.isOnboarded);
        setRole(data.role);
      }
    }
    setLoading(false); // Set loading to false after fetching
  };

  useEffect(() => {
    redirectUser();
  }, [isSignedIn, user]); // Include user in the dependency array

  useEffect(() => {
    if (!loading) {
      if (role === "barber") {
        router.replace("/(barbers)/appointment");
      } else if (role === "customer") {
        router.replace("/(customers)/map");
      } else if (isLoggedIn && !isOnboarded) {
        router.replace("/(routes)/onboarding");
      } else if (!isLoggedIn) {
        router.replace("/(auth)/login");
      }
    }
  }, [loading, role, isLoggedIn, isOnboarded]); // Redirect based on loading state and user data

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <LottieView
          autoPlay
          ref={animation}
          style={{
            width: "30%",
            height: "30%"
          }}
          source={require("../assets/images/loading.json")}
        />
      </View>
    );
  }

  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
};

export default MainPage;
