import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialIcons as MaterialIconsType } from "@expo/vector-icons/build/Icons";

interface Props {
  name: string;
  onPress: () => void;
  icon: keyof typeof MaterialIconsType.glyphMap;
  iconBackgroundColor: string;
  isLeftIcon?: boolean;
  loading?: boolean;
}

const CustomTabMenu = ({
  name,
  onPress,
  icon,
  iconBackgroundColor,
  isLeftIcon,
  loading
}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={loading}>
      <View style={styles.main}>
        <View style={styles.left}>
          <View style={[styles.icon, { backgroundColor: iconBackgroundColor }]}>
            <MaterialIcons name={icon} size={24} color="white" />
          </View>
          <Text style={styles.name}>{name}</Text>
        </View>
        {isLeftIcon && (
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7
  },
  main: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "center"
  },
  icon: {
    paddingVertical: 11,
    paddingHorizontal: 11,
    borderRadius: 13
  },
  name: {
    fontSize: 21,
    fontFamily: "park-m"
  }
});
export default CustomTabMenu;
