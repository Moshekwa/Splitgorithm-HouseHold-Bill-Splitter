/* eslint-env jest */
'use strict'

// members list array
const groupsList = require('../modules/groups.js')

describe('Successfully adding a group', () => {
  test('adding a group', () => {
    const myGroup = {
      family: 'my Group', // the key is the group name, this key is used to add members
      groupMembers: ['Bandile', 'Senamile', 'Nonkululeko']
    }

    groupsList.addGroup(myGroup)
    expect(groupsList.getGroups().length).toBe(1)
  })
})

describe('Successfully querying about group existance', () => {
  test('checking if a group exists', () => {
    const isFound = groupsList.isExisting('family')
    expect(isFound).toBe(0)
  })
})

describe('Successfully getting a particular group', () => {
  test('get friends group', () => {
    const myGroup = {
      friends: 'my Group', // the key is the group name, this key is used to add members
      groupMembers: ['Thabiso', 'Hlanganani', 'Mathews']
    }
    groupsList.addGroup(myGroup)
    const obtainedGroup = groupsList.getParticularGroup(1)
    expect(obtainedGroup.groupMembers[0]).toBe('Thabiso')
    expect(obtainedGroup.groupMembers[1]).toBe('Hlanganani')
    expect(obtainedGroup.groupMembers[2]).toBe('Mathews')
  })
})
