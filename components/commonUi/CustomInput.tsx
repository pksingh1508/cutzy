import { InputModeOptions, StyleSheet, TextInput } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

interface textInputProps {
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  inputMode: InputModeOptions;
  customStyle?: object;
}

const CustomInput = ({
  placeholder,
  value,
  onChange,
  inputMode,
  customStyle
}: textInputProps) => {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor="#343844"
      cursorColor="#ccc"
      inputMode={inputMode}
      keyboardAppearance="dark"
      style={[styles.input, customStyle]}
      value={value}
      onChangeText={onChange}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#9499a5",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: "black",
    fontSize: 20,
    fontFamily: "pop-r",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default CustomInput;
