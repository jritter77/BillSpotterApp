import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import CustomForm from "../standard/CustomForm";
import PickerInput from "../standard/PickerInput";
import DatePicker from "../standard/DatePicker";
import FormTextInput from "../standard/FormTextInput";

const BillForm = () => {
  const [billName, setBillName] = React.useState("");
  const [billType, setBillType] = React.useState("Home");
  const [billFreq, setBillFreq] = React.useState("Monthly");
  const [billDue, setBillDue] = React.useState("");
  const [billAmt, setBillAmt] = React.useState("");

  const onSubmit = () => {
    const values = { billName, billType, billFreq, billDue, billAmt };
    console.log(values);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CustomForm onSubmit={onSubmit}>
        <Text style={styles.label}>Bill Name</Text>
        <FormTextInput placeholder="Name of bill" onChangeText={setBillName} />
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
        <FormTextInput placeholder="Amount" onChangeText={setBillAmt} />
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
