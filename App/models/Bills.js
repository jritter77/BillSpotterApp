import AsyncStorage from "@react-native-async-storage/async-storage";

export function createNewBill(billName, billType, billFreq, billDue, billAmt) {
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

export async function getStoredBills() {
  try {
    const result = await AsyncStorage.getItem("bills");
    return JSON.parse(result);
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function setStoredBills(bills) {
  try {
    const data = JSON.stringify(bills);
    const result = await AsyncStorage.setItem("bills", data);
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function getBillTotals() {
  const totals = {};
  const bills = await getStoredBills();

  for (let bill of bills) {
    if (bill.billType in totals) {
      totals[bill.billType].due += parseInt(bill.billAmt);
      totals[bill.billType].paid += bill.billAmtPaid
        ? parseInt(bill.billAmtPaid)
        : 0;
    } else {
      totals[bill.billType] = {
        due: parseInt(bill.billAmt),
        paid: bill.billAmtPaid ? parseInt(bill.billAmtPaid) : 0,
      };
    }
  }

  return totals;
}
