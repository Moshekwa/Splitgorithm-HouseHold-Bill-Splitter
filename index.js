'use strict'

const express = require('express')
const app = express()

// Setting Up Redis for Sessions Storage/Management
const redis = require('redis')
const session = require('express-session')
let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient()

// loading body-parser
const bodyParser = require('body-parser')

// loading our routers
const mainRouter = require('./mainRoutes.js')
const todoRouter = require('./splitgorithmRoutes.js')
// loading express sessions dependency
const session = require('express-session')

const TWO_HOURS = 60 * 60 * 2 * 1000; // The lifespan of a cookie 
const { 
    SESS_NAME = 'userSession',
    SESS_SECRET = 'splitgorithmSessions',
    SESS_LIFETIME = TWO_HOURS,
    NODE_ENV = 'development'
} = process.env
const IN_PROD = NODE_ENV === 'production' // Production enviroment could be set to deveopment 

// tell express to use bodyParser for JSON and URL encoded form bodies
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
//app.use(session({ secret: process.env.SESSION_SECRET )
app.use(session({
name: SESS_NAME,
secret: SESS_SECRET, 
resave: false, 
saveUninitialized: false, 
cookie : {
    maxAge: SESS_LIFETIME,
    sameSite: true,
    secure: IN_PROD
},
store: new RedisStore({ client: redisClient })
}));

// mounting our routers
app.use('/', mainRouter)
app.use('/splitgorithm', todoRouter)

app.use('/cdn', express.static('public')) /* this will mount your public
directory to '/cdn'. i.e. your scripts folder will be at /cdn/scripts */

const port = process.env.PORT || 3000
app.listen(port)
console.log('Express server running on port', port)
