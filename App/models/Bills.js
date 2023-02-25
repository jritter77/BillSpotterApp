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
    console.log(date.getDate());
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

export function projectWeeklyBills(monthBills) {
  const projectList = {};
  const projectedBills = [];

  for (let bill of monthBills) {
    if (bill.billFreq === "Weekly") {
      if (projectList[bill.billName] !== undefined) {
        if (
          parseInt(projectList[bill.billName].billDue.date) <
          parseInt(bill.billDue.date)
        ) {
          projectList[bill.billName] = bill;
        }
      } else {
        projectList[bill.billName] = bill;
      }
    }
  }

  for (let bill in projectList) {
    const date = new Date();

    date.setDate(parseInt(projectList[bill].billDue.date));
    date.setMonth(parseInt(projectList[bill].billDue.month) - 1);
    date.setFullYear(projectList[bill].billDue.year);

    date.setDate(date.getDate() + 7);

    while (date.getMonth() + 1 === parseInt(projectList[bill].billDue.month)) {
      const newBill = { ...projectList[bill] };
      newBill.billDue.date = date.getDate().toString().padStart(2, 0);
      newBill.billPaid = null;
      newBill.billAmtPaid = null;

      projectedBills.push(JSON.parse(JSON.stringify(newBill)));

      date.setDate(date.getDate() + 7);
    }
  }

  return projectedBills;
}

export async function getMonthTotals(year, month) {
  const totals = {};
  let bills = await getStoredBills();

  bills = bills?.filter(
    (b) => b.billDue.year === year && parseFloat(b.billDue.month) - 1 === month
  );

  // Insert projected bills for month if any
  bills = [...bills, ...projectWeeklyBills(bills)];

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
