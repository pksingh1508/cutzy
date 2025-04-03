import {
  Alert,
  Button,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import CustomButton from "@/components/commonUi/CustomButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";
import {
  barberServices,
  durations,
  priceRange
} from "@/constants/BarberService";
import { useUserData } from "@/store/useUserData";
import { supabase } from "@/utils/supabase";
import { serviceAddedSuccessfullyToast } from "@/Toasts/allToast";
import { router } from "expo-router";

const AddServices = () => {
  const [services, setServices] = useState([
    { name: "", price: "", duration: "" }
  ]);
  const [role, setRole] = useState(barberServices[0].value);
  const [duration, setDuration] = useState(durations[0].value);
  const [price, setPrice] = useState(priceRange[0].value);
  const [index, setIndex] = useState(0);
  const { phone } = useUserData();
  const [barberData, setBarberData] = useState<any>([]);
  const [barberId, setBarberId] = useState();
  const [loading, setLoading] = useState(false);

  const nextPressHandler = () => {
    setIndex(index + 1);
  };

  // Bottom sheet reference
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  // fetch the shop id using mobile number and then fetch all the barber in that shop
  useEffect(() => {
    getAllBarbers();
  }, []);

  const getAllBarbers = async () => {
    const { data, error } = await supabase
      .from("shops")
      .select("id")
      .eq("phone", phone)
      .single();
    if (error) {
      Alert.alert("Error while fetching shop_id", error.message);
      return;
    }
    const shopId = data.id;
    const { data: barberData, error: barberError } = await supabase
      .from("barbers")
      .select("*")
      .eq("shops_id", shopId);
    if (barberError) {
      Alert.alert(
        "Error while fetching barbers in the shop",
        barberError.message
      );
      return;
    }
    setBarberData(barberData);
    // convert the data into the format of the picker
    const formattedData = barberData.map((item: any) => ({
      label: item.name,
      value: item.id
    }));
    setBarberData(formattedData);
  };

  // submit the data to the database
  const submitHandler = async () => {
    setLoading(true);
    try {
      // filter out any incomplete entries
      const filteredServices = services.filter(
        (service) => service.name && service.price && service.duration
      );
      // check the valid service length
      if (filteredServices.length === 0) {
        Alert.alert("Error", "Please add at least one service.");
        setIndex(0);
        return;
      }
      // insert the baber id in the filtered services array
      const servicesWithBarberId = filteredServices.map((service) => ({
        ...service,
        barber_id: barberId
      }));
      // insert the data into the database
      const { error } = await supabase
        .from("services")
        .insert(servicesWithBarberId);
      if (error) {
        Alert.alert("Error while adding the services", error.message);
        return;
      }
      serviceAddedSuccessfullyToast();
      router.replace("../(barbers)/profile");
    } catch (error) {
      Alert.alert("Error", "Error while adding the services");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GestureHandlerRootView style={styles.sheetContainer}>
      {index === 0 && (
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {services.map(
              (service, index) =>
                index !== 0 && (
                  <View key={index} style={styles.singleServiceContainer}>
                    <View>
                      <Text style={styles.serviceText}>
                        Service : {service.name.toUpperCase()}
                      </Text>
                      <Text style={styles.serviceText}>
                        Time : {service.duration} minutes
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.serviceText}>
                        Price : &#8377; {service.price}
                      </Text>
                    </View>
                  </View>
                )
            )}
          </ScrollView>
          {/* Bottom sheet to add the services */}
          <BottomSheetModalProvider>
            <View style={styles.bottomBox}>
              <CustomButton
                title="Next"
                onPress={nextPressHandler}
                customStyle={{ width: "60%" }}
              />
              <TouchableOpacity onPress={handlePresentModalPress}>
                <AntDesign name="pluscircle" size={60} color="black" />
              </TouchableOpacity>
            </View>

            <BottomSheetModal ref={bottomSheetModalRef}>
              <BottomSheetView style={styles.contentContainer}>
                <View style={{ width: "100%", padding: 14 }}>
                  {/* This is for choosing the services */}
                  <View style={styles.pickerContainer}>
                    <Text>Choose Service Name:</Text>
                    <Picker
                      selectedValue={role}
                      mode="dialog"
                      dropdownIconColor="black"
                      onValueChange={(itemValue, itemIndex) =>
                        setRole(itemValue)
                      }
                      style={styles.picker}
                      itemStyle={styles.pickerItem}
                    >
                      {barberServices.map((item, index) => (
                        <Picker.Item
                          key={index}
                          label={item.label}
                          value={item.value}
                          fontFamily="pop-m"
                        />
                      ))}
                    </Picker>
                  </View>
                  {/* This is for choosing the duration. */}
                  <View style={styles.pickerContainer}>
                    <Text>Choose duration:</Text>
                    <Picker
                      selectedValue={duration}
                      mode="dialog"
                      dropdownIconColor="black"
                      onValueChange={(itemValue, itemIndex) =>
                        setDuration(itemValue)
                      }
                      style={styles.picker}
                      itemStyle={styles.pickerItem}
                    >
                      {durations.map((item, index) => (
                        <Picker.Item
                          key={index}
                          label={item.label}
                          value={item.value}
                          fontFamily="pop-m"
                          style={{ fontSize: 16 }}
                        />
                      ))}
                    </Picker>
                  </View>
                  {/* This is for choosing the price for the services. */}
                  <View style={styles.pickerContainer}>
                    <Text>Choose Price:</Text>
                    <Picker
                      selectedValue={price}
                      mode="dialog"
                      dropdownIconColor="black"
                      onValueChange={(itemValue, itemIndex) =>
                        setPrice(itemValue)
                      }
                      style={styles.picker}
                      itemStyle={styles.pickerItem}
                    >
                      {priceRange.map((item, index) => (
                        <Picker.Item
                          key={index}
                          label={item.label}
                          value={item.value}
                          fontFamily="pop-m"
                          style={{ fontSize: 16 }}
                        />
                      ))}
                    </Picker>
                  </View>
                  <View style={{ padding: 20 }}>
                    <CustomButton
                      title="Insert Service"
                      onPress={() => {
                        setServices((prev) => [
                          ...prev,
                          { name: role, price: price, duration: duration }
                        ]);
                        bottomSheetModalRef.current?.close();
                      }}
                    />
                  </View>
                </View>
              </BottomSheetView>
            </BottomSheetModal>
          </BottomSheetModalProvider>
        </View>
      )}
      {index === 1 && (
        <View style={styles.nextPageContainer}>
          <ScrollView style={{ padding: 14 }}>
            <Text style={styles.selectBarberText}>Select Barber to Add</Text>
            <View style={styles.pickerContainer}>
              <Text>Choose Barber:</Text>
              <Picker
                selectedValue={barberId}
                mode="dropdown"
                dropdownIconColor="black"
                onValueChange={(itemValue, itemIndex) => setBarberId(itemValue)}
                style={styles.picker}
                itemStyle={styles.pickerItem}
              >
                {barberData.map((item: any, index: any) => (
                  <Picker.Item
                    key={index}
                    label={item.label}
                    value={item.value}
                    fontFamily="pop-m"
                    style={{ fontSize: 16 }}
                  />
                ))}
              </Picker>
            </View>
          </ScrollView>
          <View style={styles.backSubmitBtnBox}>
            <CustomButton
              title="Back"
              onPress={() => {
                setIndex(index - 1);
              }}
              customStyle={{ width: "40%" }}
            />
            <CustomButton
              title="Submit"
              onPress={submitHandler}
              customStyle={{ width: "40%" }}
            />
          </View>
        </View>
      )}
    </GestureHandlerRootView>
  );
};

export default AddServices;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecedff",
    paddingTop: 30
  },
  bottomBox: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20
  },
  sheetContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecedff"
  },
  contentContainer: {
    flex: 1,
    // height: 500,
    alignItems: "center",
    width: "100%"
  },
  pickerContainer: {
    width: "100%", // Make container take max width
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginVertical: 10,
    padding: 10
  },
  picker: {
    width: "100%", // Make picker take max width
    height: 50
  },
  pickerItem: {
    fontSize: 18, // Change font size
    fontFamily: "pop-m" // Your custom font family
  },

  // this is the styling of the second page
  singleServiceContainer: {
    backgroundColor: "#f4f4ff",
    padding: 9,
    marginBottom: 20,
    marginHorizontal: 20,
    borderRadius: 8,
    borderColor: "#fffefe",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  serviceText: {
    fontFamily: "pop-m",
    fontSize: 16
  },
  backSubmitBtnBox: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  nextPageContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 20
  },

  // this is the styling of the scrollview of the second page
  selectBarberText: {
    fontFamily: "pop-m",
    fontSize: 20,
    textAlign: "center"
  }
});
