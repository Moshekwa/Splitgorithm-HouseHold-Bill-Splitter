'use strict'

// private Expense List
const expenses = []

module.exports = {
  addExpense: function (expense) {
    expenses.push(expense)
  },
  isEmpty: function () {
    if (expenses.length === 0) return true
    else return false
  },
  getExpense: function (index) {
    return expenses[index]
  },
  getExpenseList: function () {
    return expenses
  }
}
