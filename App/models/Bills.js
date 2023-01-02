import AsyncStorage from "@react-native-async-storage/async-storage";

export function createNewBill(billName, billDue, billAmt, billFreq, billType) {
  return {
    billName,
    billDue,
    billAmt,
    billFreq,
    billType,
    billPaid: null,
    billAmtPaid: null,
  };
}

export function editBill(bill) {}

export async function getBills() {
  try {
    const result = await AsyncStorage.getItem("bills");
    return JSON.parse(result);
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function setBills(bills) {
  try {
    const data = JSON.stringify(bills);
    const result = await AsyncStorage.setItem("bills", data);
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
}
