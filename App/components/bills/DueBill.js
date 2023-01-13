import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomModal from "../standard/CustomModal";
import PaymentForm from "./PaymentForm";

const DueBill = ({ bill, setBills, index }) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const highlightPastDue = () => {
    const date = new Date();

    if (date.getFullYear() <= bill.billDue.year) {
      if (date.getMonth() + 1 < parseInt(bill.billDue.month)) {
        return "grey";
      } else if (date.getMonth() + 1 === parseInt(bill.billDue.month)) {
        if (date.getDate() <= parseInt(bill.billDue.date)) {
          return "grey";
        }

        return "darkred";
      }
    }

    return "darkred";
  };

  return (
    <View style={styles.container}>
      <View style={styles.dateAndName}>
        <Text style={{ ...styles.dateField, color: highlightPastDue() }}>
          {bill.billDue.month}/{bill.billDue.date}/{bill.billDue.year}
        </Text>
        <Text style={styles.nameField}>{bill.billName}</Text>
      </View>
      <Text style={styles.amtField}>${bill.billAmt}</Text>

      <CustomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        toggleBtnTitle={
          <Ionicons name="checkmark-circle-outline" size={40} color="green" />
        }
        toggleBtnStyle={styles.confirmPaid}
        animationType="slide"
      >
        <PaymentForm
          setModalVisible={setModalVisible}
          setBills={setBills}
          bill={bill}
          index={index}
        />
      </CustomModal>
    </View>
  );
};

export default DueBill;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: "5%",
    paddingTop: "5%",
  },
  dateField: {
    fontSize: 16,
    color: "grey",
  },
  nameField: {
    fontSize: 16,
    fontWeight: "bold",
  },
  amtField: {
    flex: 1,
    textAlign: "right",
    fontSize: 20,
    fontWeight: "bold",
  },
  confirmPaid: {
    alignItems: "center",
    backgroundColor: "white",
    marginLeft: "10%",
  },
  dateAndName: {
    flex: 1,
  },
});
