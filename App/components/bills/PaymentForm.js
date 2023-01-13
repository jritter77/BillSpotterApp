import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import CustomForm from "../standard/CustomForm";
import PickerInput from "../standard/PickerInput";
import DatePicker from "../standard/DatePicker";
import FormTextInput from "../standard/FormTextInput";
import {
  createNewBill,
  generateNewBill,
  getStoredBills,
  setStoredBills,
} from "../../models/Bills";

const PaymentForm = ({ setModalVisible, setBills, bill, index }) => {
  const d = new Date();
  const [billPaid, setBillPaid] = React.useState({
    month: (d.getMonth() + 1).toString().padStart(2, 0),
    date: d.getDate().toString().padStart(2, 0),
    year: d.getFullYear(),
  });
  const [billAmtPaid, setBillAmtPaid] = React.useState(bill.billAmt);

  const onSubmit = async () => {
    const bills = await getStoredBills();

    bills[index] = {
      ...bills[index],
      billPaid,
      billAmtPaid,
    };

    const newBill = generateNewBill(bills[index]);
    const exists = bills.filter((e) => {
      return (
        e.billName === newBill.billName &&
        e.billDue.month === newBill.billDue.month
      );
    });

    if (!exists.length) {
      bills.push(newBill);
    }

    await setStoredBills(bills);
    setBills(bills);
    setModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CustomForm onSubmit={onSubmit} title={"Confirm Paid"}>
        <Text style={styles.heading}>Payment Details</Text>
        <Text style={styles.label}>Bill Name</Text>
        <Text style={styles.text}>{bill.billName}</Text>
        <Text style={styles.label}>Bill Type</Text>
        <Text style={styles.text}>{bill.billType}</Text>
        <Text style={styles.label}>Date Due</Text>
        <Text style={styles.text}>
          {bill.billDue.month}/{bill.billDue.date}/{bill.billDue.year}
        </Text>
        <Text style={styles.label}>Amount Due</Text>
        <Text style={styles.text}>${bill.billAmt}</Text>
        <Text style={styles.label}>Date Paid</Text>
        <DatePicker value={billPaid} setValue={setBillPaid} />
        <Text style={styles.label}>Amount Paid</Text>
        <View style={styles.row}>
          <Text style={styles.dollar}>$</Text>
          <FormTextInput
            placeholder="Amount"
            value={billAmtPaid}
            onChangeText={(e) =>
              setBillAmtPaid((oldstate) => {
                const num = e.replace(/^0+/, "");
                const sliced =
                  num.slice(0, num.indexOf(".")) +
                  num.slice(num.indexOf(".") + 1);
                const padded = sliced.padStart(3, 0);
                return padded.slice(0, -2) + "." + padded.slice(-2);
              })
            }
            keyboardType="numeric"
          />
        </View>
      </CustomForm>
    </ScrollView>
  );
};

export default PaymentForm;

const styles = StyleSheet.create({
  container: {
    padding: "5%",
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: "5%",
  },
  heading: {
    fontSize: 24,
    textDecorationLine: "underline",
  },
  text: {
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  dollar: {
    fontSize: 24,
    padding: 8,
  },
});
