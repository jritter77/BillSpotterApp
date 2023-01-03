import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import Calendar from "../components/dashboard/Calendar";
import CustomScrollView from "../components/standard/CustomScrollView";
import NextDue from "../components/bills/NextDue";

const Dashboard = ({ bills, setBills }) => {
  return (
    <CustomScrollView>
      <Calendar />
      <NextDue bills={bills} setBills={setBills} />
    </CustomScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
