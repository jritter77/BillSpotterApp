import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomModal from "./CustomModal";

import Ionicons from "react-native-vector-icons/Ionicons";

const DatePicker = ({ value, setValue }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <CustomModal
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      toggleBtnTitle={<Ionicons name={"md-calendar"} size={24} color="white" />}
    ></CustomModal>
  );
};

export default DatePicker;

const styles = StyleSheet.create({});
