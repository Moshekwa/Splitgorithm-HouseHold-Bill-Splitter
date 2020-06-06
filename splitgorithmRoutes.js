'use strict'

const path = require('path')
const express = require('express')
const router = express.Router()

// members in a house hold
const members = require('./modules/members.js')
// expenses list
const expenses = require('./modules/expenses.js')

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

router.get('/addexpense', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'splitgorithm', 'addexpense.html'))
})

router.get('/api/list', function (req, res) {
  members.getMembers().forEach(function (element) {
    delete element.password
  }) // Remove Password from displaying

  res.json(members.getMembers()) // Respond with JSON
})

router.post('/api/addexpense', function (req, res) {
  console.log('Adding the following Expense:', req.body.name)
  const ExpenseObject = {
    expensename: req.body.name,
    cost: req.body.amount
  }
  if (ExpenseObject.name !== '' && ExpenseObject.cost !== 0) {
    expenses.addExpense(ExpenseObject)
    res.redirect(req.baseUrl + '/expenses')
  } else res.redirect(req.baseUrl + '/homepage')
})

router.get('/api/expenseslist', function (req, res) {
  res.json(expenses.getExpenses()) // Respond with JSON
})

router.post('/api/signup', function (req, res) {
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
  } else res.redirect(req.baseUrl + '/signup')
})

router.get('/welcome', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'splitgorithm', 'welcome.html'))
})

router.post('/api/welcome', function (req, res) {
  console.log('Signing in the following member:', req.body.username)
  const index = members.getMembers().findIndex(function (elem) {
    return elem.username === req.body.username &&
           elem.password === req.body.password
  })

  if (index >= 0) {
    res.redirect(req.baseUrl + '/homepage')
  } else res.redirect(req.baseUrl + '/welcome')
})
module.exports = router
