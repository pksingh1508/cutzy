import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import CustomLoading from "../commonUi/CustomLoading";
import { RadioGroup } from "react-native-radio-buttons-group";

interface ChooseServiceProps {
  barberId: string;
  setServiceId: (id: string) => void;
  setServiceName: (name: string) => void;
  setServicePrice?: (price: number) => void;
}

const ChooseService = ({
  barberId,
  setServiceId,
  setServiceName,
  setServicePrice
}: ChooseServiceProps) => {
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState<any>([]);
  const [selected, setSelected] = useState("");

  // fetch all services of the barber from the database using the barberId
  useEffect(() => {
    fetchAllServicesOfBarber();
  }, []);

  const fetchAllServicesOfBarber = async () => {
    setLoading(true);
    try {
      // check the barberId is not empty
      if (!barberId) {
        setLoading(false);
        Alert.alert("Please select a barber first");
        return;
      }
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("barber_id", barberId);
      if (error) {
        console.error("Error fetching services:", error.message);
        return;
      }
      if (data) {
        setServices(data);
      }
    } catch (err) {
      console.error("Error fetching services:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBtnPressed = (id: string) => {
    setSelected(id);
    setServiceId(id);
    const selectedService = services.find((service: any) => service.id === id);
    if (selectedService) {
      setServiceName(selectedService.name);
      setServicePrice && setServicePrice(selectedService.price);
    }
  };

  if (loading) {
    return <CustomLoading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Choose a Service</Text>
      <View>
        {services.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No services found for this barber
          </Text>
        ) : (
          services.map((service: any) => (
            <View key={service.id} style={styles.section}>
              <RadioGroup
                radioButtons={[
                  { id: service.id, label: service.name, value: service.id }
                ]}
                onPress={handleBtnPressed}
                layout="row"
                containerStyle={{ marginVertical: 8 }}
                selectedId={selected}
              />
            </View>
          ))
        )}
      </View>
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
export default ChooseService;
