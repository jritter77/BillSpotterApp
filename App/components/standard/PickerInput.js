import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import CustomModal from "./CustomModal";

const PickerInput = ({ value, setValue, options }) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  function populateOptionButtons() {
    const optionBtns = [];

    for (let option of options) {
      optionBtns.push(
        <PickerOption
          key={option}
          value={option}
          setValue={setValue}
          setModalVisible={setModalVisible}
        />
      );
    }

    return optionBtns;
  }

  return (
    <CustomModal
      toggleBtnTitle={value}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    >
      {populateOptionButtons()}
    </CustomModal>
  );
};

const PickerOption = ({ value, setValue, setModalVisible }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setValue(value);
        setModalVisible(false);
      }}
    >
      <Text>{value}</Text>
    </TouchableOpacity>
  );
};

export default PickerInput;

const styles = StyleSheet.create({});
