import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomModal from "./CustomModal";

import Ionicons from "react-native-vector-icons/Ionicons";
import Dial from "./Dial";

const DatePicker = ({ value, setValue }) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const [year, setYear] = React.useState(new Date().getFullYear());
  const [month, setMonth] = React.useState(new Date().getMonth());
  const [date, setDate] = React.useState(new Date().getDate());

  return (
    <CustomModal
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      toggleBtnTitle={<Ionicons name={"md-calendar"} size={24} color="white" />}
    >
      <View style={styles.container}>
        <Dial values={["", 0, 1, 2, 3, 4, 5, 6, "", ""]} />
        <Dial values={["", 0, 1, 2, 3, 4, 5, 6, "", ""]} />
        <Dial values={["", 0, 1, 2, 3, 4, 5, 6, "", ""]} />
      </View>
    </CustomModal>
  );
};

const getMonthDays = (year, month) => {
  const date = new Date(year, month + 1, 0);
  return date.getDate();
};

export default DatePicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 300,
  },
});
