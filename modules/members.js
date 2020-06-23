'use strict'

// Private
const activeMembers = []

// public
module.exports = {
  addActiveMember: function (activeMembers) {
    activeMembers.push(activeMembers)
  },
  isEmpty: function () {
    if (activeMembers.length === 0) return true
    else return false
  },
  getActiveMember: function (index) {
    return activeMembers[index]
  },
  getActiveMembers: function () {
    return activeMembers
  }
}
