import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import CustomButton from "@/components/commonUi/CustomButton";
import ChooseBarber from "@/components/customer/ChooseBarber";
import ChooseService from "@/components/customer/ChooseService";
import ChooseSlot from "@/components/customer/ChooseSlot";
import AppointmentSummary from "@/components/customer/AppointmentSummary";

const BookNow = () => {
  const [index, setIndex] = React.useState(0);
  const [barberId, setBarberId] = React.useState("");
  const [barberName, setBarberName] = React.useState("");
  const [serviceId, setServiceId] = React.useState("");
  const [serviceName, setServiceName] = React.useState("");
  const [startTime, setStartTime] = React.useState("");
  const [servicePrice, setServicePrice] = React.useState(0);

  // Function to handle booking the appointment
  const bookNowHandler = async () => {
    // Check if all required fields are filled
    if (!barberId || !serviceId || !startTime) {
      alert("Please fill all the fields");
      return;
    }
    // Here you can add the logic to book the appointment using the selected values
    console.log("Booking appointment with details:", {
      barberId,
      barberName,
      serviceId,
      serviceName,
      startTime,
      servicePrice
    });
  };

  return (
    <View style={styles.container}>
      <View>
        {/* Render the choose Barber component */}
        {index === 0 && (
          <ChooseBarber
            setBarberId={setBarberId}
            setBarberName={setBarberName}
          />
        )}
        {/* Render the choose Service component */}
        {index === 1 && (
          <ChooseService
            barberId={barberId}
            setServiceId={setServiceId}
            setServiceName={setServiceName}
            setServicePrice={setServicePrice}
          />
        )}
        {/* Render the choose Slot component */}
        {index === 2 && <ChooseSlot setStartTime={setStartTime} />}
        {/* Render the appointment summary component */}
        {index === 3 && (
          <AppointmentSummary
            barberName={barberName}
            serviceName={serviceName}
            startTime={startTime}
            servicePrice={servicePrice}
          />
        )}
      </View>
      <View style={styles.btnContainer}>
        {index !== 0 && (
          <CustomButton
            title="Prev"
            onPress={() => setIndex(index - 1)}
            customStyle={{ width: "45%" }}
          />
        )}
        {index < 3 && (
          <CustomButton
            title="Next"
            onPress={() => setIndex(index + 1)}
            customStyle={{ width: "45%" }}
          />
        )}
        {index === 3 && (
          <CustomButton
            title="Book Now"
            onPress={bookNowHandler}
            customStyle={{ width: "45%" }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "space-between"
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: 20,
    marginTop: 20,
    marginVertical: 10
  }
});
export default BookNow;
