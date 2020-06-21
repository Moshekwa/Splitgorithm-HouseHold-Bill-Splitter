'use strict'

const express = require('express')
const app = express()

// loading body-parser
const bodyParser = require('body-parser')

// loading our routers
const mainRouter = require('./mainRoutes.js')
const todoRouter = require('./splitgorithmRoutes.js')
// loading express sessions dependency
const session = require('express-session')

// tell express to use bodyParser for JSON and URL encoded form bodies
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
//app.use(session({ secret: process.env.SESSION_SECRET )
app.use(session({secret: "mateu", resave: false, saveUninitialized: true}));

// mounting our routers
app.use('/', mainRouter)
app.use('/splitgorithm', todoRouter)

app.use('/cdn', express.static('public')) /* this will mount your public
directory to '/cdn'. i.e. your scripts folder will be at /cdn/scripts */

const port = process.env.PORT || 3000
app.listen(port)
console.log('Express server running on port', port)
