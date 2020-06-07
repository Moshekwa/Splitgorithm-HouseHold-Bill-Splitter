'use strict'

// Expense List
const expenses = [
  {
    expenseCode: 'electricityBill',
    amount: 500
  },
  {
    expenseCode: 'waterBill',
    amount: 300
  },
  {
    expenseCode: 'groceryBill',
    amount: 1200
  },
  {
    expenseCode: 'maintenanceBill',
    amount: 250
  },
  {
    expenseCode: 'internet',
    amount: 2500
  }
]

module.exports = {
  addExpense: function (expense) {
    expenses.push(expense)
  },
  isEmpty: function () {
    if (expenses.length === 0) return true
    else return false
  },
  getExpense: function (index) {
    return expenses[index.expenseCode]
  },
  getExpenseList: function () {
    return expenses
  }
}
