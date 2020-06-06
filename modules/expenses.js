'use strict'

// Private
const expenses = []

// Every Expense Object is to have an expense code and cost
// public

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
  getExpenses: function () {
    return expenses
  }
}
