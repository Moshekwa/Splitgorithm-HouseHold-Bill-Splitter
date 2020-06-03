'use strict'

const path = require('path')
const express = require('express')
const router = express.Router()

// members in a house hold
const members = require('./modules/members.js')

router.get('/signUpPage', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'splitgorithmPages', 'signUpPage.html'))
})

router.get('/homepage', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'splitgorithmPages', 'homepage.html'))
})

router.post('/api/signUpPage', function (req, res) {
  console.log('Signing up the following member:', req.body.name)
  const memberObject = {
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }
  if (memberObject.name !== '' && memberObject.surname !== '' && memberObject.email !== '' && memberObject.password !== '') {
    members.addMember(memberObject)
    res.redirect(req.baseUrl + '/homepage')
  } else res.redirect(req.baseUrl + '/signUpPage')
})

module.exports = router
