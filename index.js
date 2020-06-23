'use strict'

const express = require('express')
const app = express()
const env = require('dotenv').config()

// loading body-parser
const bodyParser = require('body-parser')

// loading express sessions dependency
const session = require('express-session')

// Setting up Sessions Management for cookies storage
var MemoryStore = require('memorystore')(session)

// loading our routers
const mainRouter = require('./mainRoutes.js')
const todoRouter = require('./splitgorithmRoutes.js')

const SESS_NAME = process.env.SESS_NAME
const SESS_SECRET = process.env.SESS_SECRET
const SESS_LIFETIME = process.env.SESS_LIFETIME
const NODE_ENV = process.env.NODE_ENV
const IN_PROD = NODE_ENV === 'production' // Production enviroment could be set to deveopment

// tell express to use bodyParser for JSON and URL encoded form bodies
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Sessions and Cookies
app.use(session({
  name: SESS_NAME,
  secret: SESS_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: Number(SESS_LIFETIME),
    sameSite: true,
    secure: IN_PROD
  },
  store: new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  })
}))

// mounting our routers
app.use('/', mainRouter)
app.use('/splitgorithm', todoRouter)

app.use('/cdn', express.static('public')) /* this will mount your public
directory to '/cdn'. i.e. your scripts folder will be at /cdn/scripts */

const port = process.env.PORT || 3000
app.listen(port)
console.log('Express server running on port', port)
