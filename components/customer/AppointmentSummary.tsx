import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface AppointmentSummaryProps {
  barberName: string;
  serviceName: string;
  startTime: string;
  servicePrice: number;
}

const AppointmentSummary = ({
  barberName,
  serviceName,
  startTime,
  servicePrice
}: AppointmentSummaryProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Appointment Summary</Text>
      <Text>Barber Name - {barberName}</Text>
      <Text>Service Name - {serviceName}</Text>
      <Text>Start Time - {startTime}</Text>
      <Text>Service Price - {servicePrice}</Text>
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
  }
});
export default AppointmentSummary;
