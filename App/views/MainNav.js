import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import Dashboard from "./Dashboard";
import MyBills from "./MyBills";
import MyPayments from "./MyPayments";
import Summary from "./Summary";

import Ionicons from "react-native-vector-icons/Ionicons";
import NewBillBtn from "../components/bills/NewBillBtn";

import SettingsButton from "../components/dashboard/SettingsButton";

const Tab = createBottomTabNavigator();

const MainNav = ({ bills, setBills }) => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          name="Dashboard"
          children={(props) => (
            <Dashboard bills={bills} setBills={setBills} {...props} />
          )}
          options={{
            headerRight: () => <SettingsButton />,
          }}
        />
        <Tab.Screen
          name="MyBills"
          children={(props) => (
            <MyBills bills={bills} setBills={setBills} {...props}></MyBills>
          )}
          options={{
            headerRight: () => <NewBillBtn setBills={setBills} />,
            title: "My Bills",
          }}
        />
        <Tab.Screen
          name="MyPayments"
          children={(props) => (
            <MyPayments bills={bills} setBills={setBills} {...props} />
          )}
          options={{ title: "My Payments" }}
        />
        <Tab.Screen
          name="Summary"
          children={(props) => <Summary bills={bills} {...props} />}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === "Dashboard") {
      iconName = "md-home";
    } else if (route.name === "MyBills") {
      iconName = "file-tray-full";
    } else if (route.name === "MyPayments") {
      iconName = "cash";
    } else if (route.name === "Summary") {
      iconName = "bar-chart";
    }

    return (
      <Ionicons
        name={iconName}
        size={24}
        color={focused ? "#006600" : "#8e8e93"}
      />
    );
  },
});

export default MainNav;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
