import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Dashboard from "./views/Dashboard";
import MyBills from "./views/MyBills";
import MyPayments from "./views/MyPayments";
import Summary from "./views/Summary";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="MyBills" component={MyBills} />
        <Tab.Screen name="MyPayments" component={MyPayments} />
        <Tab.Screen name="Summary" component={Summary} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
