import { Alert, StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomButton from "../commonUi/CustomButton";
import { supabase } from "@/utils/supabase";
import {
  appointmentCompletedToast,
  appointmentConfirmedToast,
  appointmentRejectedToast
} from "@/Toasts/allToast";

interface AppointmentCardProps {
  appointment: {
    user_name: string;
    service_name: string;
    barber_name: string;
    starttime: string;
    endtime: string;
    id: string;
  };
  type?: string;
  stateVal?: boolean;
  setStateVal?: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppointmentCard = ({
  appointment,
  type,
  stateVal,
  setStateVal
}: AppointmentCardProps) => {
  // this is the function for the confirm button
  const confirmHandler = async () => {
    const { error } = await supabase
      .from("appointments")
      .update({ status: "confirmed" })
      .eq("id", appointment.id);
    if (error) {
      Alert.alert(
        "Error",
        "Failed to confirm appointment. Please try again later."
      );
      return;
    }
    setStateVal && setStateVal(!stateVal);
    appointmentConfirmedToast();
  };
  // this is the function for the reject button
  const rejectHandler = async () => {
    const { error } = await supabase
      .from("appointments")
      .update({ status: "cancelled" })
      .eq("id", appointment.id);
    if (error) {
      Alert.alert(
        "Error",
        "Failed to reject appointment. Please try again later."
      );
      return;
    }
    setStateVal && setStateVal(!stateVal);
    appointmentRejectedToast();
  };
  // this is the function for the completed button
  const completedHandler = async () => {
    const { error } = await supabase
      .from("appointments")
      .update({ status: "completed" })
      .eq("id", appointment.id);
    if (error) {
      Alert.alert(
        "Error",
        "Failed to mark appointment as completed. Please try again later."
      );
      return;
    }
    setStateVal && setStateVal(!stateVal);
    appointmentCompletedToast();
  };

  return (
    <View style={styles.appointmentCard}>
      <Text style={styles.userName}>{appointment.user_name}</Text>
      <Text style={styles.details}>Service: {appointment.service_name}</Text>
      <Text style={styles.details}>Barber: {appointment.barber_name}</Text>
      <Text style={styles.details}>
        Time: {new Date(appointment.starttime).toLocaleTimeString()} -
        {new Date(appointment.endtime).toLocaleTimeString()}
      </Text>
      {type === "pending" && (
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Confirm"
            onPress={confirmHandler}
            customStyle={{
              width: "46%",
              paddingVertical: 8
            }}
          />
          <CustomButton
            title="Reject"
            onPress={rejectHandler}
            customStyle={{ width: "45%", paddingVertical: 8 }}
          />
        </View>
      )}
      {type === "confirmed" && (
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Mark as Completed"
            onPress={completedHandler}
            customStyle={{ paddingVertical: 8, width: "80%" }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  appointmentCard: {
    backgroundColor: "#e2e4ff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 1,
    borderWidth: 2,
    borderColor: "#bcbfcc"
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8
  },
  details: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16
  }
});
export default AppointmentCard;
