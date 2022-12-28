import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import CustomModal from "../standard/CustomModal";
import CustomForm from "../standard/CustomForm";
import BillForm from "./BillForm";

const NewBillBtn = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <CustomModal
      toggleBtnTitle="Create New Bill"
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    >
      <BillForm />
    </CustomModal>
  );
};

export default NewBillBtn;

const styles = StyleSheet.create({});
