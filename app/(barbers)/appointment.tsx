import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  RefreshControl
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import useShopData from "@/store/useShopData";
import { useUserData } from "@/store/useUserData";
import CustomLoading from "@/components/commonUi/CustomLoading";
import AppointmentCard from "@/components/barber/AppointmentCard";
import useAppointmentStore from "@/store/useAppointmentData";

const Appointment = () => {
  const [isPendingExpanded, setIsPendingExpanded] = useState(false);
  const [isConfirmedExpanded, setIsConfirmedExpanded] = useState(true);
  const [appointmentData, setAppointmentData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { setShopData } = useShopData();
  const { phone } = useUserData();
  const [fetchDataUsingThisState, setFetchDataUsingThisState] = useState(false);
  const { setAppointments } = useAppointmentStore();
  const [refreshing, setRefreshing] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);

  useEffect(() => {
    // fetch all the appointment form the database
    getAllAppointments();
  }, [fetchDataUsingThisState]);

  const getAllAppointments = async () => {
    setLoading(true);
    try {
      // get the shop data using the phone number
      const { data: shopData, error: shopError } = await supabase
        .from("shops")
        .select("*")
        .eq("phone", phone)
        .single();
      if (shopError) {
        Alert.alert(
          "Error",
          "Failed to fetch shop data. Please try again later."
        );
        return;
      }
      // set the shop data in the store
      setShopData(shopData.id, shopData.shop_name);
      setIsShopOpen(shopData.isOpen);
      // get the appointments using the shop id
      let shopId = shopData.id;
      const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .eq("shops_id", shopId);
      if (error) {
        console.log("Error fetching appointments server issues:", error);
        Alert.alert("Error", error.message);
        return;
      }
      // set the appointments in the state
      setAppointmentData(data);
      // store the appoinment data in the useAppointmentData store
      setAppointments(data);
    } catch (error) {
      console.log("Error fetching appointments:", error);
      Alert.alert(
        "Error",
        "Failed to fetch appointments. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };
  const pendingAppointments = appointmentData.filter(
    (apt) => apt.status === "pending"
  );
  const confirmedAppointments = appointmentData.filter(
    (apt) => apt.status === "confirmed"
  );

  // This is the function that will be called when the user pulls down to refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAllAppointments().then(() => {
      // When fetchData completes, set refreshing back to false
      setRefreshing(false);
    });
  }, []);

  if (!isShopOpen) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" }
        ]}
      >
        <Text style={{ fontSize: 18, color: "#000" }}>
          Your shop is currently closed.
        </Text>
        <Text style={{ fontSize: 18, color: "#000" }}>
          Please open it to view appointments.
        </Text>
      </View>
    );
  }

  if (loading) {
    return <CustomLoading />;
  }

  return (
    <>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.singleContainer}>
          {/* Pending Appointments Section */}
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => setIsPendingExpanded(!isPendingExpanded)}
          >
            <Text style={styles.sectionTitle}>
              Pending Appointments ({pendingAppointments.length})
            </Text>
            <Text>{isPendingExpanded ? "▼" : "▶"}</Text>
          </TouchableOpacity>
          {isPendingExpanded && (
            <View style={styles.sectionContent}>
              {pendingAppointments.map((appointment, index) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  type="pending"
                  stateVal={fetchDataUsingThisState}
                  setStateVal={setFetchDataUsingThisState}
                />
              ))}
            </View>
          )}
        </View>
        {/* Divider */}
        <View
          style={{ height: 1, backgroundColor: "#ccc", marginVertical: 8 }}
        />
        {/* Confirmed Appointments Section */}
        <View style={[styles.singleContainer, { marginBottom: 40 }]}>
          <TouchableOpacity
            style={[styles.sectionHeader, { backgroundColor: "#DCEDC8" }]}
            onPress={() => setIsConfirmedExpanded(!isConfirmedExpanded)}
          >
            <Text style={styles.sectionTitle}>
              Confirmed Appointments ({confirmedAppointments.length})
            </Text>
            <Text>{isConfirmedExpanded ? "▼" : "▶"}</Text>
          </TouchableOpacity>
          {isConfirmedExpanded && (
            <View style={styles.sectionContent}>
              {confirmedAppointments.map((appointment, index) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  type="confirmed"
                  stateVal={fetchDataUsingThisState}
                  setStateVal={setFetchDataUsingThisState}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecedff",
    padding: 16
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFE0B2",
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#005fec"
  },
  sectionContent: {
    marginBottom: 16
  },
  singleContainer: {
    backgroundColor: "#f4f4ff",
    borderColor: "#fffefe",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12
  }
});

export default Appointment;
