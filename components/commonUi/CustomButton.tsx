import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import React from "react";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  customStyle?: ViewStyle;
  textStyle?: Object;
  loading?: boolean;
}

const CustomButton = ({
  title,
  onPress,
  customStyle,
  textStyle,
  loading
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.Btn, customStyle]}
      disabled={loading}
    >
      {loading ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="small" color="#0000ff" />
          <Text style={[styles.BtnText, textStyle]}>{title}...</Text>
        </View>
      ) : (
        <>
          <Text style={[styles.BtnText, textStyle]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Btn: {
    width: "100%",
    paddingVertical: 13,
    backgroundColor: "#f3c553",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#9499a5"
  },
  BtnText: {
    color: "black",
    fontSize: 18,
    fontFamily: "pop-m",
    textAlign: "center"
  },
  loadingBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7
  }
});

export default CustomButton;
