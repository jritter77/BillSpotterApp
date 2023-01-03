import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const DueBill = ({ bill }) => {
  return (
    <View style={styles.container}>
      <View style={styles.dateAndName}>
        <Text style={styles.dateField}>
          {bill.billDue.month}/{bill.billDue.date}/{bill.billDue.year}
        </Text>
        <Text style={styles.nameField}>{bill.billName}</Text>
      </View>
      <Text style={styles.amtField}>${bill.billAmt}.00</Text>
      <TouchableOpacity style={styles.confirmPaid}>
        <Ionicons name="checkmark-circle-outline" size={40} color="green" />
      </TouchableOpacity>
    </View>
  );
};

export default DueBill;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    margin: "5%",
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
    flex: 1,
    alignItems: "center",
  },
  dateAndName: {
    flex: 1,
  },
});
