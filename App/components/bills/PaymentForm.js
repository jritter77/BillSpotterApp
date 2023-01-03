import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import CustomForm from "../standard/CustomForm";
import PickerInput from "../standard/PickerInput";
import DatePicker from "../standard/DatePicker";
import FormTextInput from "../standard/FormTextInput";
import {
  createNewBill,
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

    await setStoredBills(bills);
    setBills(bills);
    setModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CustomForm onSubmit={onSubmit}>
        <Text style={styles.label}>Bill Name</Text>
        <Text>{bill.billName}</Text>
        <Text style={styles.label}>Bill Type</Text>
        <Text>{bill.billType}</Text>
        <Text style={styles.label}>Date Due</Text>
        <Text>
          {bill.billDue.month}/{bill.billDue.date}/{bill.billDue.year}
        </Text>
        <Text style={styles.label}>Amount Due</Text>
        <Text>{bill.billAmt}</Text>
        <Text style={styles.label}>Date Paid</Text>
        <DatePicker value={billPaid} setValue={setBillPaid} />
        <Text style={styles.label}>Amount Paid</Text>
        <FormTextInput
          placeholder="Amount"
          value={billAmtPaid}
          onChangeText={setBillAmtPaid}
        />
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
    fontSize: 16,
    fontWeight: "bold",
    marginTop: "5%",
  },
});
