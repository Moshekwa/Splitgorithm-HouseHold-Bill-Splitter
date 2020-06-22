'use strict'

const path = require('path')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const db = require('./db.js')
const send = require('./public/script/emailNotification.js')

const G_code = Math.random().toString(36).replace('0.', '')
let groupToView

// members in a house hold
const members = require('./modules/members.js')
// expense list for the household
const expenses = require('./modules/expenses.js')

// household groups
const groups = require('./modules/groups.js')
const { sql } = require('./db.js')

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

router.get('/profile', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'splitgorithm', 'profile.html'))
})
router.get('/payments', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'splitgorithm', 'payments.html'))
})

router.get('/about', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'splitgorithm', 'about.html'))
})

router.get('/resetPassword', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'splitgorithm', 'resetPassword.html'))
})

router.get('/api/list', function (req, res) {
  db.pools
  // Run query
    .then((pool) => {
      return pool.request()
      // perfoming a query
        .query('select * from SplitgorithmUsers')
    })
  // Processing the response
    .then(result => {
      res.send(result.recordset)
    })
  // If there's an error, return that with some description
    .catch(err => {
      res.send({
        Error: err
      })
    })
})

router.post('/api/groups', function (req, res) {
  // res.json(groups.getGroups()) // Respond with JSON
  // Make a query to the database
  db.pools
    // Run query
    .then((pool) => {
      return pool.request()
        // perfoming a query
        .query('select * from SplitgorithmGroups')
    })
    // Processing the response
    .then(result => {
      const index = result.recordset.findIndex(function (elem) {
        return elem.groupName === req.body.groupview
      })
       if(index !==-1){
         groupToView = req.body.groupview
       }
      res.redirect(req.baseUrl + '/members')
    })
    // If there's an error, return that with some description
    .catch(err => {
      res.send({
        Error: err
      })
    })
})

router.get('/api/groups', function (req, res) {
  // Make a query to the database
  console.log('Returning groups from the database')
  db.pools
    // Run query
    .then((pool) => {
      const dbRequest = pool.request()
      dbRequest.input('groupName', 'Msomi')
      return dbRequest
        // perfoming a query
        .query(`select * from ${groupToView}`)
    })
    // Processing the response
    .then(result => {
      res.send(result.recordset)
    })
    // If there's an error, return that with some description
    .catch(err => {
      res.send({
        Error: err
      })
    })
})

router.post('/api/joingroup', function (req, res) {
  db.pools
  // Run query
    .then((pool) => {
      const dbRequest = pool.request()
      dbRequest.input('groupName', `${req.body.groupName}`)
      return dbRequest
      // perfoming a query
        .query('select groupName from SplitgorithmGroups WHERE groupName =  @groupName')
    })
  // Processing the response
    .then(result => {
      if (result.recordset[0].groupName === req.body.groupName) { // checking if a group exists
        db.pools
          .then((pool) => {
            const dbrequest = pool.request()
            dbrequest.input('userName', `${req.body.userName}`)
            dbrequest.input('role', 'member')
            return dbrequest
              .query(`INSERT INTO ${req.body.groupName}(memberUserName, role) VALUES (@userName, @role)`)
          })
          .then(data => {
            console.log(data)
          })
          .catch(err => {
            console.log(err)
          })
      }
    })
  // If there's an error, return that with some description
    .catch(err => {
      res.send({
        Error: err
      })
    })
  res.redirect(req.baseUrl + '/members')
})

router.post('/api/creategroup', function (req, res) {
  console.log(`Creating a group ${req.body.groupName} with member ${req.body.userName}`)

  db.sql.connect(db.getConfig())
    .then(() => {
      console.log('connected')

      const table = new db.sql.Table(`${req.body.groupName}`)
      table.create = true
      table.columns.add('memberUserName', db.sql.VarChar(128), { nullable: false, primary: true })
      table.columns.add('role', db.sql.VarChar(128), { nullable: false })
      table.rows.add(req.body.userName, 'group leader')
      const request = new db.sql.Request()
      return request.bulk(table)
    })
    .then(data => {
      console.log(data)
    })
    .catch(err => {
      console.log(err)
    })

  db.sql.connect(db.getConfig())
    .then(() => {
      console.log('connected')

      const table = new db.sql.Table('SplitgorithmGroups')
      table.create = true
      table.columns.add('groupName', db.sql.VarChar(128), { nullable: false, primary: true })
      table.rows.add(`${req.body.groupName}`)
      const request = new db.sql.Request()
      return request.bulk(table)
    })
    .then(data => {
      console.log(data)
    })
    .catch(err => {
      console.log(err)
    })

  res.redirect(req.baseUrl + '/members')
})

router.get('/api/expenselist', function (req, res) {
  // Make a query to the database
  console.log('Returning The list of Expenses from the database')
  db.pools
    // Run query
    .then((pool) => {
      return pool.request()
        // perfoming a query
        .query('select * from HouseholdExpenses')
    })
    // Processing the response
    .then(result => {
      res.send(result.recordset)
    })
    // If there's an error, return that with some description
    .catch(err => {
      res.send({
        Error: err
      })
    })
})

router.post('/api/profile', function (req, res) {
  let name = ''
  let Index = 0
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
        return elem.username === req.body.currentusername
      })
      Index = index
      console.log(result.recordset)
      name = result.recordset[index].name
    })

  if (Index >= 0) {
    console.log('Updating the following profile: ', name)
    if (req.body.newusername !== '') {
      // Make a query to the database
      db.pools
        // Run query
        .then((pool) => {
          const dbrequest = pool.request()
          dbrequest.input('usern', `${req.body.newusername}`)
          dbrequest.input('user', `${name}`)
          return dbrequest
            // perfoming a query
            .query('UPDATE SplitgorithmUsers SET username=@usern WHERE name=@user')
        })
    }
    if (req.body.newemail !== '') {
    // Make a query to the database
      db.pools
      // Run query
        .then((pool) => {
          const dbrequest = pool.request()
          dbrequest.input('usern', `${req.body.newemail}`)
          dbrequest.input('user', `${name}`)
          return dbrequest
          // perfoming a query
            .query('UPDATE SplitgorithmUsers SET email=@usern WHERE name=@user')
        })
    }
    res.redirect(req.baseUrl + '/profile')
  }
})

router.post('/api/expenses', function (req, res) {
  console.log('Posting the following expense: ', req.body.expensename)
  const expenseObject = {
    name: req.body.expensename,
    cost: req.body.cost,
    payer: req.body.payer,
    group: req.body.group
  }
  let sharedPrice = 0
  // indices for searching through groups table and users table
  let index1
  let index2
  // Make a query to the database
  db.pools
    // Run query
    .then((pool) => {
      return pool.request()
        // perfoming a query
        .query('select * from SplitgorithmGroups')
    })
    // Processing the response
    .then(result => {
      // check if entered group exists
      index1 = result.recordset.findIndex(function (group) {
        return group.groupName === req.body.group
      })
    })
    // If there's an error, return that with some description
    .catch(err => {
      res.send({
        Error: err
      })
    })

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
      index2 = result.recordset.findIndex(function (elem) {
        return elem.username === req.body.payer
      })
      if (index1 !== -1 && index2 !== -1) {
        console.log(index1)
        if (expenseObject.name !== '' && expenseObject.cost !== '' && expenseObject.cost > 0) {
          expenses.addExpense(expenseObject)
          db.sql.connect(db.getConfig())
            .then(() => {
              console.log('connected')

              const table = new db.sql.Table('HouseholdExpenses')
              table.create = true
              table.columns.add('Name', db.sql.VarChar(128), { nullable: false })
              table.columns.add('Amount', db.sql.VarChar(128), { nullable: false })
              table.columns.add('Payer', db.sql.VarChar(128), { nullable: false })
              table.columns.add('GroupName', db.sql.VarChar(128), { nullable: false })

              // adding expense to the table
              table.rows.add(expenses.getExpense(expenses.getExpenseList().length - 1).name, expenses.getExpense(expenses.getExpenseList().length - 1).cost, expenses.getExpense(expenses.getExpenseList().length - 1).payer, expenses.getExpense(expenses.getExpenseList().length - 1).group)
              const request = new db.sql.Request()
              return request.bulk(table)
            })
            .then(data => {
              console.log(data)

              db.pools
              // Run query
                .then((pool) => {
                  const dbRequest = pool.request()
                  dbRequest.input('groupName', `${req.body.group}`)
                  return dbRequest
                  // perfoming a query
                    .query(`select * from ${req.body.group}`)
                })
                .then(result => {
                  console.log(result.recordset)
                  db.pools
                    .then(pool => {
                      const dbRequest = pool.request()
                      dbRequest.input('groupName', `${req.body.group}`)
                      dbRequest.input('owedTo', `${req.body.expensename}OwedTo`)
                      dbRequest.input('expenseContrib', `${req.body.expensename},Contribution`)
                      console.log(`${req.body.expensename},Contribution`)
                      sharedPrice = req.body.cost / result.recordset.length
                      console.log(sharedPrice)
                      dbRequest.input('expenseDivided', sharedPrice)
                      return dbRequest
                      // perfoming a query

                        .query(`ALTER TABLE ${req.body.group} ADD ${req.body.expensename}Contribution VarChar(128), ${req.body.expensename}OwedTo VarChar(128) `)
                    })
                    .then(data => {
                      db.pools
                        .then(pool => {
                          const dbRequest = pool.request()
                          dbRequest.input('groupName', `${req.body.group}`)
                          dbRequest.input('owedTo', `${req.body.expensename}OwedTo`)
                          dbRequest.input('expenseContrib', `${req.body.expensename}Contribution`)
                          dbRequest.input('payer', `${req.body.payer}`)
                          dbRequest.input('amount', sharedPrice)
                          dbRequest.input('member', 'member')

                          return dbRequest
                            // perfoming a query
                            .query(`UPDATE ${req.body.group} SET ${req.body.expensename}Contribution = @amount, ${req.body.expensename}OwedTo =@payer WHERE memberUserName !=@payer`)
                        })
                        .then(result => {
                          db.pools
                            .then(pool => {
                              const dbRequest = pool.request()
                              dbRequest.input('groupName', `${req.body.group}`)
                              dbRequest.input('owedTo', `${req.body.expensename}OwedTo`)
                              dbRequest.input('expenseContrib', `${req.body.expensename}Contribution`)
                              dbRequest.input('payer', `${req.body.payer}`)
                              dbRequest.input('amount', sharedPrice)
                              dbRequest.input('paid', 'PostedExpense')

                              return dbRequest
                                // perfoming a query
                                .query(`UPDATE ${req.body.group} SET ${req.body.expensename}Contribution = @amount, ${req.body.expensename}OwedTo =@paid WHERE memberUserName =@payer`)
                            })
                        })
                    })
                })
            })
            .catch(err => {
              console.log(err)
            })
        }
        res.redirect(req.baseUrl + '/expenses')
      } else res.redirect(req.baseUrl + '/expenses')
    })
  // If there's an error, return that with some description
    .catch(err => {
      res.send({
        Error: err
      })
    })
  })

router.post('/api/signup', function (req, res) {
  console.log('Signing up the following member:', req.body.name)
  let validMember = false
  const memberObject = {
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }

  if (memberObject.name !== '' && memberObject.username !== '' && memberObject.email !== '' &&
  memberObject.password !== '' && memberObject.password === req.body.Cpassword) {
    validMember = true
    members.addMember(memberObject)
    send.welcomeMail(members.getMember(members.getMembers().length - 1).email, members.getMember(members.getMembers().length - 1).username)
    res.redirect(req.baseUrl + '/homepage')
  } else res.redirect(req.baseUrl + '/signup')

  if (validMember === true) {
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
  }
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

// Generate and email G-Code.
router.get('/generateCode', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'splitgorithm', 'generateCode.html'))
})

router.post('/api/generateCode', (req, res) => {
  console.log('Verifying user email')

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
        send.resetPassword(result.recordset[index].email, result.recordset[index].username, G_code)
        res.redirect(req.baseUrl + '/resetPassword')
      } else {
        res.redirect(req.baseUrl + '/generateCode')
      }
    })
})

router.get('/resetPassword', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'splitgorithm', 'resetPassword.html'))
})

router.post('/api/resetPassword', (req, res) => {
  // Make a query to the database

  db.pools
    // Run query
    .then((pool) => {
      const salt = bcrypt.genSaltSync(10)
      const dbrequest = pool.request()
      // dbrequest.input('userp', bcrypt.hashSync(req.body.password, salt))
      dbrequest.input('userp', `${bcrypt.hashSync(req.body.password, salt)}`)
      dbrequest.input('nam', `${req.body.username}`)
      // perfoming a query
      if (G_code === req.body.gcode) {
        return dbrequest
          .query('UPDATE SplitgorithmUsers SET password=@userp WHERE username=@nam')
      }
    })
    .then(result => {
      // console.log(result.recordset)
      res.redirect(req.baseUrl + '/welcome')
    })
})
module.exports = router
