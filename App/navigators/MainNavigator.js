import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Dashboard from "../views/Dashboard";
import MyBills from "../views/MyBills";
import MyPayments from "../views/MyPayments";
import Summary from "../views/Summary";

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="MyBills" component={MyBills} />
      <Tab.Screen name="MyPayments" component={MyPayments} />
      <Tab.Screen name="Summary" component={Summary} />
    </Tab.Navigator>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({});
