import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Slots from "@/constants/Slots";
import { RadioGroup } from "react-native-radio-buttons-group";

interface ChooseSlotProps {
  setStartTime: (time: string) => void;
}

const ChooseSlot = ({ setStartTime }: ChooseSlotProps) => {
  const [selected, setSelected] = React.useState("");

  const handleSlotSelection = (id: string) => {
    setSelected(id);
    // Here you can also set the selected slot value to a state or context if needed
    const selectedSlot = Slots.find((slot) => slot.id === id);
    if (selectedSlot) {
      setStartTime(selectedSlot.value);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Choose a Slot</Text>
      <FlatList
        data={Slots}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.section}>
            <RadioGroup
              radioButtons={[
                { id: item.id, label: item.label, value: item.value }
              ]}
              onPress={handleSlotSelection}
              layout="row"
              containerStyle={{ marginVertical: 8 }}
              selectedId={selected}
            />
          </View>
        )}
        showsVerticalScrollIndicator={false}
        style={{ maxHeight: "80%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 32
  },
  heading: {
    fontSize: 22,
    fontFamily: "pop-b",
    marginBottom: 10,
    textAlign: "center"
  },
  section: {
    flexDirection: "row",
    alignItems: "center"
  }
});
export default ChooseSlot;
