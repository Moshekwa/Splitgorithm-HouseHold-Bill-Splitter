'use strict'

const nodemailer = require('nodemailer')

module.exports = {
    welcomeMail: function (Email, Username) {
        // Welcome users with an email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        })

        const mailOptions = {
            from: 'mysplitgorithm@gmail.com',
            to: Email,
            subject: 'Welcome to Splitgorithm',
            text: 'We are within',
            html: `<center><h1>Greetings ${Username}, </h1><br/><br/><p>
            Welcome to Splitgorithm app. <br/>
            Your sign-up comes with services<br/>
            offered by Splitgorithm,<br/><br/><br/></center> 
            Splitgorithm Team<br/>
            Splitgorithm PTY LTD</p>`
        }

        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                console.log('Error has occured: ', err)
            } else {
                console.log('Email sent successefully')
            }
        })
    },

    resetPassword: function (Email, Username, gcode) {
        // Welcome users with an email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        })

        const mailOptions = {
            from: 'mysplitgorithm@gmail.com',
            to: Email,
            subject: 'Verificatio code',
            text: 'We are within',
            html: `<center><h1>Greetings ${Username},</h1><br/><br/><p>  
                  <h2>Please use the following link <br/>
                  to reset your password,<br/>
                  Like: ${gcode}<br/><br/><br/></center> 
                  Splitgorithm Team<br/>
                  Splitgorithm PTY LTD</p></h2>`
        }

        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                console.log('Error has occured: ', err)
            } else {
                console.log('Email sent successefully')
            }
        })
    },

    inviteFriends: function (friendName, Email, groupName) {
        // Welcome users with an email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        })

        const mailOptions = {
            from: 'mysplitgorithm@gmail.com',
            to: Email,
            subject: 'Invite to Splitgorithm',
            text: 'We are within',
            html: `<h1>Greetings ${friendName},</h1><br/><p>  
                    <h2>You are invited to join the splitgorithm's group below;<br/><br/>
                    Name: ${groupName}<br/>
                    Link: http://splitgorithm.azurewebsites.net/<br><br/>
                    You can follow the like above to join or sign-up.
                    <br/><br/><br/>
                    Splitgorithm Team<br/>
                    Splitgorithm PTY LTD</p></h2>`
        }

        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                console.log('Error has occured: ', err)
            } else {
                console.log('Email sent successefully')
            }
        })
    },
    postedExpense: function (Email, expenseInfo, Username) {
        // Welcome users with an email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        })

        const mailOptions = {
            from: 'mysplitgorithm@gmail.com',
            to: Email,
            subject: 'Update on posted expense',
            text: 'We are within',
            html: `<h2>Greetings ${Username}, </h2><br/>
            <p>The following expense was posted:<br/>
            Expense name: ${expenseInfo.name}<br/>
            Cost: ${expenseInfo.cost}<br/>
            Payer: ${expenseInfo.payer}</p>
            <br/><br/><br/>
            <h3>Splitgorithm Team<br/>
            Splitgorithm PTY LTD</h3>`
        }

        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                console.log('Error has occured: ', err)
            } else {
                console.log('Email sent successefully')
            }
        })
    },
}