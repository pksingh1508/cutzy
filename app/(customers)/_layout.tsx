import React from "react";
import { Tabs } from "expo-router";

const CustomerLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="map" />
      <Tabs.Screen name="appointment" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
};

export default CustomerLayout;
