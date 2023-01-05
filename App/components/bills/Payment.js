import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { setStoredBills } from "../../models/Bills";

const Payment = ({ bill, bills, setBills, index }) => {
  const handleDelete = async () => {
    bills[index].billPaid = null;
    bills[index].billAmtPaid = null;
    setBills(() => [...bills]);
    await setStoredBills(bills);
  };

  return (
    <View style={styles.container}>
      <View style={styles.dateAndName}>
        <Text style={styles.dateField}>
          {bill.billPaid.month}/{bill.billPaid.date}/{bill.billPaid.year}
        </Text>
        <Text style={styles.nameField}>{bill.billName}</Text>
      </View>
      <Text style={styles.amtField}>${bill.billAmtPaid}.00</Text>
      <TouchableOpacity style={styles.confirmPaid} onPress={handleDelete}>
        <Ionicons name="close-circle-outline" size={40} color="darkred" />
      </TouchableOpacity>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    marginLeft: "5%",
    marginTop: "5%",
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
