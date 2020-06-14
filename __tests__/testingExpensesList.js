/* eslint-env jest */
'use strict'

// members list array
const expensesList = require('../modules/expenses.js')

describe('A query to check if expenses list is empty', () => {
  test('checking if a expense list is empty', () => {
    expect(expensesList.isEmpty()).toBe(true)
  })
})

describe('Successfully adding an expense', () => {
  test('adding an expense', () => {
    const expenseObject = {
      name: 'Groceries',
      cost: '3000',
      payer: 'Thabiso'
    }
    expensesList.addExpense(expenseObject)
    expect(expensesList.getExpenseList().length).toBe(1)
    expensesList.addExpense(expenseObject)
    expect(expensesList.getExpenseList().length).toBe(2)
  })
})

describe('Getting a paticular expense from the list', () => {
  test('getting expense 1', () => {
    const obtainedExpense = expensesList.getExpense(0)
    expect(obtainedExpense.name).toBe('Groceries') // expense has already been defined in the previous test
    expect(obtainedExpense.cost).toBe('3000')
    expect(obtainedExpense.payer).toBe('Thabiso')
  })
})
