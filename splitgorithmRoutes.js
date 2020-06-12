'use strict'

const path = require('path')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const db = require('./db.js')

// members in a house hold
const members = require('./modules/members.js')
// expense list for the household
const expenses = require('./modules/expenses.js')

// household groups
const groups = require('./modules/groups.js')

router.get('/signup', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'splitgorithm', 'signup.html'))
})

router.get('/homepage', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'splitgorithm', 'homepage.html'))
})

router.get('/members', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'splitgorithm', 'members.html'))
})

router.get('/expenses', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'splitgorithm', 'expenses.html'))
})

router.get('/payments', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'splitgorithm', 'payments.html'))
})

router.get('/about', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'splitgorithm', 'about.html'))
})

router.get('/api/list', function (req, res) {
  res.json(members.getMembers()) // Respond with JSON
})

router.get('/api/groups', function (req, res) {
  res.json(groups.getGroups()) // Respond with JSON
})

router.post('/api/group', function (req, res) {
  console.log(`Adding ${req.body.member}$ on group ${req.body.name}$`)
  const found = groups.isExisting(req.body.name) // this will be the index where a group is found or false if it doesn't exist
  if (typeof (found) === 'number') {
    groups.getParticularGroup(found).groupMembers.push(members.getMember(req.body.member - 1))
  } else if (found === null) {
    const myGroup = {
      groupMembers: [members.getMember(req.body.member - 1)]
    }
    myGroup[req.body.name] = 'my Group' // the key is the group name, this key is used to add members
    // on existing groups
    groups.addGroup(myGroup)
  }
  res.redirect(req.baseUrl + '/members')
})

router.get('/api/expenselist', function (req, res) {
  res.json(expenses.getExpenseList()) // Respond with JSON
})

router.post('/api/signup', function (req, res) {
  console.log('Signing up the following member:', req.body.name)
  const memberObject = {
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }
  if (memberObject.name !== '' && memberObject.username !== '' && memberObject.email !== '' && memberObject.password !== '') {
    members.addMember(memberObject)
    res.redirect(req.baseUrl + '/homepage')
  } else res.redirect(req.baseUrl + '/signup')

  db.sql.connect(db.getConfig())
    .then(() => {
      console.log('connected')

      const table = new db.sql.Table('SplitgorithmUsers')
      table.create = true
      table.columns.add('name', db.sql.VarChar(128), { nullable: false })
      table.columns.add('username', db.sql.VarChar(128), { nullable: false, primary: true })
      table.columns.add('email', db.sql.VarChar(128), { nullable: false })
      table.columns.add('password', db.sql.VarChar(128), { nullable: false })

      const salt = bcrypt.genSaltSync(10)
      const hashedPassword = bcrypt.hashSync(members.getMember(members.getMembers().length - 1).password, salt)

      // adding a member in a table
      table.rows.add(members.getMember(members.getMembers().length - 1).name, members.getMember(members.getMembers().length - 1).username,
        members.getMember(members.getMembers().length - 1).email, hashedPassword)
      const request = new db.sql.Request()
      return request.bulk(table)
    })
    .then(data => {
      console.log(data)
    })
    .catch(err => {
      console.log(err)
    })
})

router.get('/welcome', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'splitgorithm', 'welcome.html'))
})

router.post('/api/welcome', function (req, res) {
  console.log('Signing in the following member:', req.body.username)
  // Make a query to the database
  db.pools
  // Run query
    .then((pool) => {
      return pool.request()
      // perfoming a query
        .query('select * from SplitgorithmUsers')
    })
  // Processing the response
    .then(result => {
      const index = result.recordset.findIndex(function (elem) {
        return elem.username === req.body.username
      })
      if (index >= 0) {
        // Load hash from your password DB.
        console.log(bcrypt.compareSync(req.body.password, result.recordset[index].password))
        if (bcrypt.compareSync(req.body.password, result.recordset[index].password) === true) {
          res.redirect(req.baseUrl + '/homepage')
        } else res.redirect(req.baseUrl + '/welcome')
      } else res.redirect(req.baseUrl + '/welcome')
    })
  // If there's an error, return that with some description
    .catch(err => {
      res.send({
        Error: err
      })
    })
})
module.exports = router
