'use strict'
let loggedInUser = null

const setUser = function (user) {
  loggedInUser = user
}

const getUser = function () {
  return loggedInUser
}

const loggedIn = function () {
  return loggedInUser !== null
}

const loggedOut = function () {
  loggedInUser = null
}
module.exports = {
  setUser: setUser,
  getUser: getUser,
  loggedIn: loggedIn,
  loggedOut: loggedOut
}
