import {
  Button,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
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

const AddServices = () => {
  const [services, setServices] = useState([
    { name: "", price: "", duration: "" }
  ]);
  const [role, setRole] = useState(barberServices[0].value);
  const [duration, setDuration] = useState(durations[0].value);
  const [price, setPrice] = useState(priceRange[0].value);
  const [index, setIndex] = useState(0);

  const nextPressHandler = () => {
    setIndex(index + 1);
  };

  // Bottom sheet reference
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

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
          <ScrollView>
            <Text style={styles.selectBarberText}>Select Barber</Text>
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
              onPress={() => {}}
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
