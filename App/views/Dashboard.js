import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import Calendar from "../components/dashboard/Calendar";
import CustomScrollView from "../components/standard/CustomScrollView";

const Dashboard = () => {


  return (
    <CustomScrollView>
      <Calendar />
    </CustomScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
