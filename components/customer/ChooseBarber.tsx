import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import useBarberStoreData from "@/store/useBarberStoreData";
import RadioGroup from "react-native-radio-buttons-group";

interface ChooseBarberProps {
  setBarberId: (id: string) => void;
  setBarberName: (name: string) => void;
}

const ChooseBarber = ({ setBarberId, setBarberName }: ChooseBarberProps) => {
  const { barbers } = useBarberStoreData();
  const [selectedId, setSelectedId] = useState("");

  const handleBarberSelection = (id: string) => {
    setSelectedId(id);
    setBarberId(id);
    const selectedBarber = barbers.find((barber) => barber.id === id);
    if (selectedBarber) {
      setBarberName(selectedBarber.name);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Choose a Barber</Text>
      {barbers.map((barber) => (
        <View key={barber.id} style={styles.section}>
          <RadioGroup
            radioButtons={[
              { id: barber.id, label: barber.name, value: barber.id }
            ]}
            onPress={handleBarberSelection}
            layout="row"
            containerStyle={{ marginVertical: 8 }}
            selectedId={selectedId}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 32
  },
  section: {
    flexDirection: "row",
    alignItems: "center"
  },
  heading: {
    fontSize: 22,
    fontFamily: "pop-b",
    marginBottom: 10,
    textAlign: "center"
  }
});
export default ChooseBarber;
