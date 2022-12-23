import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomModal from "../components/CustomModal";
import EditBill from "./EditBill";

const Dashboard = () => {
  return (
    <View>
      <Text>Dashboard</Text>
      <CustomModal content={<EditBill />} toggleBtnTitle="Open Modal" />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
