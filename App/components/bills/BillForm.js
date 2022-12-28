import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import CustomForm from "../standard/CustomForm";
import PickerInput from "../standard/PickerInput";
import DatePicker from "../standard/DatePicker";

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
    <View>
      <CustomForm onSubmit={onSubmit}>
        <Text>Bill Name</Text>
        <TextInput placeholder="Name of bill" onChangeText={setBillName} />
        <Text>Bill Type</Text>
        <PickerInput
          value={billType}
          setValue={setBillType}
          options={["Home", "Auto", "Medical"]}
        />
        <Text>Bill Frequency</Text>
        <PickerInput
          value={billFreq}
          setValue={setBillFreq}
          options={["Weekly", "Monthly", "Yearly"]}
        />
        <Text>Bill Due Date</Text>
        <DatePicker />
        <Text>Bill Amount Due</Text>
        <TextInput placeholder="Amount" onChangeText={setBillAmt} />
      </CustomForm>
    </View>
  );
};

export default BillForm;

const styles = StyleSheet.create({});
