import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import useAppointmentStore from "@/store/useAppointmentData";

interface AppointmentProps {
  barber_id: string | null;
  barber_name: string | null;
  endtime: string;
  id: string;
  service_id: string | null;
  service_name: string | null;
  starttime: string;
  status: string;
  user_id: string | null;
  user_name: string | null;
  shops_id: string | null;
}

const Dashboard = () => {
  const { appointments } = useAppointmentStore();

  // Filter completed appointments
  const completedAppointments = appointments.filter(
    (appointment) => appointment.status === "completed"
  );

  const renderItem = ({ item }: any) => (
    <View style={styles.appointmentCard}>
      <View style={styles.row}>
        <Text style={styles.label}>Customer:</Text>
        <Text style={styles.value}>{item.user_name}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Service:</Text>
        <Text style={styles.value}>{item.service_name}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Barber:</Text>
        <Text style={styles.value}>{item.barber_name}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Status:</Text>
        <Text style={styles.value}>{item.status}</Text>
      </View>
    </View>
  );

  if (completedAppointments.length === 0) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" }
        ]}
      >
        <Text style={styles.title}>No Completed Appointments</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Completed Appointments</Text>
      <FlatList
        data={completedAppointments}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id || index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecedff",
    padding: 15
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15
  },
  appointmentCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#4CAF50",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    width: 80,
    color: "#666"
  },
  value: {
    fontSize: 14,
    flex: 1
  }
});

export default Dashboard;
