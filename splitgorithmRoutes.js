'use strict'

const path = require('path')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const db = require('./db.js')
const store = require('./modules/balance.js')
const send = require('./public/script/emailNotification.js')
let sessionUsername = null // Sessions variable
const gcode = Math.random().toString(36).replace('0.', '')
let groupToView

// members in a house hold
const members = require('./modules/members.js')
// expense list for the household
const expenses = require('./modules/expenses.js')
// module to manage users sessions
const session = require('./modules/sessions.js')
// household groups
const groups = require('./modules/groups.js')
const { sql } = require('./db.js')

// Redirect webpages which check if a user is authenticated
const redirectHome = (req, res, next) => {
  if (!req.session.loggedIn) {
    res.redirect('/welcome')
  } else {
    next()
  }
}

const redirectExpenses = (req, res, next) => {
  if (!req.session.loggedIn) {
    res.redirect('/welcome')
  } else {
    next()
  }
}

const redirectMembers = (req, res, next) => {
  if (!req.session.loggedIn) {
    res.redirect('/welcome')
  } else {
    next()
  }
}

const redirectPayments = (req, res, next) => {
  if (!req.session.loggedIn) {
    res.redirect('/welcome')
  } else {
    next()
  }
}

const redirectProfile = (req, res, next) => {
  if (!req.session.loggedIn) {
    res.redirect('/welcome')
  } else {
    next()
  }
}

const redirectSignOut = (req, res, next) => {
  if (!req.session.loggedIn) {
    res.redirect('/welcome')
  } else {
    next()
  }
}

router.get('/signup', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'splitgorithm', 'signup.html'))
})

router.get('/homepage', redirectHome, function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'splitgorithm', 'homepage.html'))
})

router.get('/members', redirectMembers, function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'splitgorithm', 'members.html'))
})

router.get('/expenses', redirectExpenses, function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'splitgorithm', 'expenses.html'))
})

router.get('/profile', redirectProfile, function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'splitgorithm', 'profile.html'))
})

router.get('/signOut', redirectSignOut, function (req, res) {
  req.session.destroy(err => {
    if (err) {
      res.redirect(req.baseUrl)
    }
    res.redirect(req.baseUrl + '/welcome')
  })
})

router.get('/payments', redirectPayments, function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'splitgorithm', 'payments.html'))
})

router.get('/about', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'splitgorithm', 'about.html'))
})

router.get('/resetPassword', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'splitgorithm', 'resetPassword.html'))
})

router.post('/api/sendInvite', (req, res) => {
  console.log('Verifying user group')

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
        return elem.groupName === req.body.userGroup
      })
      if (index !== 0) {
        send.inviteFriends(req.body.friendname, req.body.friendemail, req.body.userGroup)
        db.pools
          .then((pool) => {
            const dbrequest = pool.request()
            dbrequest.input('Action', 'Invite friend')
            dbrequest.input('Description', `${req.body.userName} invited ${req.body.friendname} to join ${req.body.userGroup} group`)
            dbrequest.input('Date', `${new Date().getFullYear()}-${(new Date().getMonth() + 1)}-${new Date().getDate()} 
                             ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`)
            dbrequest.input('GroupTolog', `${req.body.userGroup}`)
            return dbrequest
              .query(`INSERT INTO GroupLog(action, description, date, groupTolog) VALUES (@Action, @Description, @Date, @GroupTolog)`)
          })
          .catch(err => {
            res.send({
              Error: err
            })
          })
        res.redirect(req.baseUrl + '/members')
      } else {
        res.redirect(req.baseUrl + '/members')
      }
    })
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
      if (index !== -1) {
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
        db.pools
          .then((pool) => {
            const dbrequest = pool.request()
            dbrequest.input('Action', 'Joined group')
            dbrequest.input('Description', `${req.body.userName} joined a group called ${req.body.groupName}`)
            dbrequest.input('Date', `${new Date().getFullYear()}-${(new Date().getMonth() + 1)}-${new Date().getDate()} 
                             ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`)
            dbrequest.input('GroupTolog', `${req.body.groupName}`)
            return dbrequest
              .query(`INSERT INTO GroupLog(action, description, date, groupTolog) VALUES (@Action, @Description, @Date, @GroupTolog)`)
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
  db.sql.connect(db.getConfig())
    .then(() => {
      console.log('connected')

      const table = new db.sql.Table('GroupLog')
      table.create = true
      table.columns.add('action', db.sql.VarChar(128), { nullable: false })
      table.columns.add('description', db.sql.VarChar(128), { nullable: false })
      table.columns.add('date', db.sql.VarChar(128), { nullable: false })
      table.columns.add('groupTolog', db.sql.VarChar(128), { nullable: false })
      // adding a member in a table
      table.rows.add('Group created', `${req.body.userName} created a group called ${req.body.groupName}`, `
      ${new Date().getFullYear()}-${(new Date().getMonth() + 1)}-${new Date().getDate()} 
      ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`, `${req.body.groupName}`)
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

let group
let expenseName
router.post('/api/sendHouseExpenses', function (req, res) {
  group = `${req.body.Group}`
  expenseName = `${req.body.expensename}`
  res.redirect(req.baseUrl + '/expenses')
})

router.get('/api/viewHouseExpenses', function (req, res) {
  // Make a query to the database
  console.log('Returning The list of Expenses from the database')
  db.pools
    .then((pool) => {
      const dbrequest = pool.request()
      dbrequest.input('group', group)
      return dbrequest
        // perfoming a query
        .query(`SELECT memberUserName, role, ${expenseName}Contribution, ${expenseName}OwedTo FROM ${group}`)
    })
    .then(data => {
      const information = [data.recordset, expenseName]
      console.log(information)
      res.send(information)
    })
    // If there's an error, return that with some description
    .catch(err => {
      res.send({
        Error: err
      })
    })
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
          db.pools
            .then((pool) => {
              const dbrequest = pool.request()
              dbrequest.input('Action', 'Posted expense')
              dbrequest.input('Description', `${req.body.payer} posted ${req.body.expensename}`)
              dbrequest.input('Date', `${new Date().getFullYear()}-${(new Date().getMonth() + 1)}-${new Date().getDate()} 
                             ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`)
              dbrequest.input('GroupTolog', `${req.body.group}`)
              return dbrequest
                .query(`INSERT INTO GroupLog(action, description, date, groupTolog) VALUES (@Action, @Description, @Date, @GroupTolog)`)
            })
            .catch(err => {
              res.send({
                Error: err
              })
            })
            .catch(err => {
              console.log(err)
            })
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
  // Email posted expense to the group members
  // Make a query to the database
  db.pools
    // Run query
    .then((pool) => {
      return pool.request()
        // perfoming a query
        .query(`select memberUserName from ${req.body.group}`)
    })
    // Processing the response
    .then(result => {
      result.recordset.forEach(member => {
        db.pools
          // Run query
          .then((pool) => {
            const dbRequest = pool.request()
            dbRequest.input('userName', `${member.memberUserName}`)
            return dbRequest
              // perfoming a query
              .query('select email from SplitgorithmUsers where username=@userName')
          })
          .then(result => {
            send.postedExpense(result.recordset[0].email, expenseObject, member.memberUserName)
          })
      })
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
    req.session.loggedIn = true
    sessionUsername = memberObject.username
    req.session.user = sessionUsername
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
          sessionUsername = result.recordset[index].username
          //  Ensuring the session is initiaized upon logging in
          req.session.loggedIn = true
          req.session.user = sessionUsername
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
        send.resetPassword(result.recordset[index].email, result.recordset[index].username, gcode)
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
      if (gcode === req.body.gcode) {
        return dbrequest
          .query('UPDATE SplitgorithmUsers SET password=@userp WHERE username=@nam')
      }
    })
    .then(result => {
      res.redirect(req.baseUrl + '/welcome')
    })
})

router.post('/api/settleExpense', function (req, res) {

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
        return elem.username === sessionUsername
        })
      })

      if (index1 !== -1 && index2 !== -1) {
        db.pools
        // Run query
          .then((pool) => {
            const dbRequest = pool.request()
            dbRequest.input('groupName', `${req.body.group}`)
            return dbRequest
            // perfoming a query
              .query(`select * from ${req.body.group}`)
          }) 
          .catch(err => {
            res.send({
              Error: err
            }) })
            db.pools
              .then(result => {
                db.pools
                .then(pool => {
                  const dbRequest = pool.request()
                  dbRequest.input('groupName', `${req.body.group}`)
                  dbRequest.input('payer',`${sessionUsername}`)
                  dbRequest.input('paid', 'SettledExpense')
                  return dbRequest
                                
                  // perfoming a query
                  .query(`UPDATE ${req.body.group} SET ${req.body.expensename}OwedTo =@paid WHERE memberUserName =@payer`)
                })       
              }) 
              .catch(err => {
                res.send({
                  Error: err
                }) 
              })
              res.redirect(req.baseUrl + '/payments')
        } else res.redirect(req.baseUrl + '/payments')  
})

router.get('/api/payments', function (req, res) {
  console.log('Returning Balance from database')
  // Make a query to the database
  db.pools
    // Run query
    .then((pool) => {
      const dbrequest = pool.request()
        // dbrequest.input('group', `${name}`)
        // perfoming a query
        .query('select * from Balances')
      return dbrequest
    })
    // Processing the response
    .then(result => {
      const data = [result.recordset, OwedTo, Owes, balances, groupName]
      // console.log(data[0])
      res.send(data)
      // console.log(result.recordset)
    })
    // If there's an error, return that with some description
    .catch(err => {
      res.send({
        Error: err
      })
    })
})

// view balance
let balances
let OwedTo
let Owes
let groupName
router.post('/api/payments', function (req, res) {
  // variable to store sum of contribution owed and contribution owed to and by a certain user an
  let sumOwed = 0
  let sumOwes = 0
  const balanceObject = {
    Owed: 0,
    Owes: 0,
    balance: 0,
    groupName: '',
    getBalance: function () {
      this.balance = this.Owed - this.Owes
      const finalBalance = Number((this.balance).toFixed(2))
      return finalBalance
    }

  }
  // indices for searching through groups table, expenses table and users table
  let index1
  let index2
  // array to store expenses paid for by specific user

  let userExpenses = []

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
    })

  if (index1 !== -1 && index2 !== -1) {
    balanceObject.groupName = req.body.group
    groupName = req.body.group
    // Make a query to the database
    db.pools
      // Run query
      .then((pool) => {
        const dbRequest = pool.request()
        dbRequest.input('payer', `${req.body.payer}`)
        dbRequest.input('group', `${req.body.group}`)
        return dbRequest
          // perfoming a query
          .query('select Name from HouseholdExpenses where GroupName=@group and Payer=@payer')
      })
      // Processing the response
      .then(result => {
        userExpenses = result.recordset
        // console.log(userExpenses)
        userExpenses.forEach(function (elem) {
          // Make a query to the database
          db.pools
            // Run query
            .then((pool) => {
              const dbRequest = pool.request()
              dbRequest.input('payer', `${req.body.payer}`)

              return dbRequest
                // perfoming a query
                .query(`select ${elem.Name}Contribution from ${req.body.group}  where ${elem.Name}OwedTo=@payer`)
            })
            // Processing the response
            .then(result => {
              //   console.log(result.recordset)
              const expenseObject = {
                cont: `${elem.Name}Contribution`
              }
              result.recordset.forEach(function (expenseCont) {
                const expenseContrib = Number(expenseCont[`${expenseObject.cont}`])
                sumOwed = sumOwed + expenseContrib
              })
              console.log(sumOwed)
              balanceObject.Owed = sumOwed
              const owe = Number(sumOwed.toFixed(2))
              OwedTo = owe
            })
        })
      })

    // Make a query to the database
    db.pools
      // Run query
      .then((pool) => {
        const dbRequest = pool.request()
        dbRequest.input('payer', `${req.body.payer}`)
        dbRequest.input('group', `${req.body.group}`)
        return dbRequest
          // perfoming a query
          .query('select Name from HouseholdExpenses where GroupName=@group and Payer<>@payer')
      })
      // Processing the response
      .then(result => {
        //  console.log(result.recordset)
        // keep track of iterations
        let i = 0
        userExpenses = result.recordset
        userExpenses.forEach(function (elem) {
          // Make a query to the database
          db.pools
            // Run query
            .then((pool) => {
              const dbRequest = pool.request()
              dbRequest.input('payer', `${req.body.payer}`)
              dbRequest.input('posted', 'PostedExpense')
              return dbRequest
                // perfoming a query
                .query(`select ${elem.Name}Contribution from ${req.body.group}  where ${elem.Name}OwedTo <> @payer and ${elem.Name}OwedTo <> @posted`)
            })
            // Processing the response

            .then(result => {
              // console.log(result.recordset)
              const expenseObject = {
                cont: `${elem.Name}Contribution`
              }
              result.recordset.forEach(function (expenseCont) {
                const expenseContrib = Number(expenseCont[`${expenseObject.cont}`])
                sumOwes = sumOwes + (expenseContrib / result.recordset.length)
              })
              if (i === userExpenses.length - 1) {
                balanceObject.Owes = sumOwes
                const ower = Number(sumOwes.toFixed(2))
                Owes = ower
                console.log(Owes)
                const bal = Number((OwedTo - Owes).toFixed(2))
                balances = bal
                //  console.log(balances)
                store.addEntry(balanceObject)
                // create balances table
                db.sql.connect(db.getConfig())
                  .then(() => {
                    console.log('connected')

                    const table = new db.sql.Table(req.body.groupName + 'Balances')
                    table.create = true
                    table.columns.add('Group', db.sql.VarChar(128), { nullable: false })
                    table.columns.add('member', db.sql.VarChar(128), { nullable: false })
                    table.columns.add('receivableTotal', db.sql.VarChar(128), { nullable: false })
                    table.columns.add('debtsTotal', db.sql.VarChar(128), { nullable: false })
                    table.columns.add('Balance', db.sql.VarChar(128), { nullable: false })

                    // adding expense to the table
                    table.rows.add(store.getEntry(store.getEntrylist().length - 1).groupName, req.body.payer, store.getEntry(store.getEntrylist().length - 1).Owed, store.getEntry(store.getEntrylist().length - 1).Owes, store.getEntry(store.getEntrylist().length - 1).getBalance())
                    const request = new db.sql.Request()
                    return request.bulk(table)
                  })
                  .then(data => {
                    console.log(data)
                  })
                  .catch(err => {
                    console.log(err)
                  })
                res.redirect(req.baseUrl + '/payments')
              }
              i++
            })
        })
      })
  } else res.redirect(req.baseUrl + '/payments')
})

router.get('/api/viewLog', function (req, res) {
  // Make a query to the database
  console.log('Returning group log from the database')
  db.pools
    // Run query
    .then((pool) => {
      const dbRequest = pool.request()
      dbRequest.input('group', `${groupToView}`)
      return dbRequest
        // perfoming a query
        .query('select * from GroupLog where groupToLog=@group')
    })
    // Processing the response
    .then(result => {
      console.log('Returning group log from the database')
      res.send(result.recordset)
      console.log(result.recordset)
    })
    // If there's an error, return that with some description
    .catch(err => {
      res.send({
        Error: err
      })
    })
})

router.post('/api/viewLog', function (req, res) {
  // res.json(groups.getGroups()) // Respond with JSON
  // Make a query to the database
  console.log("Fetching log results")
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
        return elem.groupName === req.body.showlog
      })
      if (index !== -1) {
        groupToView = req.body.showlog
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

module.exports = router
