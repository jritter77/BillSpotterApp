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
    bills.sort(sortByDate);
    const data = JSON.stringify(bills);
    const result = await AsyncStorage.setItem("bills", data);
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export function generateNewBill(prevBill) {
  const date = new Date();

  date.setFullYear(prevBill.billDue.year);
  date.setMonth(parseInt(prevBill.billDue.month) - 1);
  date.setDate(parseInt(prevBill.billDue.date));

  if (prevBill.billFreq === "Monthly") {
    date.setMonth(date.getMonth() + 1);
  } else if (prevBill.billFreq === "Weekly") {
    date.setDate(date.getDate() + 7);
  } else if (prevBill.billFreq === "Yearly") {
    date.setFullYear(date.getFullYear() + 1);
  }

  const newDueDate = {
    year: date.getFullYear(),
    month: (date.getMonth() + 1).toString().padStart(2, 0),
    date: date.getDate().toString().padStart(2, 0),
  };

  const newBill = {
    ...prevBill,
    billDue: newDueDate,
    billPaid: null,
    billAmtPaid: null,
  };

  return newBill;
}

export async function getMonthTotals(year, month) {
  const totals = {};
  let bills = await getStoredBills();

  bills = bills?.filter(
    (b) => b.billDue.year === year && parseFloat(b.billDue.month) - 1 === month
  );

  for (let bill of bills) {
    if (bill.billType in totals) {
      totals[bill.billType].due += parseFloat(bill.billAmt);
      totals[bill.billType].paid += bill.billAmtPaid
        ? parseFloat(bill.billAmtPaid)
        : 0;
    } else {
      totals[bill.billType] = {
        due: parseFloat(bill.billAmt),
        paid: bill.billAmtPaid ? parseFloat(bill.billAmtPaid) : 0,
      };
    }
  }

  return totals;
}

export function sortByDate(a, b) {
  const fullDateA = a.billDue.year + a.billDue.month + a.billDue.date;
  const fullDateB = b.billDue.year + b.billDue.month + b.billDue.date;
  return fullDateA > fullDateB;
}
