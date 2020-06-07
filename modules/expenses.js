'use strict'

// Expense List
const Expenses = [
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
        expenseCode: 'internet',
        amount: 2500
    }
 ]

module.exports{
    addExpense: function (expense) {
        Expenses.push(expense)
      },
      isEmpty: function () {
        if (Expenses.length === 0) return true
        else return false
      },
      getExpense: function (index) {
        return Expenses[index.expenseCode]
      },
      getExpenseList: function () {
        return Expenses
      }
}