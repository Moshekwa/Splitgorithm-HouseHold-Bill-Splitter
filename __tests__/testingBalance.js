/* eslint-env jest */
'use strict'

// expenses list array
const balanceList = require('../modules/balance.js')

describe('A query to check if balance list is empty', () => {
  test('checking if a balance list is empty', () => {
    expect(balanceList.isEmpty()).toBe(true)
  })
})

describe('Successfully adding a balance entry', () => {
  test('adding an entry', () => {
    const balanceObject = {
      Owed: 0,
      Owes: 0,
      balance: 0,
      groupName: '',
      getBalance: function () {
        this.balance = this.Owed - this.Owes
        const finalBalance = Number((this.balance).toFixed(2))
        return finalBalance
      }

    }
    balanceList.addEntry(balanceObject)
    expect(balanceList.getEntrylist().length).toBe(1)
    balanceList.addEntry(balanceObject)
    expect(balanceList.getEntrylist().length).toBe(2)
  })
})
