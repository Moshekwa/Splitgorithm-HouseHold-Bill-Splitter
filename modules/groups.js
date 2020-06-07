'use strict'

// Private
const groups = [] // this is a list of objects, each object comprises group name and group members

module.exports = {
  addGroup: function (group) {
    groups.push(group)
  },
  isExisting: function (name) { // checking group existance by its name
    let index = 0
    let foundIndex = null
    groups.forEach(function (group) {
      if (group.hasOwnProperty(name) === true) { // group exists
        foundIndex = index
      }
      index++
    })
    return foundIndex
  },
  getParticularGroup: function (index) {
    return groups[index]
  },
  getGroups: function () {
    return groups
  }
}
