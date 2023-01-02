import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Dashboard from "./views/Dashboard";
import MyBills from "./views/MyBills";
import MyPayments from "./views/MyPayments";
import Summary from "./views/Summary";

import Ionicons from "react-native-vector-icons/Ionicons";
import NewBillBtn from "./components/bills/NewBillBtn";
import React from "react";
import { getBills, setBills } from "./models/Bills";

const Tab = createBottomTabNavigator();

export default function App() {

  React.useEffect(() => {
    const checkBillsExists = async () => {
      const result = await getBills();
      if (!result) {
        await setBills({});
      }
    }

    setBills({stuff: 'this'})
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen
          name="MyBills"
          component={MyBills}
          options={{ headerRight: NewBillBtn }}
        />
        <Tab.Screen name="MyPayments" component={MyPayments} />
        <Tab.Screen name="Summary" component={Summary} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
