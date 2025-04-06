import { View, Text } from "react-native";
import React, { useRef } from "react";
import LottieView from "lottie-react-native";

const CustomLoading = () => {
  const animation = useRef<LottieView>(null);
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
        source={require("../../assets/images/loading.json")}
      />
    </View>
  );
};

export default CustomLoading;
