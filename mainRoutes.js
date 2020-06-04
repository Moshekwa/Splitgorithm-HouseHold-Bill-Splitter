'use strict'

const path = require('path')
const express = require('express')
const mainRouter = express.Router()

mainRouter.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'splitgorithmPages', 'welcome.html'))
})

module.exports = mainRouter
