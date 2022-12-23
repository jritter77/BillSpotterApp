import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomModal from "../components/CustomModal";
import EditBill from "./EditBill";
import Calendar from "../components/Calendar";
import CustomScrollView from "../components/CustomScrollView";

const Dashboard = () => {
  return (
    <CustomScrollView>
      <Text>Dashboard</Text>
      <Calendar />
    </CustomScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
