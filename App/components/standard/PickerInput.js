import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import CustomModal from "./CustomModal";

import Ionicons from "react-native-vector-icons/Ionicons";

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
      toggleContent={
        <View style={styles.toggleContent}>
          <Text style={styles.toggleText}>{value}</Text>
          <Ionicons name="caret-down" size={16} />
        </View>
      }
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      transparent={true}
      animationType={"fade"}
      toggleBtnStyle={styles.btnStyle}
      toggleBtnTextStyle={styles.btnTextStyle}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {populateOptionButtons()}
      </ScrollView>
    </CustomModal>
  );
};

const PickerOption = ({ value, setValue, setModalVisible }) => {
  return (
    <TouchableOpacity
      style={styles.option}
      onPress={() => {
        setValue(value);
        setModalVisible(false);
      }}
    >
      <Text style={styles.optionText}>{value}</Text>
    </TouchableOpacity>
  );
};

export default PickerInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: "100%",
    backgroundColor: "rgba(0, 0, 0, .5)",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "10%",
    paddingBottom: "10%",
  },
  option: {
    backgroundColor: "white",
    padding: 16,
    width: "70%",
    borderWidth: 1,
    borderColor: "lightgrey",
  },
  optionText: {
    fontSize: 20,
  },
  btnStyle: {
    backgroundColor: "white",
    borderColor: "lightblue",
    borderWidth: 2,
    padding: 8,
  },
  btnTextStyle: {
    color: "black",
  },
  toggleContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  toggleText: {
    fontSize: 16,
    marginRight: 16,
  },
});
