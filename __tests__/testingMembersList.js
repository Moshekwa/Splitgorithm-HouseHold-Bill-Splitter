/* eslint-env jest */
'use strict'

// members list array
const membersList = require('../modules/members.js')

describe('A query to check if members list is empty', () => {
  test('checking if a list is empty', () => {
    expect(membersList.isEmpty()).toBe(true)
  })
})

describe('Successfully adding a member', () => {
  test('adding a member', () => {
    const memberObject = {
      name: 'Lungisani',
      username: '@sphe134',
      email: '1478317@students.wits.ac.za',
      password: '12335'
    }
    membersList.addMember(memberObject)
    expect(membersList.getMembers().length).toBe(1)
    membersList.addMember(memberObject)
    expect(membersList.getMembers().length).toBe(2)
  })
})

describe('Getting a paticular member from the list', () => {
  test('getting member 1', () => {
    const obtainedMember = membersList.getMember(0)
    expect(obtainedMember.name).toBe('Lungisani') // member has already been defined in the previous test
    expect(obtainedMember.username).toBe('@sphe134')
    expect(obtainedMember.email).toBe('1478317@students.wits.ac.za')
    expect(obtainedMember.password).toBe('12335')
  })
})
