import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import CustomForm from "../standard/CustomForm";

const BillForm = () => {
  const [billName, setBillName] = React.useState("");
  const [billType, setBillType] = React.useState("");
  const [billFreq, setBillFreq] = React.useState("");
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
        <TextInput placeholder="Name of bill" />
        <Text>Bill Type</Text>
        <TextInput placeholder="Type" />
        <Text>Bill Frequency</Text>
        <TextInput placeholder="Freq" />
        <Text>Bill Due Date</Text>
        <TextInput placeholder="Date" />
        <Text>Bill Amount Due</Text>
        <TextInput placeholder="Amount" />
      </CustomForm>
    </View>
  );
};

export default BillForm;

const styles = StyleSheet.create({});
