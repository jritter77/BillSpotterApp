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

const BillForm = ({ setModalVisible, setBills, bill, index }) => {
  const [billName, setBillName] = React.useState("");
  const [billType, setBillType] = React.useState("Home");
  const [billFreq, setBillFreq] = React.useState("Monthly");
  const [billDue, setBillDue] = React.useState(bill?.billDue);
  const [billAmt, setBillAmt] = React.useState("");

  const onSubmit = async () => {
    const bills = await getStoredBills();
    if (!bill) {
      const newBill = createNewBill(
        billName,
        billType,
        billFreq,
        billDue,
        billAmt
      );
      bills.push(newBill);
    } else {
      bills[index] = {
        ...bills[index],
        billName,
        billType,
        billFreq,
        billDue,
        billAmt,
      };
    }

    await setStoredBills(bills);
    setBills(bills);
    setModalVisible(false);
  };

  React.useEffect(() => {
    if (bill) {
      setBillName(bill.billName);
      setBillType(bill.billType);
      setBillFreq(bill.billFreq);
      setBillDue(bill.billDue);
      setBillAmt(bill.billAmt);
    }
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CustomForm onSubmit={onSubmit}>
        <Text style={styles.label}>Bill Name</Text>
        <FormTextInput
          placeholder="Name of bill"
          value={billName}
          onChangeText={setBillName}
        />
        <Text style={styles.label}>Bill Type</Text>
        <PickerInput
          value={billType}
          setValue={setBillType}
          options={["Home", "Auto", "Medical"]}
        />
        <Text style={styles.label}>Bill Frequency</Text>
        <PickerInput
          value={billFreq}
          setValue={setBillFreq}
          options={["Weekly", "Monthly", "Yearly"]}
        />
        <Text style={styles.label}>Bill Due Date</Text>
        <DatePicker value={billDue} setValue={setBillDue} />
        <Text style={styles.label}>Bill Amount Due</Text>
        <FormTextInput
          placeholder="Amount"
          value={billAmt}
          onChangeText={setBillAmt}
        />
      </CustomForm>
    </ScrollView>
  );
};

export default BillForm;

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
