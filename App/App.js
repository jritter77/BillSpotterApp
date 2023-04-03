import { StyleSheet, Text, View } from "react-native";

import React from "react";
import { getStoredBills, setStoredBills } from "./models/Bills";

import { Toast, ToastContext } from "./components/standard/Toast";

import MainNav from "./views/MainNav";

export default function App() {
  const [bills, setBills] = React.useState([]);

  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    const checkBillsExists = async () => {
      const result = await getStoredBills();
      if (!result) {
        await setStoredBills([]);
      }
    };

    const getBills = async () => {
      setBills(await getStoredBills());
    };

    checkBillsExists();
    getBills();
  }, []);

  return (
    <ToastContext.Provider value={setMessage}>
      <MainNav bills={bills} setBills={setBills} />
      <Toast message={message} />
    </ToastContext.Provider>
  );
}

const styles = StyleSheet.create({});
