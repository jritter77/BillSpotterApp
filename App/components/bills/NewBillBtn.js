import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import CustomModal from "../standard/CustomModal";
import CustomForm from "../standard/CustomForm";
import BillForm from "./BillForm";

const NewBillBtn = ({ setBills }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <CustomModal
      toggleBtnTitle="New +"
      toggleBtnStyle={styles.toggleBtnStyle}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      animationType={"slide"}
    >
      <BillForm setModalVisible={setModalVisible} setBills={setBills} />
    </CustomModal>
  );
};

export default NewBillBtn;

const styles = StyleSheet.create({
  toggleBtnStyle: {
    marginRight: "5%",
    backgroundColor: "green",
    padding: 8,
  },
});
