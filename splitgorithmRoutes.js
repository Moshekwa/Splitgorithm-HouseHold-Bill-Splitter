'use strict'

const path = require('path')
const express = require('express')
const router = express.Router()

router.get('/signUpPage', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'class', 'signUpPage.html'))
})

router.post('/api/signUpPage', function (req, res) {
  console.log('Signing up the following member:', req.body.name)
})

module.exports = router
