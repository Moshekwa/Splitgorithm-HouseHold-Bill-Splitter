'use strict'

// Private
const members = []

// public
module.exports = {
  addMember: function (member) {
    members.push(member)
  },
  isEmpty: function () {
    if (members.length === 0) return true
    else return false
  },
  getMember: function (index) {
    return members[index]
  },
  getMembers: function () {
    return members
  }
}
